const _ = require('lodash');
const fsExtra = require('./fs-extra');
const Task = require('./task');
const mysql = require('./mysql');

class MysqlTask extends Task {
  async readFile() {
    if (typeof this.config.input !== 'function') {
      throw new Error('config.input is not a fucntion.');
    }
    this.list = await this.config.input(mysql);
  }

  async writeFile() {
    if (typeof this.config.output !== 'function') {
      throw new Error('config.output is not a fucntion.');
    }
    // await fsExtra.writeArray(this.config.output, this.list, this.config.options);
  }

  async onCompleted() {
    await mysql.end();
  }
}

MysqlTask.createTask = config => {
  config = _.defaultsDeep({}, config, {});
  new MysqlTask(config).run();
};

module.exports = MysqlTask;
