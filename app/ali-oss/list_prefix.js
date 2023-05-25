const path = require('path');
const CsvTask = require('../common/csv-task');
const OssClient = require('../common/oss-client');
const fsExtra = require('../common/fs-extra');
const config = require('../common/config');

const ossClient = new OssClient({ ...config.ossclient, bucket: 'file-im' });

let array = [];

/**
 *  列出指定前缀的文件列表
 */
CsvTask.createTask({
  input: path.join(__dirname, './list_prefix-data.csv'),
  options: {
    headers: true,
  },
  processRow: async row => {
    let { prefix } = row;

    let list = await ossClient.listOssFile({ prefix: prefix, 'max-keys': 1000 });

    let count = 0;
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      array.push({ oss_file: item });
      count++;
    }
    row.count = count;
  },
  onCompleted: async () => {
    await fsExtra.writeCsv(path.join(__dirname, './list_prefix-output.csv'), array, { headers: true });
  },
});
