import { readdirp } from '@/common/fs-extra';
import { createTask } from '@/common/task';
import fs from 'fs-extra';
import path from 'path';

const srcDir = 'D:\\ljshell\\banpai\\hardwareMini\\src';

/**
 * 文件批量重命名
 */
createTask({
  input: async () => {
    const list = await readdirp(srcDir, { fileFilter: '*.less' });
    return list.map((item) => ({
      fullPath: item.fullPath,
    }));
  },
  concurrency: 1,
  processRow: async (row, i) => {
    const srcFile = row.fullPath;
    const srcFileName = path.basename(srcFile);
    const srcDir = path.dirname(srcFile);
    const srcExtName = path.extname(srcFile);
    const srcName = srcFileName.replace(srcExtName, '');

    const destFile = path.join(srcDir, srcName + '.scss');

    // 重命名
    fs.renameSync(srcFile, destFile);
  },
});
