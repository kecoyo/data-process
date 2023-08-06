// 该文件由 API文档 自动生成，请勿手动修改！
import request from './request';

/**
 * 班牌
 */
const serviceApi = {
  /**
   * 获取班牌信息
   * @description 不填gradeId，默认搜索全校班牌,可以通过deviceId查找对应设备的绑定信息
   * @param data
   * @returns
   */
  getCardInfo: async (data: {
    gradeId?: number; // 年级id
    classId?: number; // 班级id
    deviceId?: number; // 设备id
  }) => {
    return request.post('/api/service/getCardInfo', data);
  },

  /**
   * 班牌绑定
   * @description
   * @param data
   * @returns
   */
  bindCard: async (data: {
    gradeId: number; // 年级id
    classId: number; // 班级id
    deviceId: number; // 设备编号
    location: string; // 设备所在位置
  }) => {
    return request.post('/api/service/bindCard', data);
  },

  /**
   * 班牌解绑
   * @description
   * @param data
   * @returns
   */
  cancleBindCard: async (data: {
    classId: number; // 班级id
    deviceId: number; // 设备编号
  }) => {
    return request.post('/api/service/cancleBindCard', data);
  },

  /**
   * 获取开关机时间
   * @description 班牌app轮询获取绑定信息，来校验是否绑定成功
   * @param data
   * @returns
   */
  getCtrlTime: async (data: {
    deviceId: number; // 设备编号
  }) => {
    return request.post('/api/service/getCtrlTime', data);
  },

  /**
   * 设置开关机时间
   * @description 班牌app轮询获取绑定信息，来校验是否绑定成功
   * @param data
   * @returns
   */
  setCtrlTime: async (data: {
    deviceId: number; // 设备编号
    openTime: number; // 开机时间
    closeTime: number; // 关机时间
  }) => {
    return request.post('/api/service/setCtrlTime', data);
  },
};

export default serviceApi;
