// 该文件由 API文档 自动生成，请勿手动修改！
import Mock from 'mockjs';

/**
 * 用户
 */
export default {
  // 更改资料获取手机验证码
  'POST /api/user/sendUpdateCode': Mock.mock({
    result: 0,
    data: true,
  }),
  // 获取用户基本资料
  'POST /api/user/getBaseInfo': Mock.mock({
    result: 0,
    data: true,
  }),
  // 更新用户基本资料
  'POST /api/user/updateBaseInfo': Mock.mock({
    result: 0,
    data: true,
  }),
  // 获取用户扩展资料
  'POST /api/user/getExtendInfo': Mock.mock({
    result: 0,
    data: true,
  }),
  // 获取手机号对班级家长是否可见设置
  'POST /api/user/getPhoneVisible': Mock.mock({
    result: 0,
    data: true,
  }),
  // 设置手机号对班级家长是否可见
  'POST /api/user/setPhoneVisible': Mock.mock({
    result: 0,
    data: true,
  }),
  // 更新用户扩展资料
  'POST /api/user/updateExtendInfo': Mock.mock({
    result: 0,
    data: true,
  }),
};