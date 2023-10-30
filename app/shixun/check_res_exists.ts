import { createCsvTask } from '@/common/csv-task';
import axios from 'axios';
import path from 'path';

/**
 * 检查师训资源是否存在
 */
createCsvTask({
  input: path.join(__dirname, './check_res_exists.csv'),
  // concurrency: 1,
  processRow: async (row, i) => {
    if (row.res_cover) {
      try {
        let res = await axios.head(row.res_cover);
        row.res_cover_status = res.status; // 200
      } catch (err: any) {
        row.res_cover_status = err.message;
      }
    } else {
      row.res_cover_status = '';
    }
  },
});
