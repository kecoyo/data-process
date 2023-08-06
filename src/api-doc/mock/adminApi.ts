// 该文件由 API文档 自动生成，请勿手动修改！
import Mock from 'mockjs';

/**
 * 角色和权限
 */
export default {
  // 获取年级管理员信息
  'POST /api/admin/getGradeAdminList': Mock.mock({
    result: 0,
    data: true,
  }),
  // 获取学校管理员信息
  'POST /api/admin/getAdminInfo': Mock.mock({
    result: 0,
    data: true,
  }),
  // 添加管理员
  'POST /api/admin/addAdmin': Mock.mock({
    result: 0,
    data: true,
  }),
  // 取消年级管理员
  'POST /api/admin/cancelAdmin': Mock.mock({
    result: 0,
    data: true,
  }),
  // 获取控制班牌绑定和解绑的权限
  'POST /api/admin/getControlClassCard': Mock.mock({
    result: 0,
    data: true,
  }),
  // 设置控制班牌绑定和解绑的权限
  'POST /api/admin/setControlClassCard': Mock.mock({
    result: 0,
    data: true,
  }),
};