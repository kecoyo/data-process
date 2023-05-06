const _ = require('lodash');
const fsExtra = require('./fs-extra');
const Task = require('./task');

class CsvTask extends Task {
  constructor(options) {
    super(options);
    // 默认写回源文件
    if (!this.options.output) {
      this.options.output = this.options.input;
    }
  }

  async readData() {
    this.list = await fsExtra.readCsv(this.options.input, this.options.options);
  }

  async writeData() {
    await fsExtra.writeCsv(this.options.output, this.list, this.options.options);
  }
}

CsvTask.createTask = options => {
  options = _.defaultsDeep({}, options, {
    options: {
      headers: true,
    },
  });
  new CsvTask(options).run();
};

module.exports = CsvTask;
