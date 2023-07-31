import axios from 'axios';
import _ from 'lodash';

const eduyunApi = {
  /**
   * 获取云平台用户证书列表
   * @param {number} certId 证书id
   * @returns
   */
  async getUserSysCertList(data) {
    data = _.defaultsDeep({}, data, {
      certId: 0,
      state: 1, // 0，未发送，1：已发送，2：已撤销，3：已删除
      page_index: 1,
      page_size: 10,
      userKey: '',
    });
    return await axios.post('https://nanchongeduyun.ljlx.com/webapi/cert/UserSysCertList', data).then(res => {
      return _.get(res, 'data.data.list', []);
    });
  },
};

export default eduyunApi;
