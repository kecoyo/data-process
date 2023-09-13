import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';

/**
 * 检查网络资源是否存在
 *
 * @param {string} url
 * @returns
 */
export const checkExists = async (url: string): Promise<number | string> => {
  try {
    let res = await axios.get(url);
    return res.status; // 200
  } catch (err: any) {
    let { status, statusText } = err.response;
    return `${status} ${statusText}`; // 404
  }
};

/**
 * 下载文件
 * @param {*} url
 * @param {*} saveFile
 * @returns
 */
export const downloadFile = async (url: string, saveFile: string): Promise<void> => {
  const res = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  fs.ensureDirSync(path.dirname(saveFile));
  fs.writeFileSync(saveFile, res.data);
};
