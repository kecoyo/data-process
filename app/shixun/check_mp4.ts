import { createCsvTask } from '@/common/csv-task';
import axios from 'axios';
import path from 'path';

/**
 * 检查mp4是否存在
 */
createCsvTask({
  input: path.join(__dirname, './check_mp4.csv'),
  processRow: async (row, i) => {
    try {
      let res = await axios.head(row.mp4url);
      row.status = res.status; // 200
    } catch (err: any) {
      row.status = err.response.status; // 404
    }
  },
});
