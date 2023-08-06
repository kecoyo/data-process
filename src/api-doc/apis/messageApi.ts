// 该文件由 API文档 自动生成，请勿手动修改！
import request from './request';

/**
 * 消息
 */
const messageApi = {
  /**
   * 获取消息中心的所有消息
   * @description 根据消息类型msgType跳转到不同接口，前后端统一定下枚举
   * @param data
   * @returns
   */
  getAllMessage: async (data: {
    pageIndex: number; // 第几页
    pageSize: number; // 每页条数
  }) => {
    return request.post('/api/message/getAllMessage', data);
  },

  /**
   * 点击读取消息
   * @description 没有msgid的时候，是全部设为已读。有msgId,对单个消息设置已读
   * @param data
   * @returns
   */
  readMessage: async (data: {
    msgId: number; // 消息id
  }) => {
    return request.post('/api/message/readMessage', data);
  },

  /**
   * 获取传音螺列表
   * @description 通过token和classId组合来获取数据，但token和classId，不能同时为空
   * @param data
   * @returns
   */
  getLeaveMessageList: async (data: {
    classId: number; // 班级id
    pageIndex: number; // 第几页
    pageSize: number; // 每页条数
  }) => {
    return request.post('/api/message/getLeaveMessageList', data);
  },

  /**
   * 传音螺详情
   * @description 只能看自己的留言
   * @param data
   * @returns
   */
  getLeaveMessageInfo: async (data: {
    userId: number; // 接受者id
    pageIndex: number; // 第几页
    pageSize: number; // 每页条数
  }) => {
    return request.post('/api/message/getLeaveMessageInfo', data);
  },

  /**
   * 传音螺发送消息
   * @description
   * @param data
   * @returns
   */
  leaveMessage: async (data: {
    recvid: number; // 接收者id
    type: string; // 留言类型
    content: string; // 留言内容
  }) => {
    return request.post('/api/message/leaveMessage', data);
  },

  /**
   * 视频通话列表
   * @description 能看到所有家长的通话简要信息
   * @param data
   * @returns
   */
  getVedioChatList: async (data: {
    pageIndex: number; // 第几页
    pageSize: number; // 每页条数
  }) => {
    return request.post('/api/message/getVedioChatList', data);
  },

  /**
   * 视频通话明细
   * @description 只能看自己的通话明细
   * @param data
   * @returns
   */
  getVedioChatInfo: async (data: {
    pageIndex: number; // 第几页
    pageSize: number; // 每页条数
  }) => {
    return request.post('/api/message/getVedioChatInfo', data);
  },

  /**
   * 视频通话记录
   * @description 通话开始时，status传0;结束通话时，status传1
   * @param data
   * @returns
   */
  setVedioChat: async (data: {
    userId: number; // 通话对象userId
    status: number; // 通话状态，0开始，1结束
  }) => {
    return request.post('/api/message/setVedioChat', data);
  },
};

export default messageApi;
