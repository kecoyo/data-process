// 该文件由 API文档 自动生成，请勿手动修改！
import request from './request';

/**
 * 通讯录
 */
const phoneApi = {
  /**
   * 老师获取通讯录
   * @description 老师获取全校职工的手机号和自己班级家长的手机号，如果没有手机号就不显示。如果老师有多个班级，要显示所有班级名字
   * @param data
   * @returns
   */
  getSchoolPhones: async (data: {
    pageIndex: number; // 第几页
    pageSize: number; // 每页条数
    role: number; // 角色 1教师，2家长
    classId?: number; // 班级id，查看家长的时候才有
  }) => {
    return request.post('/api/phone/getSchoolPhones', data);
  },

  /**
   * 家长获取通讯录
   * @description 家长孩子所在班级的老师手机号，还需要该老师选择对此班级显示手机号
   * @returns
   */
  getClassPhones: async () => {
    return request.post('/api/phone/getClassPhones');
  },

  /**
   * 获取用户手机号
   * @description 需要打电话的时候，通过userid获取手机号
   * @param data
   * @returns
   */
  getUserPhone: async (data: {
    userId: number; // 用户id
  }) => {
    return request.post('/api/phone/getUserPhone', data);
  },
};

export default phoneApi;
