const path = require('path');
const _ = require('lodash');
const { createCsvTask } = require('../../common/task');
const shixunApi = require('../../common/shixun_api');

/**
 * 师训处理数据
 */
createCsvTask({
  input: path.join(__dirname, './511321-input.csv'),
  output: path.join(__dirname, './511321-output.csv'),
  options: {
    headers: true,
  },
  processRow: async (row, i) => {
    if (row.ossFileName) {
      const video_id = row.ossFileName.substring(0, row.ossFileName.indexOf('.'));
      const results = await shixunApi.videoCheck(video_id);
      row.uri = results[0].uri || '';
      row.uri = row.uri.replace('http:', 'https:');
    }

    if (row.uri) {
      const results = await shixunApi.getContents(row.uri);
      const lines = results.split('\n');
      row.lines = lines.length;
    }
  },
});
