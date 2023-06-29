const path = require('path');
const fs = require('fs-extra');
const arrayFile = require('./array-file');
const csvFile = require('./csv-file');
const readdirp = require('readdirp');
const axios = require('axios');

module.exports = {
  ...fs,
  ...arrayFile,
  ...csvFile,

  readdirp: readdirp.promise,

  // 获取文件大小，返回文件大小
  getFileSize(filePath) {
    const stats = fs.statSync(filePath);
    return stats.size;
  },

  /**
   * 下载文件
   * @param {*} url
   * @param {*} saveFile
   * @returns
   */
  downloadFile(url, saveFile) {
    return axios.get(url, { responseType: 'arraybuffer' }).then(res => {
      fs.writeFileSync(saveFile, res.data);
    });
  },
};
