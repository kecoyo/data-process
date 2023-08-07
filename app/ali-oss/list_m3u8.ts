import path from 'path';
import _ from 'lodash';
import CsvTask from '../common/csv-task';
import OssClient from '../common/oss-client';
import fsExtra from '../common/fs-extra';
import config from '../common/config';

const ossClient = new OssClient({ ...config.ossclient, bucket: 'file-video' });

let array = [];

/**
 *  列出指定前缀的文件列表
 */
CsvTask.createTask({
  input: path.join(__dirname, './list_m3u8-input.csv'),
  options: {
    headers: true,
  },
  processRow: async row => {
    let prefix = row.m3u8_url.split('.')[0];

    let list = await ossClient.listOssFile({ prefix: prefix, 'max-keys': 1000 });
    let count = 0;

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      array.push({ oss_file: item });
      count++;
    }

    // 序号转number排序
    array = _.sortBy(array, item => {
      return parseInt(item.oss_file.replace(prefix, '').replace(/\.(ts|m3u8)/, '') || 0);
    });

    row.count = count;
  },
  onCompleted: async () => {
    await fsExtra.writeCsv(path.join(__dirname, './list_m3u8-output.csv'), array, { headers: true });
  },
});
