import path from 'path';
import util from 'util';
import Task from '../common/task';
import fs from '../common/fs-extra';
import { spawn } from '../common/child_process';
import dayjs from 'dayjs';
import eduyunApi from '../apis/eduyunApi';

const options = {
  'cert-id': { type: 'string', default: '318' },
  'out-dir': { type: 'string', default: 'e:/certImg' },
};
const { values } = util.parseArgs({ options });
console.log('values:', JSON.stringify(values));

/**
 * 下载云平台证书图片
 */
Task.createTask({
  input: async () => {
    const list = await eduyunApi.getUserSysCertList({
      certId: Number(values['cert-id']),
      page_index: 1,
      page_size: 10000,
    });
    return list.map(item => ({ certImg: item.certImg }));
  },
  // concurrency: 1,
  processRow: async (row, i) => {
    const certImg = row.certImg;

    // 文件名
    const fileName = certImg.substring(certImg.lastIndexOf('/') + 1);
    // 输出目录
    const outDir = path.join(values['out-dir'], values['cert-id']);
    // 确保目录存在
    fs.ensureDirSync(outDir);
    // 输出文件
    const outFile = path.join(outDir, fileName);
    // 下载文件
    await fs.downloadFile(certImg, outFile);

    row.success = true;
  },
});
