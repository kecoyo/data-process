const _ = require('lodash');
const fsExtra = require('./fs-extra');
const Task = require('./task');
const MySQL = require('./mysql');
const config = require('./config');

class MySQLTask extends Task {
  constructor(options) {
    super(options);
    this.mysql = new MySQL(options.mysql);
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

MySQLTask.createTask = options => {
  options = _.defaultsDeep({}, options, {
    mysql: config.get('mysql'),
  });
  new MySQLTask(options).run();
};

module.exports = MySQLTask;
