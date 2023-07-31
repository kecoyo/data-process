import axios from 'axios';
import crypto from 'crypto';
import fs from 'fs-extra';
import readdirp from 'readdirp';
import arrayFile from './array-file';
import csvFile from './csv-file';

const fsExtra = {
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

  /**
   * 获取文件的MD5
   * @param {*} filePath
   * @returns
   */
  md5(filePath) {
    const buf = fs.readFileSync(filePath);
    const md5Value = crypto.createHash('md5').update(buf).digest('hex');
    return md5Value;
  },
};

export default fsExtra;
