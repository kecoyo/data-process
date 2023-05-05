const _ = require('lodash');
const fsExtra = require('./fs-extra');
const Task = require('./task');

class ArrayTask extends Task {
  async readFile() {
    this.list = await fsExtra.readArray(this.config.input, this.config.options);
  }

  async writeFile() {
    await fsExtra.writeArray(this.config.output, this.list, this.config.options);
  }
}

ArrayTask.createTask = config => {
  config = _.defaultsDeep({}, config, {});
  new ArrayTask(config).run();
};

module.exports = ArrayTask;
