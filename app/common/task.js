const fastq = require('fastq');
const _ = require('lodash');
const fsExtra = require('./fs-extra');

class Task {
  constructor(config = {}) {
    this.config = _.defaultsDeep({}, config, {
      options: {},
      concurrency: 10, // 并发数
    });

    if (!this.config.input) throw new Error('missing input');
    if (!this.config.output) {
      this.config.output = this.config.input;
    }
    if (!this.config.processRow) throw new Error('missing processRow(row)');

    this.startTime = 0;
    this.startTime = 0;
    this.success = 0;
    this.fail = 0;
  }

  async run() {
    this.startTime = Date.now();
    await this.readFile();
    await this.beforeProcess();
    this.process().then(async () => {
      await this.afterProcess();
      await this.writeFile();
      this.endTime = Date.now();
      console.log(`成功: ${this.success}, 失败: ${this.fail}, 用时：${(this.endTime - this.startTime) / 1000}s`);
      await this.onCompleted();
    });
  }

  async readFile() {
    throw new Error('no read file.');
  }

  async writeFile() {
    throw new Error('no write file.');
  }

  async beforeProcess() {
    if (this.config.beforeProcess) {
      await this.config.beforeProcess(this.list);
    }
  }

  async afterProcess() {
    if (this.config.afterProcess) {
      await this.config.afterProcess(this.list);
    }
  }

  async process() {
    return new Promise((resolve, reject) => {
      let concurrency = this.list.length < this.config.concurrency ? this.list.length : this.config.concurrency;
      const queue = fastq.promise(this, this.processRow, concurrency);
      for (let i = 0; i < this.list.length; i++) {
        const row = this.list[i];
        queue
          .push({ row, i })
          .then(() => {
            console.log(i, row);
            this.success++;
            if (this.success + this.fail === this.list.length) {
              resolve(this.success + this.fail);
            }
          })
          .catch(err => {
            console.log(i, row);
            if (this.config.showErrorLog) console.log(err);
            this.fail++;
            if (this.success + this.fail === this.list.length) {
              resolve(this.success + this.fail);
            }
          });
      }
    });
  }

  async processRow({ row, i }) {
    if (this.config.processRow) {
      return await this.config.processRow(row, i);
    }
    return true;
  }

  async onCompleted() {
    if (this.config.onCompleted) {
      await this.config.onCompleted(this.list);
    }
  }
}

class CsvTask extends Task {
  async readFile() {
    this.list = await fsExtra.readCsv(this.config.input, this.config.options);
  }

  async writeFile() {
    await fsExtra.writeCsv(this.config.output, this.list, this.config.options);
  }
}

function createCsvTask(config) {
  config = _.defaultsDeep({}, config, {
    options: {
      headers: true,
    },
  });
  new CsvTask(config).run();
}

class ArrayTask extends Task {
  async readFile() {
    this.list = await fsExtra.readArray(this.config.input, this.config.options);
  }

  async writeFile() {
    await fsExtra.writeArray(this.config.output, this.list, this.config.options);
  }
}

function createArrayTask(config) {
  config = _.defaultsDeep({}, config, {});
  new ArrayTask(config).run();
}

module.exports = {
  Task,
  CsvTask,
  createCsvTask,
  ArrayTask,
  createArrayTask,
};
