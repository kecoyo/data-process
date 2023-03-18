const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { createCsvTask } = require('../../common/task');

// const gid = '2657283'; // 常用句子
const gid = '0'; // 默认分组
const bdstoken = '51d3ff398e8a506a5610f52a33011eac';
// eslint-disable-next-line operator-linebreak
const Cookie =
  'BIDUPSID=DCC0460366A6BE1B4E28A80F706F2B4C; PSTM=1677148874; BAIDUID=DCC0460366A6BE1BC4C9308074A0B5E7:FG=1; BDORZ=FFFB88E999055A3F8A630C64834BD6D0; APPGUIDE_10_0_2=1; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; H_PS_PSSID=36560_38112_38352_38368_38399_37862_38170_38289_38376_37929_38315_38383_38284_26350_38420_37881; BAIDUID_BFESS=DCC0460366A6BE1BC4C9308074A0B5E7:FG=1; BDUSS=TdJWTNNcm5BcVVzejhXSkZ0VXNleUd0empVUTZiRHEzMn5NeWZNODN0cHpWRDFrRVFBQUFBJCQAAAAAAAAAAAEAAAAPX4YJa2Vjb3lvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHPHFWRzxxVkN; BDUSS_BFESS=TdJWTNNcm5BcVVzejhXSkZ0VXNleUd0empVUTZiRHEzMn5NeWZNODN0cHpWRDFrRVFBQUFBJCQAAAAAAAAAAAEAAAAPX4YJa2Vjb3lvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHPHFWRzxxVkN; ab_sr=1.0.1_NjhjOTU2ZTA0YmE1YThmNmM5MWE5MzlkYmQ5NzZmZDk1YTEyNTcxNTQxYWJiMWY3N2E4MzY3YWYzZDA3NDU4ODRkNDljZDVkM2JkYTMwMzRkNmUzYjAxYWZiNTEzYWVjYzg5ZDIxMDZiM2Q0OWZkZmMwY2JkOTQ1MTI4ZTY0Y2ZiYzAzYWVlNjYxZTUxNWZmOWIxZGIxMzViOWRmOTU5MTA4MzM2Y2VhOGNkMDM2ODllNWM4Y2FhYmZhZTVmMDdm';

function addCollection(fanyi_src, fanyi_dst, direction = 'en2zh') {
  const data = {
    fanyi_src: fanyi_src,
    direction: direction,
    gid: gid,
    bdstoken: bdstoken,
    fanyi_dst: fanyi_dst,
    dict: '',
    dict_json: '',
  };

  return axios
    .post('https://fanyi.baidu.com/pcnewcollection?req=add', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Cookie: Cookie,
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36',
      },
    })
    .then(res => res.data);
}

/**
 */
createCsvTask({
  input: path.join(__dirname, './add_collection.csv'),
  options: {
    headers: true,
  },
  concurrency: 1,
  processRow: async (row, i) => {
    if (row.errno !== 0) {
      const res = await addCollection(row.en_name, row.zh_name, 'en2zh');
      if (res.errno) {
        row.errno = res.errno;
        row.errmsg = res.errmsg;
        row.id = '';
      } else {
        row.errno = res.errno;
        row.errmsg = '';
        row.id = res.id;
      }
    }
  },
});
