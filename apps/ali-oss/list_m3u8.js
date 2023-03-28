const path = require('path');
const _ = require('lodash');
const { createCsvTask } = require('../../common/task');
const OssClient = require('../../common/oss-client');
const fsExtra = require('../../common/fs-extra');
const config = require('../../config.json');

const ossClient = new OssClient({ ...config.ossclient_lvch, bucket: 'file-video' });

let array = [];

/**
 *  列出指定前缀的文件列表
 */
createCsvTask({
  input: path.join(__dirname, './list_m3u8-input.csv'),
  options: {
    headers: true,
  },
  processRow: async row => {
    let prefix = row.m3u8_url.split('.')[0];

    let list = await ossClient.listOssFile({ prefix: prefix, 'max-keys': 1000 });
    let count = 0;

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      array.push({ oss_file: item });
      count++;
    }

    // 序号转number排序
    array = _.sortBy(array, item => {
      return parseInt(item.oss_file.replace(prefix, '').replace(/\.(ts|m3u8)/, '') || 0);
    });

    row.count = count;
  },
  onCompleted: async () => {
    await fsExtra.writeCsv(path.join(__dirname, './list_m3u8-output.csv'), array, { headers: true });
  },
});
