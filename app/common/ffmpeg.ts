import { spawn } from 'child_process';
import path from 'path';
import fs from './fs-extra';

function m3u8ToMp4(src, dest) {
  return new Promise((resolve, reject) => {
    // 确保目录存在
    fs.ensureDirSync(path.dirname(dest));

    // ffmpeg -i "https://videobjcdn.lejiaolexue.com/ljmts/c7182b58568fcce721c875f7fef61f027d7ecf28.m3u8" -vcodec copy -acodec copy c7182b58568fcce721c875f7fef61f027d7ecf28.mp4
    const ffmpeg = spawn('ffmpeg', ['-i', src, '-vcodec', 'copy', '-acodec', 'copy', '-y', dest], {
      windowsHide: false,
    });
    ffmpeg.stderr.on('data', function (data) {
      console.log(data.toString());
    });
    ffmpeg.stderr.on('end', function () {
      console.log('file has been converted succesfully');
      resolve();
    });
  });
}

export default {
  m3u8ToMp4,
};
