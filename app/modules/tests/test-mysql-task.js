const path = require('path');
const axios = require('axios');
const shixunApi = require('../../apis/shixunApi');
const { m3u8ToMp4 } = require('../../common/ffmpeg');
const config = require('../../common/config');
const fsExtra = require('../../common/fs-extra');
const OssClient = require('../../common/oss-client');
const MySQLTask = require('../../common/mysql-task');

const WORK_DIR = path.join(config.tempDir, 'shixun_mp4');
const OSS_DIR = 'shixun/';

const ossClient = new OssClient({ ...config.ossclient, bucket: 'file-im' });

// 用阿里内网域名
const internal = config.get('ossclient.internal');

/**
 * 检查听评课上报mp4字段为空，用m3u8生成mp4
 */
MySQLTask.createTask({
  input: async mysql => {
    return await mysql.query(`select c.* from commentary_course c
      where c.theme_id = 10042 and c.status = 200 and c.county in (510703,511321,511323,511325,511381)
      and (ifnull(c.record_classroom,'') = '' or ifnull(c.record_classroom_file,'') = '')
      and c.commentary_id = 2930
    `);
  },
  concurrency: 1,
  processRow: async (row, i, { mysql, list }) => {
    if (row.record_classroom_file) return;

    // 不存在则处理
    let record_classroom = JSON.parse(row.record_classroom);
    let mp4url = record_classroom.oss.ossFullPath;
    const ossFileName = mp4url.substring(mp4url.lastIndexOf('/') + 1);
    const video_id = ossFileName.substring(0, ossFileName.indexOf('.'));

    console.log('🚀 ~ get m3u8 url:', video_id);
    let m3u8 = await shixunApi.videoCheck(video_id);
    if (!m3u8) throw new Error('m3u8 not found.');
    m3u8 = m3u8.replace('http://videobjcdn.lejiaolexue.com', `https://file-video.oss-cn-beijing${internal ? '-internal' : ''}.aliyuncs.com`);

    // m3u8 to mp4
    console.log('🚀 ~ m3u8 to mp4:', m3u8);
    await m3u8ToMp4(m3u8, path.join(WORK_DIR, ossFileName));

    // upload to oss
    const ossRelativePath = OSS_DIR + ossFileName;
    const localFile = path.join(WORK_DIR, ossFileName);

    const fileSize = fsExtra.getFileSize(localFile);
    if (fileSize === 0) throw new Error('file size is 0.');

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
  },
});
