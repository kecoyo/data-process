import _ from 'lodash';
import fsExtra from './fs-extra';
import Task from './task';

class ArrayTask extends Task {
  constructor(options) {
    super(options);
    // 默认写回源文件
    if (!this.options.output) {
      this.options.output = this.options.input;
    }
  }

  async readData() {
    this.list = await fsExtra.readArray(this.options.input, this.options.options);
  }

  async writeData() {
    await fsExtra.writeArray(this.options.output, this.list, this.options.options);
  }
}

ArrayTask.createTask = options => {
  options = _.defaultsDeep({}, options, {});
  new ArrayTask(options).run();
};

export default ArrayTask;
