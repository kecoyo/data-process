const path = require('path');
const util = require('util');
const Task = require('../common/task');
const fs = require('../common/fs-extra');
const { spawn } = require('../common/child_process');

const options = {
  'src-dir': { type: 'string', default: 'D:\\mov' },
  'file-filter': { type: 'string', default: '*.mov' },
  'out-dir': { type: 'string', default: 'D:\\mov\\mp4' },
  'out-extname': { type: 'string', default: '.mp4' },
  'out-suffix': { type: 'string', default: '' },
};
const { values } = util.parseArgs({ options });
console.log('values:', JSON.stringify(values));

/**
 * 批量mov图片转mp4
 */
Task.createTask({
  input: async () => {
    const list = await fs.readdirp(values['src-dir'], { fileFilter: values['file-filter'] });
    return list.map(entry => ({ srcFile: entry.fullPath }));
  },
  // concurrency: 1,
  processRow: async (row, i) => {
    const srcFile = row.srcFile;
    const srcFileName = path.basename(srcFile);
    const srcDir = path.dirname(srcFile);

    // 文件名
    const fileName = srcFileName.replace(path.extname(srcFile), '');

    // 没有指定输出目录，输出到源目录
    const outDir = values['out-dir'] || srcDir;
    // 确保目录存在
    fs.ensureDirSync(outDir);

    const outFileName = fileName + values['out-suffix'] + values['out-extname'];
    const outFile = path.join(outDir, outFileName);

    // 高质量和大小
    await spawn('ffmpeg', ['-y', '-i', srcFile, '-c:v', 'h264', '-b:v', '10.36M', '-c:a', 'aac', '-strict', '-2', '-rtbufsize', '30m', '-max_muxing_queue_size', '1024', outFile]);

    row.outFile = outFile;
  },
});
