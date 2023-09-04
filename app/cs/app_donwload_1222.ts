import { downloadFile } from '@/common/request';
import { createTask } from '@/common/task';
import axios from 'axios';
import path from 'path';

const APP_ID = 1222;

/**
 * 检查云平台组件资源丢失
 */
createTask({
  input: async () => {
    const res = await axios.get('https://cs.ljlx.com/api/Application/GetPublishAction?appid=' + APP_ID, {
      headers: {
        Authorization: 'f4406f671808c6ef7b9edf103d5ac361b1c8fbe0010af7ed7d5d3be15d22a437',
      },
    });
    return res.data.data;
  },
  concurrency: 1,
  processRow: async (row, i) => {
    const status = await downloadFile(`http://filecdn.lejiaolexue.com/app/${APP_ID}/${row.FileName}`, path.join('F:\\', `app/${APP_ID}/${row.FileName}`));
    row.status = status;
  },
});
