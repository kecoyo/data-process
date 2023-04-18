const axios = require('axios');
const _ = require('lodash');

const projectId = '26';
const themeId = 10042;

const shixunApi = {
  /**
   * 根据video_id获取m3u8地址
   * @param {*} video_id
   * @returns
   */
  async videoCheck(video_id) {
    return await axios.get('https://resc.app.ljlx.com/rest/video/check.ashx?video_id=' + video_id).then(res => {
      return _.get(res, 'data.data[0].uri');
    });
  },
};

module.exports = shixunApi;
