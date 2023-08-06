// 该文件由 API文档 自动生成，请勿手动修改！
import request from './request';

/**
 * 学校
 */
const schoolApi = {
  /**
   * 我的学校
   * @description 返回数据里有schoolInfo:学校信息,applyInfo:申请入校信息，两个不会同时有
   * @returns
   */
  getMySchoolInfo: async () => {
    return request.post('/api/school/getMySchoolInfo');
  },

  /**
   * 退出学校获取手机验证码
   * @description 手机验证码有效时间是5分钟，在有效期间里，不再重复获取验证码
   * @param data
   * @returns
   */
  sendQuitCode: async (data: {
    phoneNumber: string; // 手机号
  }) => {
    return request.post('/api/school/sendQuitCode', data);
  },

  /**
   * 退出学校
   * @description 教师主动退出学校
   * @param data
   * @returns
   */
  quitSchool: async (data: {
    phone: string; // 手机号
    code: string; // 手机号验证码
  }) => {
    return request.post('/api/school/quitSchool', data);
  },

  /**
   * 加入学校申请列表
   * @description 只是加入审批列表
   * @param data
   * @returns
   */
  joinSchool: async (data: {
    schoolId: number; // 学校id
  }) => {
    return request.post('/api/school/joinSchool', data);
  },

  /**
   * 取消申请入校
   * @description 取消申请入校
   * @returns
   */
  cancelApply: async () => {
    return request.post('/api/school/cancelApply');
  },

  /**
   * 获取入校审批列表
   * @description 学校管理员才有,支持分页
   * @param data
   * @returns
   */
  getApplyList: async (data: {
    status: number; // 审批状态，0未审批，非0已审批
    pageIndex: number; // 第几页。从1开始
    pageSize: number; // 每页条数
  }) => {
    return request.post('/api/school/getApplyList', data);
  },

  /**
   * 入校审批
   * @description 审批通过了，才能加入学校，后端自动加入
   * @param data
   * @returns
   */
  reviewJoinSchool: async (data: {
    applyId: number; // 申请id
    userId: number; // 申请教师的用户id
    status: number; // 审批状态，0未审批，1通过，2拒绝，3拉黑
  }) => {
    return request.post('/api/school/reviewJoinSchool', data);
  },

  /**
   * 获取全校教师信息
   * @description
   * @param data
   * @returns
   */
  getSchoolTeachers: async (data: {
    pageIndex: number; // 第几页
    pageSize: number; // 每页条数
  }) => {
    return request.post('/api/school/getSchoolTeachers', data);
  },

  /**
   * 注册学校
   * @description 根据省，市，区县，还有学段来注册学校，省和学段必填，市，区县选填
   * @param data
   * @returns
   */
  registSchoolInfo: async (data: {
    areaid: number; // 地域id
    phaseType: number; // 学段id
    pid?: number; // 上级学校id
    mode: string; // 学段组合{Junior: 3}
    schoolName: string; // 学校名字
    comment?: string; // 学校全称
    sameName?: string; // 同地区是否允许同名学校，0不允许，1允许
    modeAdmin?: number; // 加入模式：1禁止加入 2自由加入 4批准加入
    property: number; // 学校属性 1省直属，2市直属，0无
    idCode: string; // 学校识别码
    contactName: string; // 联系人
    contactPhone: string; // 联系电话
  }) => {
    return request.post('/api/school/registSchoolInfo', data);
  },

  /**
   * 更改学校数据
   * @description
   * @param data
   * @returns
   */
  updateSchoolInfo: async (data: {
    schoolName: string; // 学校名字
    mode: string; // 学段组合
    property: number; // 学校属性，1省直属，2市直属，0无
    idCode: string; // 学校识别码
    phaseType: number; // 学段id
    modeAdmin?: number; // 加入模式：1禁止加入 2自由加入 4批准加入
    areaId: number; // 地域id
    pid?: number; // 上级学校id
    comment?: number; // 学校全名
    sameName?: number; // 同地域是否允许同名，0不允许，1允许
    contactName: string; // 联系人
    contactPhone: string; // 联系电话
  }) => {
    return request.post('/api/school/updateSchoolInfo', data);
  },

  /**
   * 移出学校
   * @description 管理员把教师移出学校
   * @param data
   * @returns
   */
  shiftOutSchool: async (data: {
    userId: number; // 目标userId
  }) => {
    return request.post('/api/school/shiftOutSchool', data);
  },

  /**
   * 编辑教师信息
   * @description
   * @param data
   * @returns
   */
  editTeacherInfo: async (data: {
    userId: string; // 教师的userId
    name: string; // 姓名
    phone: string; // 手机号
    idCard: string; // 身份证
    gender: number; // 性别
    avatar: string; // 头像
    bloodType: number; // 血型
    nation: string; // 民族
    birth: string; // 出生日期
    nationality: string; // 国籍
    native: string; // 籍贯
    politics: string; // 政治面貌
    partyTime: string; // 入党时间
    interests: string; // 兴趣爱好
    intro: string; // 个人简介
  }) => {
    return request.post('/api/school/editTeacherInfo', data);
  },

  /**
   * 创建教师
   * @description
   * @param data
   * @returns
   */
  addTeacher: async (data: {
    name: string; // 姓名
    phone: string; // 手机号
    gender: number; // 性别
    avatar: string; // 头像
    idCard: string; // 身份证
    classId: number; // 班级id
    subject: number; // 学科
    charge: number; // 是否是班主任，0不是，1是
  }) => {
    return request.post('/api/school/addTeacher', data);
  },
};

export default schoolApi;
