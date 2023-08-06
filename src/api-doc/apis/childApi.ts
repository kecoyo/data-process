// 该文件由 API文档 自动生成，请勿手动修改！
import request from './request';

/**
 * 孩子
 */
const childApi = {
  /**
   * 获取家庭成员信息
   * @description 包括其他家长和孩子的数据
   * @returns
   */
  getFamilyInfo: async () => {
    return request.post('/api/child/getFamilyInfo');
  },

  /**
   * 获取孩子信息
   * @description userId是其他家长的id,用来查看其他家长与孩子的关系
   * @param data
   * @returns
   */
  getChildrenInfo: async (data: {
    userId?: number; // 用户id
  }) => {
    return request.post('/api/child/getChildrenInfo', data);
  },

  /**
   * 编辑其他家长信息
   * @description
   * @param data
   * @returns
   */
  editParentInfo: async (data: {
    name?: string; // 姓名
    phone: string; // 手机号
    gender: number; // 性别
    avatar?: string; // 头像
    relation: {
      userId: number; // 孩子userId
      relation: number; // 关系
    }[]; // 关系列表
  }) => {
    return request.post('/api/child/editParentInfo', data);
  },

  /**
   * 解除和孩子关系
   * @description
   * @returns
   */
  unbindRelation: async () => {
    return request.post('/api/child/unbindRelation');
  },

  /**
   * 添加家长
   * @description
   * @param data
   * @returns
   */
  addParent: async (data: {
    name?: string; // 姓名
    phone: string; // 手机号
    gender: number; // 性别
    avatar?: string; // 头像
    relation: {
      userId: number; // 孩子userId
      relation: number; // 关系
    }[]; // 关系列表
  }) => {
    return request.post('/api/child/addParent', data);
  },

  /**
   * 添加孩子
   * @description 班级查找同名的存在，不存在，create的值为1，存在的话，直接绑定为0，不直接绑定就为1
   * @param data
   * @returns
   */
  addChild: async (data: {
    name: string; // 姓名
    gender: number; // 性别
    relationId: number; // 关系id
    avatar: string; // 头像
    create: number; // 0直接绑定，1是创建同名孩子
    userId?: number; // 孩子的userid
  }) => {
    return request.post('/api/child/addChild', data);
  },
};

export default childApi;
