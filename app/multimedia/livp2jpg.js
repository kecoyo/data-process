const path = require('path');
const CsvTask = require('../common/csv-task');
const Convert = require('heic');
const fs = require('../common/fs-extra');
const util = require('util');
const extract = require('extract-zip');

const convert = new Convert();

/**
 * 批量heic图片转jpg
 */
CsvTask.createTask({
  input: path.join(__dirname, './livp2jpg.csv'),
  // concurrency: 1,
  processRow: async (row, i) => {
    if (row.status === 'OK') return;
    try {
      const livpFile = row.fullPath;
      const name = row.basename.replace('.livp', '');
      const currDir = path.dirname(livpFile); // 当前目录
      const tempDir = path.join(currDir, name); // 临时目录

      // 确保临时目录存在
      fs.ensureDirSync(tempDir);

      // livp to zip
      const zipFileName = name + '.zip';
      const zipFile = path.join(tempDir, zipFileName);
      fs.copyFileSync(livpFile, zipFile);

      // 解压zip
      await extract(zipFile, { dir: tempDir });

      // 列出output目录中所有文件
      const files = await fs.readdirp.promise(tempDir);

      // 找出heic文件
      let heicFile = files.filter(entry => entry.fullPath.endsWith('.heic'))[0].fullPath;
      let newHeicFile = path.join(tempDir, name + '.heic');
      fs.renameSync(heicFile, newHeicFile);
      heicFile = newHeicFile;

      // 将heic文件拷贝到外层目录，修改名字
      // fs.copySync(heicFile.fullPath, path.join(workDir, row.basename.replace('.livp', '.heic')));

      // .HEIC FILE -> .JPG FILE
      await convert.fileToFile(heicFile);

      const jpgFileName = name + '.jpg';
      const jpgFile = path.join(tempDir, jpgFileName);

      // 将heic文件拷贝到外层目录，修改名字
      fs.copySync(jpgFile, path.join(currDir, jpgFileName));

      // 删除output目录中的文件
      fs.removeSync(tempDir);

      // row.status = 'OK';
    } catch (err) {
      row.status = err.message;
      throw err;
    }
  },
});
