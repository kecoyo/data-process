const path = require('path');
const util = require('util');
const Task = require('../common/task');
const fs = require('../common/fs-extra');
const { spawn } = require('../common/child_process');

const options = {
  rootDir: { type: 'string', default: 'D:\\heic' },
  fileFilter: { type: 'string', default: '*.heic' },
  outExtName: { type: 'string', default: '.jpg' },
  outQuality: { type: 'string', default: '90%' },
  outSuffix: { type: 'string', default: '' },
};
const args = util.parseArgs({ options }).values;
console.log('args:', JSON.stringify(args));

/**
 * 批量heic图片转jpg
 */
Task.createTask({
  input: async () => {
    const list = await fs.readdirp(args.rootDir, { fileFilter: args.fileFilter });
    return list.map(entry => ({ fromFile: entry.fullPath }));
  },
  // concurrency: 1,
  processRow: async (row, i) => {
    const fromFile = row.fromFile;
    const fromFileName = path.basename(fromFile);
    const curDir = path.dirname(fromFile);
    const fileName = fromFileName.replace(path.extname(fromFile), '');

    const toFileName = fileName + args.outSuffix + args.outExtName;
    const toFile = path.join(curDir, toFileName);

    await spawn('magick', [fromFile, '-quality', args.outQuality, toFile]);

    row.toFile = toFile;
  },
});
