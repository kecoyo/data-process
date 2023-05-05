const path = require('path');
const _ = require('lodash');
const config = require('../../config');

const ljlx = {
  // 根目录
  rootDir: path.resolve('.'), // process.cwd()
  // 日志目录
  logDir: path.resolve('.', 'logs'),
  // 临时目录
  tempDir: path.resolve('.', 'temp'),
  // 当前目录
  curDir: path.resolve(__dirname),

  // 获取配置
  config(name) {
    return _.get(config, name);
  },

  // 获取指定bucket的ossconfig
  getOssConfig(bucket) {
    return { ...this.config('ossclient'), bucket };
  },
};

module.exports = ljlx;
