const axios = require('axios');

const httpClient = {
  /**
   * 检查网络资源是否存在
   * @param {string} url
   * @returns
   */
  async checkExists(url) {
    try {
      let res = await axios.head(url);
      return res.status; // 200
    } catch (err) {
      return err.response.status; // 404
    }
  },
};

module.exports = httpClient;
