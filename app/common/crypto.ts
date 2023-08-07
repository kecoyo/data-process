import crypto from 'crypto';
import fs from 'fs-extra';

/**
 * 获取文本的MD5
 * @param {*} string
 * @returns
 */
export function md5(string: string) {
  return crypto.createHash('md5').update(string).digest('hex');
}

/**
 * 获取文件的MD5
 * @param {*} file
 * @returns
 */
export function fileMd5(file: string) {
  const buf = fs.readFileSync(file);
  const md5Value = crypto.createHash('md5').update(buf).digest('hex');
  return md5Value;
}
