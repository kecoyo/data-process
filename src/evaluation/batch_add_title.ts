import path from 'path';
import axios from 'axios';
import CsvTask from '../common/csv-task';
import evaluationApi from '../apis/evaluationApi';

const TYPE_MAP = {
  德育: 1,
  智育: 2,
  体育: 3,
  美育: 4,
  劳育: 5,
  家育: 6,
};

/**
 * 批量添加新评价类型
 */
CsvTask.createTask({
  input: path.join(__dirname, './batch_add_title.csv'),
  concurrency: 1,
  processRow: async (row, i) => {
    if (row.status === 'success') return;

    try {
      row.typeid = TYPE_MAP[row.typename];
      if (!row.typeid) throw new Error('typeid not found');

      let res = await evaluationApi.addTitle(row);
      if (res.result) throw new Error(res.msg);

      row.status = 'success';
    } catch (err) {
      row.status = err.message;
      throw err;
    }
  },
});
