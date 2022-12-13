const path = require('path');
const _ = require('lodash');
const { createCsvTask } = require('../common/task');
const shixunApi = require('../common/shixun_api');

/**
 * 师训处理数据
 */
createCsvTask({
  input: path.join(__dirname, './input.csv'),
  output: path.join(__dirname, './output.csv'),
  options: {
    headers: true,
  },
  processRow: async (row, i) => {
    // userinfo
    if (row.user_id || row.login_name) {
      const user = await shixunApi.findUser(row.user_id || row.login_name);
      if (user) {
        Object.assign(row, _.pick(user, ['user_id', 'uname', 'login_name', 'user_role', 'school_id', 'school_name']));
      }
    } else {
      throw new Error('缺少参数：(user_id | login_name)');
    }

    if (row.user_id) {
      const group = await shixunApi.GetGroupByUser(row.user_id);
      if (group) {
        Object.assign(row, group);
      }
    } else {
      throw new Error('缺少参数：(user_id)');
    }

    if (row.school_id) {
      const userStatic = await shixunApi.getUserStatic(row.school_id, row.user_id);
      if (userStatic) {
        const points = userStatic.onlinedetail.map((o) => o.course_name.split(' ')[0]);
        const totalScore = parseFloat(_.sumBy(userStatic.list, 'user_score').toFixed(2));
        Object.assign(row, {
          points: points.join(';'),
          scores: userStatic.onlinedetail.map((o) => o.ut).join(';'),
          total_score: totalScore,
          points_len: points.length,
        });
      } else {
        throw new Error('getUserStatic error');
      }
    } else {
      throw new Error('缺少参数：(school_id)');
    }
  },
});
