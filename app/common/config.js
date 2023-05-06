const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('config');

// 根目录
config.rootDir = path.resolve('.'); // process.cwd()
// 当前目录
config.curDir = path.resolve(__dirname);
// 日志目录
config.logDir = path.resolve('.', 'logs');
// 临时目录
config.tempDir = path.resolve('.', 'temp');

module.exports = config;
