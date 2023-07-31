import path from 'path';
import axios from 'axios';
import shixunApi from '../apis/shixunApi';
import { m3u8ToMp4 } from '../common/ffmpeg';
import config from '../common/config';
import fsExtra from '../common/fs-extra';
import OssClient from '../common/oss-client';
import CsvTask from '../common/csv-task';
import mysql from '../common/mysql';

const WORK_DIR = path.join(config.tempDir, 'shixun_mp4');
const OSS_DIR = 'shixun/';

const ossClient = new OssClient({ ...config.ossclient, bucket: 'file-im' });

// 用阿里内网域名
const internal = config.get('ossclient.internal');

/**
 * 检查听评课上报mp4字段为空，用m3u8生成mp4
 */
CsvTask.createTask({
  input: path.join(__dirname, './check_commentary_empty.csv'),
  concurrency: 1,
  processRow: async (row, i) => {
    if (row.status === 'success' || row.status === 'exists') return;

    try {
      // 查询听评课详情
      let commentary_course = await mysql.query('select record_classroom, record_classroom_file from commentary_course where commentary_id = ?', [row.commentary_id]).then(res => res[0]);

      // 判断数据是否存在
      if (!commentary_course) throw new Error('commentary_course not found');
      if (!commentary_course.record_classroom) throw new Error('commentary_course.record_classroom not found');
      if (commentary_course.record_classroom_file) {
        row.status = 'exists';
        return;
      }

      let record_classroom = JSON.parse(commentary_course.record_classroom);
      let mp4url = record_classroom.oss.ossFullPath;
      const ossFileName = mp4url.substring(mp4url.lastIndexOf('/') + 1);
      const video_id = ossFileName.substring(0, ossFileName.indexOf('.'));

      console.log('🚀 ~ get m3u8 url:', video_id);
      let m3u8 = await shixunApi.videoCheck(video_id);
      if (!m3u8) throw new Error('m3u8 not found');
      m3u8 = m3u8.replace('http://videobjcdn.lejiaolexue.com', `https://file-video.oss-cn-beijing${internal ? '-internal' : ''}.aliyuncs.com`);

      // m3u8 to mp4
      console.log('🚀 ~ m3u8 to mp4:', m3u8);
      await m3u8ToMp4(m3u8, path.join(WORK_DIR, ossFileName));

      // upload to oss
      const ossRelativePath = OSS_DIR + ossFileName;
      const localFile = path.join(WORK_DIR, ossFileName);

      if (!fsExtra.existsSync(localFile)) throw new Error('mp4 not found');

      const fileSize = fsExtra.getFileSize(localFile);
      if (fileSize === 0) throw new Error('mp4 file size is 0');

      console.log('🚀 ~ upload to oss:', ossRelativePath);
      const ret = await ossClient.put(ossRelativePath, localFile, {
        timeout: 30 * 60 * 1000,
      });
      if (ret.res.statusCode !== 200) throw new Error(ret.res.statusMessage);

      // 删除生成的视频文件
      if (fsExtra.existsSync(localFile)) {
        console.log('🚀 ~ delete tempfile:', localFile);
        fsExtra.unlinkSync(localFile);
      }

      let record_classroom_file = record_classroom;
      record_classroom_file.oss.ossRelativePath = ossRelativePath;
      record_classroom_file.oss.ossFullPath = 'https://fileimosscdn.lejiaolexue.com/' + ossRelativePath;
      record_classroom_file = JSON.stringify(record_classroom_file);

      console.log('🚀 ~ update [record_classroom_file] field:', record_classroom_file);
      let res = await mysql.query('update commentary_course set record_classroom_file = ? where commentary_id = ?', [record_classroom_file, row.commentary_id]);
      console.log('🚀 ~ update result:', res.info);

      row.status = 'success';
    } catch (err) {
      row.status = err.message;
      throw err;
    }
  },
  onCompleted: async () => {
    await mysql.end();
  },
});
