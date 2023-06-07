const path = require('path');
const Task = require('../common/task');
const fs = require('../common/fs-extra');
const { spawn } = require('../common/child_process');

const rootPath = 'D:\\heic';

/**
 * 批量heic图片转jpg
 */
Task.createTask({
  input: async () => {
    const list = await fs.readdirp(rootPath, { fileFilter: '*.heic' });
    return list;
  },
  concurrency: 1,
  processRow: async (row, i) => {
    const heicFile = row.fullPath;
    const heicFileName = row.basename;

    const currPath = path.dirname(heicFile);
    const fileName = heicFileName.substring(0, heicFileName.lastIndexOf('.'));

    const jpgFileName = fileName + '.jpg';
    const jpgFile = path.join(currPath, jpgFileName);

    await spawn('magick', [row.fullPath, '-quality', '90%', jpgFile]);
  },
});
