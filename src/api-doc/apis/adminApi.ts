// 该文件由 API文档 自动生成，请勿手动修改！
import request from './request';

/**
 * 角色和权限
 */
const adminApi = {
  /**
   * 获取年级管理员信息
   * @description gradeId>0,就显示单个年级的管理员，gradeId=0,显示所有年级的管理员
   * @param data
   * @returns
   */
  getGradeAdminList: async (data: {
    gradeId?: number; // 年级id
  }) => {
    return request.post('/api/admin/getGradeAdminList', data);
  },

  /**
   * 获取学校管理员信息
   * @description
   * @returns
   */
  getAdminInfo: async () => {
    return request.post('/api/admin/getAdminInfo');
  },

  /**
   * 添加管理员
   * @description 有年级id，则添加年级管理员信息，没有年级id，就添加学校管理员信息
   * @param data
   * @returns
   */
  addAdmin: async (data: {
    gradeId?: number; // 年级id
    targetId: number; // 目标教师的用户id，全校所有老师
  }) => {
    return request.post('/api/admin/addAdmin', data);
  },

  /**
   * 取消管理员
   * @description 有年级id，则取消年级管理员信息，没有年级id，就取消学校管理员信息
   * @param data
   * @returns
   */
  cancelAdmin: async (data: {
    gradeId?: number; // 年级id
    targetId: number; // 目标教师的用户id
  }) => {
    return request.post('/api/admin/cancelAdmin', data);
  },

  /**
   * 获取控制班牌绑定和解绑的权限
   * @description
   * @returns
   */
  getControlClassCard: async () => {
    return request.post('/api/admin/getControlClassCard');
  },

  /**
   * 设置控制班牌绑定和解绑的权限
   * @description
   * @param data
   * @returns
   */
  setControlClassCard: async (data: {
    gradeAdmin: number; // 年级主任 0无权限，1有权限
    classCharge: number; // 班主任 0无权限，1有权限
  }) => {
    return request.post('/api/admin/setControlClassCard', data);
  },
};

export default adminApi;
