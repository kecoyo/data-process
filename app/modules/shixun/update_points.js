const path = require('path');
const _ = require('lodash');
const { createCsvTask } = require('../../common/task');
const shixunApi = require('../../common/shixun_api');

/**
 * 师训处理老师更换能力点
 */
createCsvTask({
  input: path.join(__dirname, './update_points-input.csv'),
  output: path.join(__dirname, './update_points-output.csv'),
  options: {
    headers: true,
  },
  processRow: async (row, i) => {
    // userinfo
    if (row.user_id || row.login_name) {
      const user = await shixunApi.findUser(row.user_id || row.login_name);
      if (user) {
        Object.assign(row, _.pick(user, ['user_id', 'uname', 'login_name', 'school_id']));
      }
    } else {
      throw new Error('缺少参数：(user_id | login_name)');
    }

    // old_points
    if (row.school_id && row.user_id) {
      const userStatic = await shixunApi.getUserStatic(row.school_id, row.user_id);
      if (userStatic) {
        const points = userStatic.onlinedetail.map(o => o.course_name.split(' ')[0]);
        Object.assign(row, {
          old_points: points.join(';'),
        });
      } else {
        throw new Error('getUserStatic error');
      }
    } else {
      throw new Error('缺少参数：(user_id | school_id)');
    }

    // success
    if (row.points) {
      row.success = true;
      if (row.points !== row.old_points) {
        let points = row.points.replace(/[;]/g, ',');
        const success = await shixunApi.resetSelectedThemeCourseItem(row.user_id, points);
        row.success = success;
      }
    } else {
      throw new Error('缺少参数：(points)');
    }

    // new_points
    {
      const userStatic = await shixunApi.getUserStatic(row.school_id, row.user_id);
      if (userStatic) {
        const points = userStatic.onlinedetail.map(o => o.course_name.split(' ')[0]);
        Object.assign(row, {
          new_points: points.join(';'),
        });
      } else {
        throw new Error('getUserStatic error');
      }
    }
  },
});
