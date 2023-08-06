import path from 'path';
import util from 'util';
import Task from '../common/task';
import fs from '../common/fs-extra';
import { spawn } from '../common/child_process';

const options = {
  'src-dir': { type: 'string', default: 'E:\\我的视频' },
  'file-filter': { type: 'string', default: '禹林阳光幼儿园2018元旦.mp4' },
  'out-dir': { type: 'string', default: 'E:\\我的视频' },
  'out-extname': { type: 'string', default: '.mp4' },
  'out-suffix': { type: 'string', default: '-002' },
  'out-option': { type: 'string', default: 'high' },
};
const { values } = util.parseArgs({ options });
console.log('values:', JSON.stringify(values));

const ffmpegParams = {
  best: ['-c:v', 'h264', '-b:v', '10.36M', '-c:a', 'aac', '-strict', '-2', '-rtbufsize', '30m', '-max_muxing_queue_size', '1024'],
  high: ['-c:v', 'h264', '-b:v', '7.88M', '-c:a', 'aac', '-strict', '-2', '-rtbufsize', '30m', '-max_muxing_queue_size', '1024'],
  middle: ['-c:v', 'h264', '-b:v', '10.36M', '-c:a', 'aac', '-strict', '-2', '-rtbufsize', '30m', '-max_muxing_queue_size', '1024'],
  low: ['-c:v', 'h264', '-b:v', '10.36M', '-c:a', 'aac', '-strict', '-2', '-rtbufsize', '30m', '-max_muxing_queue_size', '1024'],
};

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
    await spawn('ffmpeg', ['-y', '-i', srcFile, ...ffmpegParams[values['out-option']], outFile]);

    row.outFile = outFile;
  },
});
