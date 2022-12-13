const path = require('path');
const { createCsvTask } = require('../common/task');
const OssClient = require('../common/oss-client');
const config = require('../../config.json');

config.ossclient.bucket = 'file-video'; // lx-file

const ossClient = new OssClient(config.ossclient);

/**
 * 删除列表中文件
 */
createCsvTask({
  input: path.join(__dirname, './delete_file-input.csv'),
  output: path.join(__dirname, './delete_file-output.csv'),
  options: {
    headers: true,
  },
  processRow: async (row) => {
    let result = await ossClient.deleteFile(row.oss_file);
    row.result = result;
  },
});
