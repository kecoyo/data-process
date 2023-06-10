const path = require('path');
const util = require('util');
const Task = require('../common/task');
const fs = require('../common/fs-extra');
const { spawn } = require('../common/child_process');

const options = {
  'src-dir': { type: 'string', default: 'E:\\我的相册\\来自：iPhone XR\\2022' },
  'file-filter': { type: 'string', default: '*.heic' },
  'out-dir': { type: 'string', default: 'E:\\我的相册\\来自：iPhone XR\\heic' },
  'out-extname': { type: 'string', default: '.jpg' },
  'out-quality': { type: 'string', default: '85' },
  'out-suffix': { type: 'string', default: '' },
};
const { values, tokens } = util.parseArgs({ options, tokens: true });
console.log('values:', JSON.stringify(values));

/**
 * 批量heic图片转jpg
 */
Task.createTask({
  input: async () => {
    const list = await fs.readdirp(values['src-dir'], { fileFilter: values['file-filter'] });
    return list.map(entry => ({ srcFile: entry.fullPath }));
  },
  // concurrency: 1,
  processRow: async (row, i) => {
    const srcFile = row.srcFile;
    const srcFileName = path.basename(srcFile);
    const srcDir = path.dirname(srcFile);

    // 文件名
    const fileName = srcFileName.replace(path.extname(srcFile), '');

    // 没有指定输出目录，输出到源目录
    const outDir = values['out-dir'] || srcDir;

    // 确保目录存在
    fs.ensureDirSync(outDir);

    const outFileName = fileName + values['out-suffix'] + values['out-extname'];
    const outFile = path.join(outDir, outFileName);

    await spawn('magick', [srcFile, '-quality', values['out-quality'], outFile]);

    row.outFile = outFile;
  },
});
