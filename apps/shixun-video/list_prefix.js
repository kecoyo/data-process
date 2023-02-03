const path = require('path');
const { createCsvTask } = require('../../common/task');
const OssClient = require('../../common/oss-client');
const config = require('../../config.json');
const _ = require('lodash');
const fsExtra = require('../../common/fs-extra');

config.ossclient.bucket = 'file-video'; // lx-file

const ossClient = new OssClient(config.ossclient);

/**
 *  列出指定前缀的文件列表
 */
createCsvTask({
  input: path.join(__dirname, './list_prefix-input.csv'),
  output: path.join(__dirname, './list_prefix-output.csv'),
  options: {
    headers: true,
  },
  processRow: async (row) => {
    let m3u8_url2 = row.m3u8_url.split('.')[0];
    let prefix = m3u8_url2;

    let array = [];
    let list = await ossClient.listOssFile({ prefix: m3u8_url2, 'max-keys': 1000 });
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      array.push({ oss_file: item });
    }

    // 序号转number排序
    array = _.sortBy(array, (item) => {
      return parseInt(item.oss_file.replace(prefix, '').replace(/\.(ts|m3u8)/, '') || 0);
    });

    // 打印输出
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      console.log(item);
    }

    row.count = array.length;

    await fsExtra.writeCsv(path.join(__dirname, './delete_file-input.csv'), array, { headers: true });
  },
});
