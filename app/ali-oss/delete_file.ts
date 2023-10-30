import { createCsvTask } from '@/common/csv-task';
import path from 'path';
import config from '../common/config';
import OssClient from '../common/oss-client';

const ossClient = new OssClient({ ...config.ossclient, bucket: 'file-im' });

/**
 * 删除列表中文件
 */
createCsvTask({
  input: path.join(__dirname, './delete_file-data.csv'),
  options: {
    headers: true,
  },
  processRow: async (row) => {
    const ret = await ossClient.deleteOssFile(row.oss_file);
    row.result = ret;
  },
});
