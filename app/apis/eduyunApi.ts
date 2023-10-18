import axios from 'axios';
import _ from 'lodash';

// const DOMAIN = 'https://nanchongeduyun.ljlx.com/webapi';
const DOMAIN = 'https://huaibeieduyun.ljlx.com/webapi';

/**
 * 获取云平台用户证书列表
 * @param {number} certId 证书id
 * @returns
 */
export async function getUserSysCertList(data) {
  data = _.defaultsDeep({}, data, {
    certId: 0,
    state: 1, // 0，未发送，1：已发送，2：已撤销，3：已删除
    page_index: 1,
    page_size: 10,
    userKey: '',
  });
  return await axios.post(DOMAIN + '/cert/UserSysCertList', data).then((res) => {
    return _.get(res, 'data.data.list', []);
  });
}

// 批量获取学校信息
export async function getSchoolInfos(ids: number[]): Promise<any[]> {
  const data = { ids: ids };
  return await axios.post(DOMAIN + '/school/batchGetSchInfos', data).then((res) => {
    return _.get(res, 'data.data', []);
  });
}

// 获取学校信息
export async function getSchoolInfo(id: number): Promise<any> {
  const schoolInfos = await getSchoolInfos([id]);
  return _.get(schoolInfos, '[0]', null);
}

// 获取学校信息，加缓存
export const getSchoolInfoCache = _.memoize(getSchoolInfo);

// 批量获取区域信息
export async function getAreaInfos(ids: number[]): Promise<any[]> {
  const data = { ids: ids };
  return await axios.post(DOMAIN + '/area/BatchGetAreas', data).then((res) => {
    return _.get(res, 'data.data', []);
  });
}

// 获取区域信息
export async function getAreaInfo(id: number): Promise<any> {
  const areaInfos = await getAreaInfos([id]);
  return _.get(areaInfos, '[0]', null);
}

// 获取区域信息，加缓存
export const getAreaInfoCache = _.memoize(getAreaInfo);
