const path = require('path');
const { createCsvTask } = require('../../common/task');
const OssClient = require('../../common/oss-client');
const config = require('../../config.json');

const ossClient = new OssClient({ ...config.ossclient, bucket: 'file-im' });

/**
 * 删除列表中文件
 */
createCsvTask({
  input: path.join(__dirname, './delete_file-data.csv'),
  options: {
    headers: true,
  },
  processRow: async row => {
    const ret = await ossClient.deleteFile(row.oss_file);
    row.result = ret;
  },
});
