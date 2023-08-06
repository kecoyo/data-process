// 该文件由 API文档 自动生成，请勿手动修改！
import Mock from 'mockjs';

/**
 * 通讯录
 */
export default {
  // 老师获取通讯录
  'POST /api/phone/getSchoolPhones': Mock.mock({
    result: 0,
    data: true,
  }),
  // 家长获取通讯录
  'POST /api/phone/getClassPhones': Mock.mock({
    result: 0,
    data: true,
  }),
};