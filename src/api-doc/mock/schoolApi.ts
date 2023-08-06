// 该文件由 API文档 自动生成，请勿手动修改！
import Mock from 'mockjs';

/**
 * 学校
 */
export default {
  // 我的学校
  'POST /api/school/getMySchoolInfo': Mock.mock({
    result: 0,
    data: true,
  }),
  // 退出学校获取手机验证码
  'POST /api/school/sendQuitCode': Mock.mock({
    result: 0,
    data: true,
  }),
  // 退出学校
  'POST /api/school/quitSchool': Mock.mock({
    result: 0,
    data: true,
  }),
  // 加入学校申请列表
  'POST /api/school/joinSchool': Mock.mock({
    result: 0,
    data: true,
  }),
  // 取消申请入校
  'POST /api/school/cancelApply': Mock.mock({
    result: 0,
    data: true,
  }),
  // 获取入校审批列表
  'POST /api/school/getApplyList': Mock.mock({
    result: 0,
    data: true,
  }),
  // 入校审批
  'POST /api/school/reviewJoinSchool': Mock.mock({
    result: 0,
    data: true,
  }),
  // 获取全校教师信息
  'POST /api/school/getSchoolTeachers': Mock.mock({
    result: 0,
    data: true,
  }),
  // 注册学校
  'POST /api/school/registSchoolInfo': Mock.mock({
    result: 0,
    data: true,
  }),
  // 更改学校数据
  'POST /api/school/updateSchoolInfo': Mock.mock({
    result: 0,
    data: true,
  }),
  // 移出学校
  'POST /api/school/shiftOutSchool': Mock.mock({
    result: 0,
    data: true,
  }),
  // 编辑教师信息
  'POST /api/school/editTeacherInfo': Mock.mock({
    result: 0,
    data: true,
  }),
  // 创建教师
  'POST /api/user/addTeacher': Mock.mock({
    result: 0,
    data: true,
  }),
};