const path = require('path');
const CsvTask = require('../common/csv-task');
const Convert = require('heic');
const fs = require('../common/fs-extra');
const util = require('util');
const extract = require('extract-zip');

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
  input: path.join(__dirname, './livp2jpg.csv'),
  concurrency: 1,
  processRow: async (row, i) => {
    if (row.status === 'OK') return;
    try {
      const workDir = path.dirname(row.fullPath); // 工作目录
      const outputDir = path.join(path.dirname(row.fullPath), './output'); // 输出目录

      // 确保目录存在
      fs.ensureDirSync(outputDir);

      // livp to zip
      const newFullPath = path.join(outputDir, row.basename.replace('.livp', '.zip'));
      fs.copyFileSync(row.fullPath, newFullPath);

      // 解压zip
      const aaa = await extract(newFullPath, { dir: outputDir });

      // 列出output目录中所有文件
      const files = await fs.readdirp.promise(outputDir);

      // 找出heic文件
      const heicFile = files.filter(file => file.fullPath.endsWith('.heic'))[0];

      // 将heic文件拷贝到外层目录，修改名字
      // fs.copySync(heicFile.fullPath, path.join(workDir, row.basename.replace('.livp', '.heic')));

      // .HEIC FILE -> .JPG FILE
      await convert.fileToFile(heicFile.fullPath);
      const jpgfile = heicFile.fullPath.replace('.heic', '.jpg');

      // 将heic文件拷贝到外层目录，修改名字
      fs.copySync(heicFile.fullPath, path.join(workDir, row.basename.replace('.livp', '.heic')));
      // 删除heic文件
      // fsExtra.removeSync(row.heicfile);

      // 删除output目录中的文件
      fs.removeSync(outputDir);

      // row.status = 'OK';
    } catch (err) {
      row.status = err.message;
      throw err;
    }
  },
});
