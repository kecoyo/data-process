import { readdirp } from '@/common/fs-extra';
import { createTask } from '@/common/task';
import dayjs from 'dayjs';
import fs from 'fs-extra';
import path from 'path';

const srcDir = 'e:\\我的相册\\来自：vivo X9（妈）';
const fileFilter = 'mmexport*.(jpg|mp4)';

/**
 * 批量heic图片转jpg
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

    // 没有指定输出目录，输出到源目录
    const outDir = srcDir;
    // 确保目录存在
    fs.ensureDirSync(outDir);

    const dateFmt = dayjs(Number(srcName.replace('mmexport', ''))).format('YYYYMMDD_HHmmss');

    const outExtName = srcExtName.toLowerCase();
    const outPrefix = outExtName === '.jpg' ? 'IMG_' : outExtName === '.mp4' ? 'video_' : '';
    const outName = outPrefix + dateFmt;
    const outFileName = outName + outExtName;
    const outFile = path.join(outDir, outFileName);

    // 重命名
    fs.renameSync(srcFile, outFile);

    row.outFile = outFile;
  },
});
