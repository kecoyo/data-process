import axios from 'axios';

/**
 * 检查网络资源是否存在
 * @param {string} url
 * @returns
 */
export const checkExists = async (url: string) => {
  try {
    let res = await axios.head(url);
    return res.status; // 200
  } catch (err: any) {
    return err.response.status; // 404
  }
};
