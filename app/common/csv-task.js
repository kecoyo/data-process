const _ = require('lodash');
const fsExtra = require('./fs-extra');
const Task = require('./task');

class CsvTask extends Task {
  async readFile() {
    this.list = await fsExtra.readCsv(this.config.input, this.config.options);
  }

  async writeFile() {
    await fsExtra.writeCsv(this.config.output, this.list, this.config.options);
  }
}

CsvTask.createTask = config => {
  config = _.defaultsDeep({}, config, {
    options: {
      headers: true,
    },
  });
  new CsvTask(config).run();
};

module.exports = CsvTask;
