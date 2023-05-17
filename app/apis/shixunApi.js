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

  // 查找用户(user_id/login_name)
  async findUser(phone_num) {
    return await axios
      .post('https://ncshixuneduyun.ljlx.com/webapi/User/FindUser', {
        key: phone_num,
      })
      .then(res => _.get(res, 'data.data'));
  },

  // 获取老师绑定信息
  async getDockingTeacher(user_id) {
    return await axios
      .post('https://shixun.ljlx.com/shixun/getDockingTeacherByUserId', {
        user_id: user_id,
      })
      .then(res => _.get(res, 'data.data'));
  },

  // 获取用户的研修小组
  async GetGroupByUser(projectId, themeId, user_id) {
    return await axios
      .post('https://shixun.ljlx.com/shixun/GetGroupByUser', {
        project_id: projectId,
        theme_id: themeId,
        user_id: user_id,
      })
      .then(res => _.get(res, 'data.data'));
  },

  // const projectId = '26';
  // const themeId = 10042;

  // // 修改用户的能力点
  // async resetSelectedThemeCourseItem(user_id, points) {
  //   return await httpClient
  //     .post('https://shixun.ljlx.com/shixun/RestSetSelectedThemeCourseItem', {
  //       projectID: '26',
  //       themeID: 10042,
  //       userId: user_id,
  //       diagnosis: points,
  //     })
  //     .then(res => res.data);
  // },

  // // 修改用户的能力点
  // async getUserStatic(school_id, user_id) {
  //   return await httpClient
  //     .post('https://shixun.ljlx.com/shixun/GetUserStatic', {
  //       project_id: projectId,
  //       theme_id: themeId,
  //       school_id: school_id,
  //       user_id: user_id,
  //     })
  //     .then(res => res.data);
  // },
};

module.exports = shixunApi;
