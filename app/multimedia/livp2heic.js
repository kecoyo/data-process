const path = require('path');
const Task = require('../common/task');
const fs = require('../common/fs-extra');
const util = require('util');
const extract = require('extract-zip');

/**
 * 批量livp图片转heic
 */
Task.createTask({
  input: function () {
    // return fs.readdirp('D:\\livp', { fileFilter: '*.livp' });
    return fs.readdirp('E:\\我的相册\\来自：iPhone7 Plus\\2021', { fileFilter: '*.livp' });
  },
  // concurrency: 1,
  processRow: async (row, i) => {
    if (row.status === 'OK') return;
    try {
      const livpFile = row.fullPath; // 原始的livp文件
      const name = row.basename.replace('.livp', ''); // 文件名称，不带扩展名
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

      let isCopy = false;

      // 找出heic文件
      const heicFiles = await fs.readdirp(tempDir, { fileFilter: '*.heic' });
      if (heicFiles.length > 0) {
        let heicFile = heicFiles[0].fullPath;

        // 将heic文件拷贝到外层目录，并修改名字
        let heicFileName = name + '.heic';
        fs.copySync(heicFile, path.join(currDir, heicFileName));
        isCopy = true;
      }

      const jpegFiles = await fs.readdirp(tempDir, { fileFilter: '*.jpeg' });
      if (jpegFiles.length > 0) {
        let jpegFile = jpegFiles[0].fullPath;

        // 将heic文件拷贝到外层目录，并修改名字
        let jpgFileName = name + '.jpg';
        fs.copySync(jpegFile, path.join(currDir, jpgFileName));
        isCopy = true;
      }

      if (isCopy) {
        // 删除output目录中的文件
        fs.removeSync(tempDir);
        // 删除livp文件
        fs.removeSync(livpFile);
      }

      // row.status = 'OK';
    } catch (err) {
      row.status = err.message;
      throw err;
    }
  },
});
