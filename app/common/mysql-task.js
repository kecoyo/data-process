const _ = require('lodash');
const fsExtra = require('./fs-extra');
const Task = require('./task');
const MysqlClient = require('./mysql-client');
const config = require('./config');

class MysqlTask extends Task {
  constructor(options) {
    super(options);
    this.mysql = new MysqlClient(options.options);
  }

  async readData() {
    if (typeof this.options.input === 'string') {
      this.list = await this.mysql.query(this.options.input); // sql
    } else if (typeof this.options.input === 'function') {
      this.list = await this.options.input(this.mysql); // function
    } else {
      throw new Error('options.input must be a function or string.');
    }
  }

  async completed() {
    await super.completed();
    await this.mysql.end();
  }
}

MysqlTask.createTask = options => {
  options = _.defaultsDeep({}, options, {
    options: config.get('mysql'), // 数据库连接配置
  });
  new MysqlTask(options).run();
};

module.exports = MysqlTask;
