import axios from 'axios';
import _ from 'lodash';
import config from '../common/config';

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

export default evaluationApi;
