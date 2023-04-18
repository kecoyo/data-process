const path = require('path');
const OssClient = require('../../common/oss-client');
const fsExtra = require('../../common/fs-extra');
const config = require('../../config');
const { createCsvTask } = require('../../common/task');
const shixunApi = require('./shixunApi');
const { m3u8ToMp4 } = require('../../common/ffmpeg');
const httpClient = require('../../common/http-client');

// const WORK_DIR = '/root/shixun_mp4';
const WORK_DIR = 'D:\\shixun_mp4';
const SHIXUN_DIR = 'shixun/';

const ossClient = new OssClient({ ...config.ossclient, bucket: 'file-im' });

/**
 * 不存在的mp4，用m3u8反向生成mp4，并上传当前位置
 */
createCsvTask({
  input: path.join(__dirname, './m3u8_mp4_511321.csv'),
  options: {
    headers: true,
  },
  concurrency: 4,
  processRow: async (row, i) => {
    // 200是处理过了，直接跳过
    if (row.status === '200') return;

    // 检查网络资源是否存在
    let httpcode = await httpClient.checkExists(row.mp4url);
    if (httpcode === 200) {
      row.status = 200;
      row.statusMessage = 'exists';
      return; // 存在则跳过
    }

    // 不存在则处理
    try {
      const ossFileName = row.mp4url.substring(row.mp4url.lastIndexOf('/') + 1);
      const video_id = ossFileName.substring(0, ossFileName.indexOf('.'));

      console.log('🚀 ~ get m3u8 url:', video_id);
      let m3u8 = await shixunApi.videoCheck(video_id);
      if (!m3u8) throw new Error('m3u8 not found.');
      m3u8 = m3u8.replace('http://videobjcdn.lejiaolexue.com', 'https://file-video.oss-cn-beijing.aliyuncs.com');

      // m3u8 to mp4
      console.log('🚀 ~ m3u8 to mp4:', m3u8);
      await m3u8ToMp4(m3u8, path.join(WORK_DIR, ossFileName));

      // upload to oss
      const ossRelativePath = SHIXUN_DIR + ossFileName;
      const localFile = path.join(WORK_DIR, ossFileName);

      const fileSize = fsExtra.getFileSize(localFile);
      console.log('🚀 ~ file: m3u8_mp4.js:53 ~ processRow: ~ fileSize:', fileSize);

      if (fileSize === 0) throw new Error('file size is 0.');

      console.log('🚀 ~ upload to oss:', ossRelativePath);
      const ret = await ossClient.put(ossRelativePath, localFile, {
        timeout: 30 * 60 * 1000,
      });
      if (ret.res.statusCode !== 200) throw new Error(ret.res.statusMessage);

      // 删除生成的视频文件
      if (fsExtra.existsSync(localFile)) {
        fsExtra.unlinkSync(localFile);
      }

      row.status = 200;
      row.statusMessage = 'success';
    } catch (err) {
      console.log('🚀 ~ main ~ err', err);
      row.status = 500;
      row.statusMessage = err.message;
      throw err;
    }
  },
});
