/* eslint-disable no-loop-func */
/* eslint-disable no-empty-function */
const fsExtra = require('./fs-extra');
const fastq = require('fastq');

class Task {
  constructor(options = {}) {
    this.options = options;

    if (!this.options.input) throw new Error('missing input');
    if (!this.options.output) throw new Error('missing output');
    if (!this.options.processRow) throw new Error('missing processRow(row)');

    // 并发数
    this.concurrency = this.options.concurrency || 10;

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
    });
  }

  async readFile() {
    throw new Error('no read file.');
  }

  async writeFile() {
    throw new Error('no write file.');
  }

  async beforeProcess() {
    if (this.options.beforeProcess) {
      await this.options.beforeProcess(this.list);
    }
  }

  async afterProcess() {
    if (this.options.afterProcess) {
      await this.options.afterProcess(this.list);
    }
  }

  async process() {
    return new Promise((resolve, reject) => {
      let concurrency = this.list.length < this.concurrency ? this.list.length : this.concurrency;
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
          .catch((err) => {
            console.log(i, row);
            if (this.options.showErrorLog) console.log(err);
            this.fail++;
            if (this.success + this.fail === this.list.length) {
              resolve(this.success + this.fail);
            }
          });
      }
    });
  }

  async processRow({ row, i }) {
    if (this.options.processRow) {
      return await this.options.processRow(row, i);
    }
    return true;
  }
}

class CsvTask extends Task {
  async readFile() {
    this.list = await fsExtra.readCsv(this.options.input, this.options.options);
  }

  async writeFile() {
    await fsExtra.writeCsv(this.options.output, this.list, this.options.options);
  }
}

function createCsvTask(options) {
  new CsvTask(options).run();
}

class ArrayTask extends Task {
  async readFile() {
    this.list = await fsExtra.readArray(this.options.input, this.options.options);
  }

  async writeFile() {
    await fsExtra.writeArray(this.options.output, this.list, this.options.options);
  }
}

function createArrayTask(options) {
  new ArrayTask(options).run();
}

module.exports = {
  Task,
  CsvTask,
  createCsvTask,
  ArrayTask,
  createArrayTask,
};
