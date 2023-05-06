const path = require('path');

// 根目录
console.log('rootDir:', process.cwd());
console.log('rootDir:', path.resolve('.'));
// 当前目录
console.log('curDir:', path.resolve(__dirname));
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);

// 参数
console.log('argv:', process.argv);
console.log('args:', process.argv.slice(2));
