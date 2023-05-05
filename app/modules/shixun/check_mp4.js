const path = require('path');
const axios = require('axios');
const CsvTask = require('../../common/csv-task');

/**
 * 检查mp4是否存在
 */
CsvTask.createTask({
  input: path.join(__dirname, './check_mp4.csv'),
  processRow: async (row, i) => {
    try {
      let res = await axios.head(row.mp4url);
      row.status = res.status; // 200
    } catch (err) {
      row.status = err.response.status; // 404
    }
  },
});
