const path = require('path');
const fs = require('fs-extra');
const arrayFile = require('./array-file');
const csvFile = require('./csv-file');
const readdirp = require('readdirp');

module.exports = {
  ...fs,
  ...arrayFile,
  ...csvFile,

  readdirp: readdirp,

  // 获取文件大小，返回文件大小
  getFileSize(filePath) {
    const stats = fs.statSync(filePath);
    return stats.size;
  },
};
