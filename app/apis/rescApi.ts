import axios from 'axios';
import _ from 'lodash';

/**
 * 根据video_id获取m3u8地址
 * @param {*} video_id
 * @returns
 */
export async function videoCheck(video_id) {
  return await axios.get('https://resc.app.ljlx.com/rest/video/check.ashx?video_id=' + video_id).then((res) => {
    return _.get(res, 'data.data[0]');
  });
}

/**
 * 根据res_id获取文档img地址
 * @param {*} res_id
 * @returns
 */
export async function resourceLoad(res_id) {
  return await axios.get('https://resc.app.ljlx.com/rest/resource/load.ashx?res_id=' + res_id).then((res) => {
    return _.get(res, 'data.data[0]');
  });
}
