const _ = require('lodash');
const fsExtra = require('./fs-extra');
const Task = require('./task');
const mysql = require('./mysql');

class MysqlTask extends Task {
  constructor(options) {
    super(options);
    this.mysql = mysql;
  }

  async readData() {
    if (typeof this.options.input === 'string') {
      this.list = await mysql.query(this.options.input); // sql
    } else if (typeof this.options.input === 'function') {
      this.list = await this.options.input(mysql); // function
    } else {
      throw new Error('options.input must be a function or string.');
    }
  }

  async completed() {
    if (this.options.onCompleted) {
      await this.options.onCompleted(this.list);
    }
    await mysql.end();
  }
}

MysqlTask.createTask = options => {
  options = _.defaultsDeep({}, options, {});
  new MysqlTask(options).run();
};

module.exports = MysqlTask;
