import child_process from 'child_process';
import iconvLite from 'iconv-lite';
import util from 'util';

// exec() 内部调用 execFile() 来实现，而 execFile() 内部调用 spawn() 来实现。

let encoding = 'cp936';
let binaryEncoding = 'binary';

function spawn1(cmd: string, args: any) {
  const child = child_process.spawn(cmd, args);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${iconvLite.decode(data, encoding)}`);
  });

  child.stderr.on('data', (data) => {
    console.log(`stderr: ${iconvLite.decode(data, encoding)}`);
  });

  child.on('exit', (code) => {
    console.log(`exit: ${code}`);
  });
}

// 创建一个shell，然后在shell里执行命令。执行完成后，将stdout、stderr作为参数传入回调方法。
function exec(cmd: string, options: any) {
  return util
    .promisify(child_process.exec)(cmd, {
      encoding: binaryEncoding,
      windowsHide: true, // 默认设置为隐藏子窗口
      ...options,
    })
    .then((res) => {
      let stdout = iconvLite.decode(res.stdout, encoding);
      // res.stderr = iconvLite.decode(res.stderr, encoding);
      return stdout;
    });
}

function execSync(cmd: string, options: any) {
  let stdout = child_process.execSync(cmd, {
    encoding: binaryEncoding,
    windowsHide: true,
    ...options,
  });
  stdout = iconvLite.decode(Buffer.from(stdout), encoding);
  return stdout;
}

// spawn1('cmd.exe', ['/?']);
// spawn1('cmd.exe', ['/c', 'dir']);
// spawn1('cmd.exe', ['/c', 'git status']);
// spawn1('ipconfig');

// exec('ipconfig').then(res => {
//   console.log(res);
// });
// exec('npm -v -e').then(res => {
//   console.log(res);
// });

// console.log(execSync('ipconfig'));
// console.log(execSync('npm -v -e'));
