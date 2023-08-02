import path from 'path';

// 根目录
console.log('rootDir:', process.cwd());
console.log('rootDir:', path.resolve('.'));
// 当前目录
console.log('curDir:', path.resolve(__dirname));
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);

// 根目录
let rootDir = path.resolve('.'); // process.cwd()
console.log('rootDir:', rootDir);
// 当前目录
let curDir = path.resolve(__dirname);
console.log('curDir:', curDir);
// 日志目录
let logDir = path.resolve('.', 'logs');
console.log('logDir:', logDir);
// 临时目录
let tempDir = path.resolve('.', 'temp');
console.log('tempDir:', tempDir);

// 参数
console.log('argv:', process.argv);
console.log('args:', process.argv.slice(2));
