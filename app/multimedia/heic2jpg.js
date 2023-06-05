/* eslint-disable  */
const path = require('path');
const CsvTask = require('../common/csv-task');
const Convert = require('heic');
const fsExtra = require('../common/fs-extra');
const util = require('util');

const convert = new Convert();

// const options = {
//   foo: { type: 'boolean', short: 'f' },
//   bar: { type: 'string' },
// };
// const { values } = util.parseArgs({ options, tokens: true });

/**
 * 批量heic图片转jpg
 */
CsvTask.createTask({
  input: path.join(__dirname, './heic2jpg.csv'),
  concurrency: 1,
  processRow: async (row, i) => {
    // if (row.status === 'OK') return;
    try {
      // let exists = fsExtra.existsSync(row.heicfile);
      // if (!exists) throw new Error('heicfile does not exist');
      // .HEIC FILE -> .JPG FILE
      // await convert.fileToFile(row.heicfile);
      // 删除heic文件
      // fsExtra.removeSync(row.heicfile);
      // row.status = 'OK';
    } catch (err) {
      row.status = err.message;
      throw err;
    }
  },
});
