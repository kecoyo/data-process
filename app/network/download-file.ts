import { createCsvTask } from '@/common/csv-task';
import fs from 'fs-extra';
import path from 'path';
import { downloadFile } from '../common/request';

// 输出目录
const outDir = 'd:\\output\\test\\';
// 确保目录存在
fs.ensureDirSync(outDir);

/**
 * 下载网络资源
 */
createCsvTask({
  input: path.join(__dirname, './download-file.csv'),
  // concurrency: 1,
  processRow: async (row, i) => {
    const url = row.url;
    // 源文件名
    const fileName = url.substring(url.lastIndexOf('/') + 1);

    // 输出文件
    const outFile = path.join(outDir, fileName);
    // 下载文件
    await downloadFile(url, outFile);

    row.success = true;
  },
});
