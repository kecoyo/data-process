import { createCsvTask } from '@/common/csv-task';
import { downloadFile } from '@/common/request';
import config from 'config';
import fs from 'fs-extra';
import path from 'path';

// 输出目录
const outDir = 'd:\\output\\activity_files\\';
// 确保目录存在
fs.ensureDirSync(outDir);

/**
 * 下载活动资源
 */
createCsvTask({
  input: path.join(__dirname, './download-activity-file.csv'),
  // concurrency: 1,
  processRow: async (row, i) => {
    const url = row.url;
    // 源文件名
    const fileName = url.substring(url.lastIndexOf('/') + 1);

    // 输出文件
    const outFile = path.join(outDir, fileName);
    // 下载文件
    await downloadFile(config.get('dmresBaseUrl') + url, outFile);
  },
});
