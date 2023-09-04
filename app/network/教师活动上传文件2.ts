import fs from 'fs-extra';
import path from 'path';
import { createCsvTask } from '../common/csv-task';

// 输出目录
const outDir = 'd:\\output\\activity_files\\';
// 确保目录存在
fs.ensureDirSync(outDir);

/**
 * 下载活动资源
 */
createCsvTask({
  input: path.join(__dirname, './教师活动上传文件2.csv'),
  concurrency: 1,
  processRow: async (row, i) => {
    const url = row.url;

    // 源文件名
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    // 输出文件
    const outFile = path.join(outDir, fileName);

    if (fs.existsSync(outFile)) {
      // console.log(outFile);
      // throw new Error(outFile);
      // 重命名
      const newFile = path.join(outDir, `${row.uname}-${row.showName}`);
      fs.renameSync(outFile, newFile);
    }
  },
});
