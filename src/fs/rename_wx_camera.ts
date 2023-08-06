import path from 'path';
import util from 'util';
import Task from '../common/task';
import fs from '../common/fs-extra';
import { spawn } from '../common/child_process';
import dayjs from 'dayjs';

const options = {
  'src-dir': { type: 'string', default: 'e:\\我的相册\\来自：vivo X9（妈）' },
  'file-filter': { type: 'string', default: 'wx_camera_*.(jpg|mp4)' },
  'out-dir': { type: 'string', default: '' },
};
const { values } = util.parseArgs({ options });
console.log('values:', JSON.stringify(values));

/**
 * 批量heic图片转jpg
 */
Task.createTask({
  input: async () => {
    const list = await fs.readdirp(values['src-dir'], { fileFilter: values['file-filter'] });
    return list.map(entry => ({ srcFile: entry.fullPath }));
  },
  concurrency: 1,
  processRow: async (row, i) => {
    const srcFile = row.srcFile;
    const srcFileName = path.basename(srcFile);
    const srcDir = path.dirname(srcFile);
    const srcExtName = path.extname(srcFile);
    const srcName = srcFileName.replace(path.extname(srcFile), '');

    // 没有指定输出目录，输出到源目录
    const outDir = values['out-dir'] || srcDir;
    // 确保目录存在
    fs.ensureDirSync(outDir);

    const dateFmt = dayjs(Number(srcName.replace('wx_camera_', ''))).format('YYYYMMDD_HHmmss');

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
