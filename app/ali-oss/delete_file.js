const path = require('path');
const CsvTask = require('../common/csv-task');
const OssClient = require('../common/oss-client');
const config = require('../common/config');

const ossClient = new OssClient({ ...config.ossclient, bucket: 'file-im' });

/**
 * 删除列表中文件
 */
CsvTask.createTask({
  input: path.join(__dirname, './delete_file-data.csv'),
  options: {
    headers: true,
  },
  processRow: async row => {
    const ret = await ossClient.deleteFile(row.oss_file);
    row.result = ret;
  },
});
