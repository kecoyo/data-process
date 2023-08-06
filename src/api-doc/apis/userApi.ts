// 该文件由 API文档 自动生成，请勿手动修改！
import request from './request';

/**
 * 用户
 */
const userApi = {
  /**
   * 更改资料获取手机验证码
   * @description 手机验证码有效时间是5分钟，在有效期间里，不再重复获取验证码
   * @param data
   * @returns
   */
  sendUpdateCode: async (data: {
    phoneNumber: string; // 手机号
  }) => {
    return request.post('/api/user/sendUpdateCode', data);
  },

  /**
   * 更新用户资料
   * @description 无userId,更新自己的资料，有userid，token用户更新userid的资料
   * @param data
   * @returns
   */
  updateUserInfo: async (data: {
    userId?: number; // 用户id
    role: number; // 角色,1更新教师资料，非1更新家长和学生资料
    name?: string; // 姓名
    phone?: string; // 手机号
    avatar?: string; // 头像
    gender?: number; // 性别
    idCard?: string; // 身份证
    email?: string; // 邮箱
    birth?: number; // 出生日期,时间戳 秒
    faceImg?: string; // 人脸识别图像
    bloodType?: number; // 血型
    nationality?: number; // 国籍
    native?: number; // 籍贯
    address?: string; // 家庭住址
    politics?: number; // 政治面貌
    partyTime?: number; // 入党时间
    coparation?: string; // 公司名称
    education?: string; // 学历
    interests?: string; // 兴趣爱好
    introduce?: string; // 个人简介
    certCode?: string; // 教师资格证/学籍号
    teachDate?: number; // 任教开始日期，时间戳 秒
    classMasterDate?: number; // 班主任开始日期 时间戳 秒
    nation?: number; // 民族
  }) => {
    return request.post('/api/user/updateUserInfo', data);
  },

  /**
   * 获取用户基本资料
   * @description 获取自己的资料，不传userId,获取他人的资料，需要userId
   * @param data
   * @returns
   */
  getBaseInfo: async (data: {
    userId: number; // 用户id
  }) => {
    return request.post('/api/user/getBaseInfo', data);
  },

  /**
   * 更新用户基本资料
   * @description 更新自己的资料，不传userId,更新他人的资料，需要userId
   * @param data
   * @returns
   */
  updateBaseInfo: async (data: {
    name?: string; // 姓名
    phone?: string; // 手机号
    code?: string; // 手机验证码
    idCard?: string; // 身份证
    gender?: number; // 性别,0不明，1男，2女
    avatar?: string; // 头像
    userId?: number; // 用户id
  }) => {
    return request.post('/api/user/updateBaseInfo', data);
  },

  /**
   * 获取手机号对班级家长是否可见设置
   * @description
   * @returns
   */
  getPhoneVisible: async () => {
    return request.post('/api/user/getPhoneVisible');
  },

  /**
   * 设置手机号对班级家长是否可见
   * @description 有classId,只设置单个班级，没有classId,则是全部设置
   * @param data
   * @returns
   */
  setPhoneVisible: async (data: {
    classId?: number; // 班级id
    status: number; // 是否可见，1是，0否
  }) => {
    return request.post('/api/user/setPhoneVisible', data);
  },

  /**
   * 获取用户扩展资料
   * @description 获取自己的资料，不传userId,获取他人的资料，需要userId
   * @param data
   * @returns
   */
  getExtendInfo: async (data: {
    userId?: number; // 用户id
  }) => {
    return request.post('/api/user/getExtendInfo', data);
  },

  /**
   * 更新用户扩展资料
   * @description 更新自己的资料，不传userId,更新他人的资料，需要userId
   * @param data
   * @returns
   */
  updateExtendInfo: async (data: {
    userId?: number; // 用户id
    birth?: number; // 出生日期,时间戳 秒
    faceImg?: string; // 人脸识别图像
    bloodType?: number; // 血型
    nationality?: number; // 国籍
    native?: number; // 籍贯
    address?: string; // 家庭住址
    politics?: number; // 政治面貌
    partyTime?: number; // 入党时间
    coparation?: string; // 公司名称
    education?: string; // 学历
    interests?: string; // 兴趣爱好
    introduce?: string; // 个人简介
    certCode?: string; // 教师资格证/学籍号
    teachDate?: number; // 任教开始日期，时间戳 秒
    classMasterDate?: number; // 班主任开始日期 时间戳 秒
    nation?: number; // 民族
  }) => {
    return request.post('/api/user/updateExtendInfo', data);
  },
};

export default userApi;
