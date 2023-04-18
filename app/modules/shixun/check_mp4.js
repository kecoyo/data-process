const path = require('path');
const axios = require('axios');
const { createCsvTask } = require('../../common/task');

/**
 * 检查mp4是否存在
 */
createCsvTask({
  input: path.join(__dirname, './check_mp4.csv'),
  options: {
    headers: true,
  },
  processRow: async (row, i) => {
    try {
      let res = await axios.head(row.mp4url);
      row.status = res.status; // 200
    } catch (err) {
      row.status = err.response.status; // 404
    }
  },
});
