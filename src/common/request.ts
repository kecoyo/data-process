import axios from 'axios';
import fs from 'fs-extra';

/**
 * 检查网络资源是否存在
 *
 * @param {string} url
 * @returns
 */
export const checkExists = async (url: string): Promise<number> => {
  try {
    let res = await axios.head(url);
    return res.status; // 200
  } catch (err: any) {
    return err.response.status; // 404
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
  fs.writeFileSync(saveFile, res.data);
};
