/* eslint-disable dot-notation */
const path = require('path');
const axios = require('axios');
const CsvTask = require('../../common/csv-task');
const shixunApi = require('../../apis/shixunApi');

/**
 * 不参与互评名单，填充用户的绑定信息
 */
CsvTask.createTask({
  input: path.join(__dirname, './not_takepart_list.csv'),
  // concurrency: 1,
  processRow: async (row, i) => {
    try {
      let login_name = row['账号'];
      if (!login_name) {
        throw new Error('缺少参数：login_name');
      }

      let user = await shixunApi.findUser(login_name);
      if (!user) {
        throw new Error('用户不存在');
      }

      row['USER_ID'] = user.user_id;

      let teacher = await shixunApi.getDockingTeacher(user.user_id);
      if (!teacher) {
        throw new Error('用户未绑定');
      }

      row['PXID'] = teacher.PXID;
      row['TID'] = teacher.TID;

      row.status = 'success';
    } catch (err) {
      row.status = err.message;
    }
  },
});
