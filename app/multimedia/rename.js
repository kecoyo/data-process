const path = require('path');
const util = require('util');
const Task = require('../common/task');
const fs = require('../common/fs-extra');
const { spawn } = require('../common/child_process');
const dayjs = require('dayjs');

const options = {
  'src-dir': { type: 'string', default: 'e:\\我的相册\\来自：vivo V3M A' },
  'file-filter': { type: 'string', default: 'mmexport*.jpg' },
  'out-dir': { type: 'string', default: 'e:\\我的相册\\来自：vivo V3M A' },
  'out-extname': { type: 'string', default: '.jpg' },
  'out-suffix': { type: 'string', default: '' },
  'out-quality': { type: 'string', default: '90' },
};
const { values } = util.parseArgs({ options });
console.log('values:', JSON.stringify(values));

/**
 * 批量heic图片转jpg
 */
Task.createTask({
  input: async () => {
    const list = await fs.readdirp(values['src-dir'], { fileFilter: values['file-filter'] });
    return list.map(entry => ({ srcFile: entry.fullPath }));
  },
  concurrency: 1,
  processRow: async (row, i) => {
    const srcFile = row.srcFile;
    const srcFileName = path.basename(srcFile);
    const srcDir = path.dirname(srcFile);
    const srcExtName = path.extname(srcFile);
    const srcName = srcFileName.replace(path.extname(srcFile), '');

    // 没有指定输出目录，输出到源目录
    const outDir = values['out-dir'] || srcDir;
    // 确保目录存在
    fs.ensureDirSync(outDir);

    const outName = dayjs(Number(srcName.replace('mmexport', ''))).format('YYYY-MM-DD HHmmss');
    const outFileName = outName + srcExtName;
    const outFile = path.join(outDir, outFileName);

    fs.renameSync(srcFile, outFile);

    row.outFile = outFile;
  },
});
