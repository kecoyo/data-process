// 该文件由 API文档 自动生成，请勿手动修改！
import request from './request';

/**
 * 通用
 */
const commonApi = {
  /**
   * 获取所有区域数据
   * @description 打开首页的时候，获取所有区域数据
   * @returns
   */
  getAreaInfo: async () => {
    return request.post('/api/common/getAreaInfo');
  },

  /**
   * 获取学校id和名字
   * @description 根据省，市，区县，还有学段来获取学校的id和名字，如果不填市和区县，只获取省级的学校，不会获取市级
   * @param data
   * @returns
   */
  getSchoolInfo: async (data: {
    province: number; // 省id
    city?: number; // 市id
    county?: number; // 区县id
    phaseType: number; // 学段id
    pageIndex: number; // 第几页
    pageSize: number; // 每页条数
  }) => {
    return request.post('/api/common/getSchoolInfo', data);
  },

  /**
   * 增加自定义学校年级
   * @description gradeId自定义年级为0。K12系统年级必填
   * @param data
   * @returns
   */
  customGradeData: async (data: {
    gradeId?: number; // 年级id
    gradeName: string; // 年级名称
    gradeLevel: number; // 对应K12年级id
  }) => {
    return request.post('/api/common/customGradeData', data);
  },

  /**
   * 删除自定义学校年级
   * @description
   * @param data
   * @returns
   */
  delGradeData: async (data: {
    gradeid: number; // 年级id
  }) => {
    return request.post('/api/common/delGradeData', data);
  },

  /**
   * 获取学校年级数据
   * @description gradeId如果大于0，则获取对应的年级数据，否则就取学校所有年级
   * @param data
   * @returns
   */
  getGradeData: async (data: {
    gradeId: number; // 年级id
  }) => {
    return request.post('/api/common/getGradeData', data);
  },

  /**
   * 增加自定义学校学科
   * @description
   * @param data
   * @returns
   */
  customSubject: async (data: {
    subjectId: number; // 学科id
    subjectName: string; // 学科名字
  }) => {
    return request.post('/api/common/customSubject', data);
  },

  /**
   * 删除自定义学校学科
   * @description
   * @param data
   * @returns
   */
  delSubject: async (data: {
    subjectId: number; // 学科id
  }) => {
    return request.post('/api/common/delSubject', data);
  },

  /**
   * 获取学校学科数据
   * @description
   * @returns
   */
  getSubjectData: async () => {
    return request.post('/api/common/getSubjectData');
  },

  /**
   * 获取民族
   * @description
   * @returns
   */
  getNationInfo: async () => {
    return request.post('/api/common/getNationInfo');
  },

  /**
   * 获取党派定义
   * @description
   * @returns
   */
  getPartyInfo: async () => {
    return request.post('/api/common/getPartyInfo');
  },
};

export default commonApi;
