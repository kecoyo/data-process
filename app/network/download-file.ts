import { createCsvTask } from '@/common/csv-task';
import { downloadFile } from '@/common/request';
import fs from 'fs-extra';
import path from 'path';

// 输出目录
const outDir = 'd:\\output\\www.ljlx.com\\';

/**
 * 下载网络资源
 */
createCsvTask({
  input: path.join(__dirname, './download-file.csv'),
  concurrency: 1,
  processRow: async (row, i) => {
    // 源文件名
    let fileName = row.url.substring(row.url.lastIndexOf('/') + 1);
    fileName = fileName.replace(/\?.*/, '');

    // 输出文件
    const outFile = path.join(outDir, fileName);

    row.status = 'ok';

    // 不存在，下载文件
    if (!fs.existsSync(outFile)) {
      try {
        await downloadFile(row.url, outFile);
      } catch (error: any) {
        row.status = error.message;
      }
    }
  },
});
