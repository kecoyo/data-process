const axios = require('axios');
const _ = require('lodash');

const headers = {
  Cookie: '',
};

const evaluationApi = {
  addHeader(key, value) {
    headers[key] = value;
  },

  /**
   * 添加新评价类型
   */
  async addTitle(data) {
    return await axios.post('http://evaluate.app.ljlx.com/evaluation2/Title/AddTitle', data, { headers }).then(res => {
      return _.get(res, 'data');
    });
  },
  /**
   * 删除的评价类型
   */
  async delTitle(data) {
    return await axios.post('http://evaluate.app.ljlx.com/evaluation2/Title/DelTitle', data, { headers }).then(res => {
      return _.get(res, 'data');
    });
  },
};

module.exports = evaluationApi;
