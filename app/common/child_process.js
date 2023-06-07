const util = require('util');
const child_process = require('child_process');
const iconvLite = require('iconv-lite');

// exec() 内部调用 execFile() 来实现，而 execFile() 内部调用 spawn() 来实现。

let encoding = 'cp936';
let binaryEncoding = 'binary';

iconvLite.skipDecodeWarning = true;

function spawn(cmd, args, options) {
  return new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';

    const child = child_process.spawn(cmd, args, {
      encoding: binaryEncoding,
      windowsHide: true, // 默认设置为隐藏子窗口
      ...options,
    });

    child.stdout.on('data', data => {
      const chunk = iconvLite.decode(data, encoding);
      console.log(chunk);
      stdout += chunk;
    });

    child.stderr.on('data', data => {
      const chunk = iconvLite.decode(data, encoding);
      console.log(chunk);
      stderr += chunk;
    });

    // child.stdout.on('end', function () {
    //   console.log('Finished collecting data chunks.');
    // });

    // child.stderr.on('end', function () {
    //   console.log('Finished collecting data chunks.');
    // });

    child.on('error', function (err) {
      reject(err);
    });

    child.on('close', code => {
      resolve({
        status: code,
        stdout,
        stderr,
        pid: child.pid,
        signal: null,
      });
    });

    // child.on('exit', code => {
    //   console.log(`child process exited with code ${code}`);
    // });
  });
}

function spawnSync(cmd, args, options) {
  let res = child_process.spawnSync(cmd, args, {
    encoding: binaryEncoding,
    windowsHide: true,
    ...options,
  });
  // res.output[1] = iconvLite.decode(res.output[1], encoding);
  // res.output[2] = iconvLite.decode(res.output[2], encoding);
  res.stdout = iconvLite.decode(res.stdout, encoding);
  res.stderr = iconvLite.decode(res.stderr, encoding);
  return res;
}

// 创建一个shell，然后在shell里执行命令。执行完成后，将stdout、stderr作为参数传入回调方法。
function execFile(file, args, options) {
  return util
    .promisify(child_process.execFile)(file, args, {
      encoding: binaryEncoding,
      windowsHide: true, // 默认设置为隐藏子窗口
      ...options,
    })
    .then(res => {
      let stdout = iconvLite.decode(res.stdout, encoding);
      // res.stderr = iconvLite.decode(res.stderr, encoding);
      return stdout;
    });
}

function execFileSync(file, args, options) {
  let stdout = child_process.execFileSync(file, args, {
    encoding: binaryEncoding,
    windowsHide: true,
    ...options,
  });
  stdout = iconvLite.decode(stdout, encoding);
  return stdout;
}

// 创建一个shell，然后在shell里执行命令。执行完成后，将stdout、stderr作为参数传入回调方法。
function exec(cmd, options) {
  return util
    .promisify(child_process.exec)(cmd, {
      encoding: binaryEncoding,
      windowsHide: true, // 默认设置为隐藏子窗口
      ...options,
    })
    .then(res => {
      let stdout = iconvLite.decode(res.stdout, encoding);
      // res.stderr = iconvLite.decode(res.stderr, encoding);
      return stdout;
    });
}

function execSync(cmd, options) {
  let stdout = child_process.execSync(cmd, {
    encoding: binaryEncoding,
    windowsHide: true,
    ...options,
  });
  stdout = iconvLite.decode(stdout, encoding);
  return stdout;
}

module.exports = {
  spawn,
  spawnSync,
  execFile,
  execFileSync,
  exec,
  execSync,
};

// spawn('cmd.exe', ['/?']);
// spawn('cmd.exe', ['/c', 'dir']);
// spawn('cmd.exe', ['/c', 'git status']);
// spawn('ipconfig').then(res => {
//   console.log('🚀 ~ file: child_process.js:126 ~ spawn ~ res:', res);
// });
// console.log(spawnSync('ipconfig'));
// spawn('ffmpeg', [
//   '-i',
//   'https://videobjcdn.lejiaolexue.com/ljmts/c7182b58568fcce721c875f7fef61f027d7ecf28.m3u8',
//   '-vcodec',
//   'copy333',
//   '-acodec',
//   'copy',
//   '-y',
//   './c7182b58568fcce721c875f7fef61f027d7ecf28.mp4',
// ]).then(res => {
//   console.log('🚀 ~ file: child_process.js:123 ~ res:', res);
// });
// console.log(
//   spawnSync('ffmpeg', [
//     '-i',
//     'https://videobjcdn.lejiaolexue.com/ljmts/c7182b58568fcce721c875f7fef61f027d7ecf28.m3u8',
//     '-vcodec',
//     'copy111',
//     '-acodec',
//     'copy',
//     '-y',
//     './c7182b58568fcce721c875f7fef61f027d7ecf28.mp4',
//   ])
// );

// execFile('ipconfig').then(res => {
//   console.log(res);
// });
// execFile('node', ['--version']).then(res => {
//   console.log(res);
// });
// console.log(execFileSync('ipconfig'));
// console.log(execFileSync('node', ['--version']));
// console.log(execFileSync('python', ['d:\\bin\\test.py']));

// exec('ipconfig').then(res => {
//   console.log(res);
// });
// exec('npm -v -e').then(res => {
//   console.log(res);
// });
// console.log(execSync('ipconfig'));
// console.log(execSync('npm -v -e'));
