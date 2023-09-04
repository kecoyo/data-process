import OssClient from '@/common/oss-client';
import { createTask } from '@/common/task';
import axios from 'axios';
import config from 'config';

const APP_ID = 1222;

const ossClient = new OssClient({ ...config.get('ossclient'), bucket: 'lx-file' });

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
    return res.data.data.map((item) => ({
      fileName: item.FileName,
    }));
  },
  concurrency: 1,
  processRow: async (row, i) => {
    // app/1222/5f98184ee814b8c6db319a2f8e2a97cb86f3a948.dat
    const status = await ossClient.deleteOssFile(`app/${APP_ID}/${row.fileName}`);
    row.status = status;
  },
});
