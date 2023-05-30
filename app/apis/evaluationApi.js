const axios = require('axios');
const _ = require('lodash');
const config = require('../common/config');

const headers = {
  Cookie: config.get('Cookie'),
};

const evaluationApi = {
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
