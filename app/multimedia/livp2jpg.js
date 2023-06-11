const path = require('path');
const util = require('util');
const Task = require('../common/task');
const fs = require('../common/fs-extra');
const { spawn } = require('../common/child_process');
const extract = require('extract-zip');

const options = {
  'src-dir': { type: 'string', default: 'D:\\livp' },
  'file-filter': { type: 'string', default: '*.livp' },
  'out-dir': { type: 'string', default: 'D:\\livp\\jpg' },
  'out-extname': { type: 'string', default: '.jpg' },
  'out-suffix': { type: 'string', default: '' },
  'out-quality': { type: 'string', default: '85' },
};
const { values } = util.parseArgs({ options });
console.log('values:', JSON.stringify(values));

/**
 * 批量livp图片转heic
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

    // 输出目录，没有，输出到源目录
    const outDir = values['out-dir'] || srcDir;
    // 确保输出目录存在
    fs.ensureDirSync(outDir);

    // 临时目录
    const tempDir = path.join(outDir, fileName);
    // 确保临时目录存在
    fs.ensureDirSync(tempDir);

    // livp to zip
    const zipFileName = fileName + '.zip';
    const zipFile = path.join(tempDir, zipFileName);
    fs.copyFileSync(srcFile, zipFile);

    // 解压zip到临时目录
    await extract(zipFile, { dir: tempDir });

    // 找出heic/jpeg文件
    const findFiles = await fs.readdirp(tempDir, { fileFilter: ['*.heic', '*.jpeg', '*.jpg', '*.png'] });
    if (findFiles.length > 0) {
      let imgFile = findFiles[0].fullPath;

      // 转换格式，并压缩
      const outFileName = fileName + values['out-suffix'] + values['out-extname'];
      const outFile = path.join(outDir, outFileName);
      await spawn('magick', [imgFile, '-quality', values['out-quality'], outFile]);
      row.outFile = outFile;

      // 删除临时目录
      fs.removeSync(tempDir);
    }
  },
});
