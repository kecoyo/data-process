// 该文件由 API文档 自动生成，请勿手动修改！
import Mock from 'mockjs';

/**
 * 消息
 */
export default {
  // 获取消息中心的所有消息
  'POST /api/message/getAllMessage': Mock.mock({
    result: 0,
    data: true,
  }),
  // 点击读取消息
  'POST /api/message/readMessage': Mock.mock({
    result: 0,
    data: true,
  }),
  // 获取传音螺列表
  'POST /api/message/getLeaveMessageList': Mock.mock({
    result: 0,
    data: true,
  }),
  // 传音螺详情
  'POST /api/message/getLeaveMessageInfo': Mock.mock({
    result: 0,
    data: true,
  }),
  // 传音螺发送消息
  'POST /api/message/leaveMessage': Mock.mock({
    result: 0,
    data: true,
  }),
  // 视频通话列表
  'POST /api/message/getVedioChatList': Mock.mock({
    result: 0,
    data: true,
  }),
  // 视频通话明细
  'POST /api/message/getVedioChatInfo': Mock.mock({
    result: 0,
    data: true,
  }),
  // 视频通话记录
  'POST /api/message/setVedioChat': Mock.mock({
    result: 0,
    data: true,
  }),
};