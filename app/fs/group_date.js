const path = require('path');
const util = require('util');
const Task = require('../common/task');
const fs = require('../common/fs-extra');
const dayjs = require('dayjs');
const _ = require('lodash');

const options = {
  'src-dir': { type: 'string', default: 'E:\\我的相册\\来自：iPhone XR' },
  'file-filter': { type: 'string', default: '*.*' },
};
const { values } = util.parseArgs({ options });
console.log('values:', JSON.stringify(values));

/**
 * 按日期分组统计文件数
 */
Task.createTask({
  input: async () => {
    const list = await fs.readdirp(values['src-dir'], { fileFilter: values['file-filter'] });
    return list.map(entry => ({
      // path: entry.path,
      // basename: entry.basename,
      srcFile: entry.fullPath,
    }));
  },
  // concurrency: 1,
  processRow: async (row, i) => {
    const srcFile = row.srcFile;
    const srcFileName = path.basename(srcFile);
    const srcDir = path.dirname(srcFile);
    const srcExtName = path.extname(srcFile);
    const srcName = srcFileName.replace(path.extname(srcFile), '');

    // 2022-11-12
    row.date = srcName.substring(0, 10);
  },
  onCompleted: ({ list }) => {
    const groupBy = _.groupBy(list, 'date');

    let array = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const key in groupBy) {
      if (Object.hasOwnProperty.call(groupBy, key)) {
        const arr = groupBy[key];
        array.push({ date: key, count: arr.length });
      }
    }

    array = _.orderBy(array, 'count', 'desc');

    fs.writeCsv(path.join(__dirname, './group_date-result.csv'), array);
  },
});
