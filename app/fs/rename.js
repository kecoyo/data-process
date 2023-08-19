const path = require('path');
const util = require('util');
const Task = require('../common/task');
const fs = require('../common/fs-extra');
const dayjs = require('dayjs');

const options = {
  'src-dir': { type: 'string', default: 'E:\\我的相册\\来自：iPhone6\\Video_' },
  'file-filter': { type: 'string', default: 'Video_*.*' },
  'out-dir': { type: 'string', default: '' },
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

    // Video_20150124_214821_F5C.jpg

    let outName = srcName.replace('Video_', '');
    outName = `${outName.substring(0, 4)}-${outName.substring(4, 6)}-${outName.substring(6, 8)} ${outName.substring(9, 15)}`;

    const outExtName = srcExtName.toLowerCase();
    const outFileName = outName + outExtName;
    const outFile = path.join(outDir, outFileName);

    // 重命名
    fs.renameSync(srcFile, outFile);

    row.outFile = outFile;
  },
});
