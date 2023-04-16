const fs = require('fs-extra');
const arrayFile = require('./array-file');
const csvFile = require('./csv-file');

module.exports = {
  ...fs,
  ...arrayFile,
  ...csvFile,

  // 获取文件大小，返回文件大小（字节）
  getFileSize(filePath) {
    const stats = fs.statSync(filePath);
    return stats.size;
  },
};
