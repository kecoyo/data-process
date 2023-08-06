// 该文件由 API文档 自动生成，请勿手动修改！
import request from './request';

/**
 * 班级
 */
const classApi = {
  /**
   * 获取学校里所有的班级信息
   * @description 班级管理的时候，调用此接口，可通过年级和班级类型筛选，支持分页
   * @param data
   * @returns
   */
  getAllClassInfo: async (data: {
    gradeId?: number; // 年级id
    type?: number; // 班级性质,1行政班 2非行政班 0全部
    pageIndex: number; // 第几页，从1开始
    pageSize: number; // 每页条数
  }) => {
    return request.post('/api/class/getAllClassInfo', data);
  },

  /**
   * 创建班级
   * @description 行政班级必须选择年级
   * @param data
   * @returns
   */
  createClass: async (data: {
    gradeId?: number; // 年级id
    type: number; // 班级性质,1行政班 2非行政班
    phaseType: number; // 年段
    adminId: number; // 班主任id
    name: string; // 班级名字
    clsNum: number; // 班号
    modeAdmin?: number; // 加入模式，1禁止加入 2自由加入 4批准加入
  }) => {
    return request.post('/api/class/createClass', data);
  },

  /**
   * 通过班级id获取班级详情
   * @description
   * @param data
   * @returns
   */
  getClassInfoById: async (data: {
    classId: number; // 班级id
  }) => {
    return request.post('/api/class/getClassInfoById', data);
  },

  /**
   * 解散班级
   * @description
   * @param data
   * @returns
   */
  dissolveClass: async (data: {
    classId: number; // 班级id
  }) => {
    return request.post('/api/class/dissolveClass', data);
  },

  /**
   * 移出班级
   * @description 对象是任课教师
   * @param data
   * @returns
   */
  quitClass: async (data: {
    classId: number; // 班级id
    targetId: number; // 目标用户id
  }) => {
    return request.post('/api/class/quitClass', data);
  },

  /**
   * 获取年级里的所有班级
   * @description
   * @param data
   * @returns
   */
  getGradeClass: async (data: {
    gradeId: number; // 年级
    mode?: number; // 班级性质，1行政班 2非行政班 0全部
  }) => {
    return request.post('/api/class/getGradeClass', data);
  },

  /**
   * 转移到其他班级
   * @description 对象是学生
   * @param data
   * @returns
   */
  changeClass: async (data: {
    classId: number; // 当前班级id
    userId: number; // 目标用户id
    targetClass: number; // 要加入的班级id
  }) => {
    return request.post('/api/class/changeClass', data);
  },

  /**
   * 获取班级所有老师信息
   * @description
   * @param data
   * @returns
   */
  getAllTeacherInfo: async (data: {
    classId: number; // 班级id
  }) => {
    return request.post('/api/class/getAllTeacherInfo', data);
  },

  /**
   * 转让班主任
   * @description
   * @param data
   * @returns
   */
  transferCharge: async (data: {
    classId: number; // 班级id
    userId: number; // 班主任id
    targetId: number; // 转让目标id
  }) => {
    return request.post('/api/class/transferCharge', data);
  },

  /**
   * 我的班级
   * @description 支持年级和班级性质筛选，支持分页
   * @returns
   */
  getMyClassInfo: async () => {
    return request.post('/api/class/getMyClassInfo');
  },

  /**
   * 通过手机号查询班级
   * @description 只要是老师的手机号就可以
   * @param data
   * @returns
   */
  getClassByPhone: async (data: {
    phone: string; // 手机号
    pageIndex: number; // 第几页，从1开始
    pageSize: number; // 每页条数
  }) => {
    return request.post('/api/class/getClassByPhone', data);
  },

  /**
   * 查找班级里同名的学生
   * @description
   * @param data
   * @returns
   */
  getStudentFromClass: async (data: {
    classId: number; // 班级id
    name: number; // 学生名字
  }) => {
    return request.post('/api/class/getStudentFromClass', data);
  },

  /**
   * 加入班级
   * @description 不传targetId，token用户自己加入班级，传targetID，token用户把target加入班级
   * @param data
   * @returns
   */
  joinClass: async (data: {
    classId: number; // 班级id
    targetId?: number; // 目标userId
    role?: number; // 用户角色 1学生 16教师
  }) => {
    return request.post('/api/class/joinClass', data);
  },

  /**
   * 更改班级信息
   * @description
   * @param data
   * @returns
   */
  updateClass: async (data: {
    classId: number; // 班级id
    name: string; // 班名
    clsNum: number; // 班号
    modeAdmin?: number; // 加入模式，1禁止加入 2自由加入 4批准加入
    grade: number; // 年级
  }) => {
    return request.post('/api/class/updateClass', data);
  },

  /**
   * 创建学生
   * @description
   * @param data
   * @returns
   */
  createStudent: async (data: {
    classId: number; // 班级id
    name: number; // 学生名字
    gender: number; // 性别
    studentId: string; // 学籍号
    avatar: string; // 照片
    fPhone: string; // 父亲手机号
    mPhone: string; // 母亲手机号
    guardianPhone: string; // 监护人手机号
  }) => {
    return request.post('/api/class/createStudent', data);
  },
};

export default classApi;
