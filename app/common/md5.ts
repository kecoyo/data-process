import crypto from 'crypto';
import fs from 'fs-extra';

/**
 * 获取文件的MD5
 * @param {*} filePath
 * @returns
 */
export function md5(filePath: string) {
  const buf = fs.readFileSync(filePath);
  const md5Value = crypto.createHash('md5').update(buf).digest('hex');
  return md5Value;
}
