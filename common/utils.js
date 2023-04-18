const fs = require('fs-extra');

module.exports = {
  // 获取文件大小，返回文件大小（字节）
  getFileSize(filePath) {
    const stats = fs.statSync(filePath);
    return stats.size;
  },
};
