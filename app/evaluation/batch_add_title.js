const path = require('path');
const axios = require('axios');
const CsvTask = require('../common/csv-task');
const evaluationApi = require('../apis/evaluationApi');

const TYPE_MAP = {
  德育: 1,
  智育: 2,
  体育: 3,
  美育: 4,
  劳育: 5,
  家育: 6,
};

// Cookie
evaluationApi.addHeader(
  'Cookie',
  'sc1=9ABDCAA9B26494640AAC00BDDCEB87CB6FC4A6C4aEt8MgbpCp3IimkDJlxg6VMjbxWwYAX%2ft1yU0NKPu0s0QRXPnTtmNjC%2bqVOQrkrxGOjik4IKmjLJgSNY%2f3FZbO50mLHgjeyC9gYFKlYOzjSDdPYG4XIVSTXynW3rH2ieD8NLho6ztgznz5ZLKw%2fhnNOH5iDpzZujvSCU6%2b1%2b3bWxUP7GSRNfbEoqptbEOedhV%2bCdzbNtkecXLCqa'
);

/**
 * 批量添加新评价类型
 */
CsvTask.createTask({
  input: path.join(__dirname, './batch_add_title.csv'),
  concurrency: 1,
  processRow: async (row, i) => {
    if (row.status === 'success') return;

    try {
      row.typeid = TYPE_MAP[row.typename];
      if (!row.typeid) throw new Error('typeid not found');

      let res = await evaluationApi.addTitle(row);
      if (res.result) throw new Error(res.msg);

      row.status = 'success';
    } catch (err) {
      row.status = err.message;
      throw err;
    }
  },
});
