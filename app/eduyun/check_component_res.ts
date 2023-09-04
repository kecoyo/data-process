import { createCsvTask } from '@/common/csv-task';
import { checkExists } from '@/common/request';
import path from 'path';

/**
 * 检查云平台组件资源丢失
 */
createCsvTask({
  input: path.join(__dirname, './check_component_res.csv'),
  concurrency: 1,
  processRow: async (row, i) => {
    const status = await checkExists(row.Url);
    row.status = status;
  },
});
