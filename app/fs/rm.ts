import { readdirp } from '@/common/fs-extra';
import { createTask } from '@/common/task';
import fs from 'fs-extra';
import path from 'path';

const srcDir = 'e:\\我的相册\\来自：vivo X9（妈）';
const fileFilter = '*\\(1\\).(jpg|mp4)';

/**
 * 删除文件和目录
 */
createTask({
  input: async () => {
    const list = await readdirp(srcDir, { fileFilter: fileFilter });
    return list.map((entry) => ({ srcFile: entry.fullPath }));
  },
  concurrency: 1,
  processRow: async (row, i) => {
    const srcFile = row.srcFile;
    const srcFileName = path.basename(srcFile);
    const srcDir = path.dirname(srcFile);
    const srcExtName = path.extname(srcFile);
    const srcName = srcFileName.replace(path.extname(srcFile), '');

    // 删除文件和目录
    fs.rmSync(srcFile);

    row.success = true;
  },
});
