import path from 'path';
import CsvTask from '../common/csv-task';
import OssClient from '../common/oss-client';
import config from '../common/config';

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
