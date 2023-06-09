const path = require('path');
const util = require('util');
const Task = require('../common/task');
const fs = require('../common/fs-extra');
const { spawn } = require('../common/child_process');

const options = {
  'root-dir': { type: 'string', default: 'D:\\heic' },
  'file-filter': { type: 'string', default: '*.heic' },
  'out-ext-name': { type: 'string', default: '.jpg' },
  'out-quality': { type: 'string', default: '90%' },
  'out-suffix': { type: 'string', default: '' },
};
const { values, tokens } = util.parseArgs({ options, tokens: true });
console.log('values:', JSON.stringify(values));

/**
 * 批量heic图片转jpg
 */
Task.createTask({
  input: async () => {
    const list = await fs.readdirp(values['root-dir'], { fileFilter: values['file-filter'] });
    return list.map(entry => ({ fromFile: entry.fullPath }));
  },
  // concurrency: 1,
  processRow: async (row, i) => {
    const fromFile = row.fromFile;
    const fromFileName = path.basename(fromFile);
    const curDir = path.dirname(fromFile);
    const fileName = fromFileName.replace(path.extname(fromFile), '');

    const toFileName = fileName + values['out-suffix'] + values['out-ext-name'];
    const toFile = path.join(curDir, toFileName);

    await spawn('magick', [fromFile, '-quality', values['out-quality'], toFile]);

    row.toFile = toFile;
  },
});
