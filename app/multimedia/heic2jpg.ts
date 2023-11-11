import { createTask } from '@/common/task';
import path from 'path';
import util from 'util';
import { spawn } from '../common/child_process';
import fs from '../common/fs-extra';

const options = {
  'src-dir': { type: 'string', default: 'D:\\heic' },
  'file-filter': { type: 'string', default: '*.heic' },
  'out-dir': { type: 'string', default: 'D:\\heic\\jpg' },
  'out-extname': { type: 'string', default: '.jpg' },
  'out-suffix': { type: 'string', default: '' },
  'out-quality': { type: 'string', default: '85' },
};
const { values } = util.parseArgs({ options });
console.log('values:', JSON.stringify(values));

/**
 * 批量heic图片转jpg
 */
createTask({
  input: async () => {
    const list = await fs.readdirp(values['src-dir'], { fileFilter: values['file-filter'] });
    return list.map((entry) => ({ srcFile: entry.fullPath }));
  },
  // concurrency: 1,
  processRow: async (row, i) => {
    const srcFile = row.srcFile;
    const srcFileName = path.basename(srcFile);
    const srcDir = path.dirname(srcFile);

    // 文件名
    const fileName = srcFileName.replace(path.extname(srcFile), '');

    // 没有指定输出目录，输出到源目录
    const outDir = srcDir;

    // 确保目录存在
    fs.ensureDirSync(outDir);

    const outFileName = fileName + values['out-suffix'] + values['out-extname'];
    const outFile = path.join(outDir, outFileName);

    await spawn('magick', [srcFile, '-quality', values['out-quality'], outFile]);

    row.outFile = outFile;
  },
});
