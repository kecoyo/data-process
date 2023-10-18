import { getUserSysCertList } from '@/apis/eduyunApi';
import { downloadFile } from '@/common/request';
import { createTask } from '@/common/task';
import fs from 'fs-extra';
import path from 'path';

const certId = 258; // 证书ID
const outDir = 'D:\\output\\certImgs'; // 输出目录

/**
 * 下载云平台证书图片
 */
createTask({
  input: async () => {
    const list = await getUserSysCertList({
      certId: certId,
      page_index: 1,
      page_size: 10000,
    });
    return list;
  },
  // concurrency: 1,
  processRow: async (row, i) => {
    const certImg = row.certImg;

    // 文件名
    const fileName = certImg.substring(certImg.lastIndexOf('/') + 1);

    // 确保目录存在
    fs.ensureDirSync(outDir);

    // 文件输出路径
    const outFile = path.join(outDir, fileName);
    // 下载文件
    await downloadFile(certImg, outFile);
  },
});
