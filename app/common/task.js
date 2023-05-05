const fastq = require('fastq');
const _ = require('lodash');

class Task {
  constructor(options = {}) {
    this.options = _.defaultsDeep({}, options, {
      concurrency: 10, // 并发数
      showErrorLog: true, // 显示错误日志
    });

    if (!this.options.input) throw new Error('missing input');

    this.startTime = 0; // 开始时间
    this.endTime = 0; // 结束时间
    this.success = 0; // 成功个数
    this.fail = 0; // 失败个数
  }

  /**
   * 开始运行
   */
  async run() {
    this.startTime = Date.now();
    await this.readData();
    await this.beforeProcess();
    await this.process();
    await this.afterProcess();
    await this.writeData();
    this.endTime = Date.now();
    console.log(`成功: ${this.success}, 失败: ${this.fail}, 用时：${(this.endTime - this.startTime) / 1000}s`);
    await this.completed();
  }

  async readData() {
    throw new Error('no read data.');
  }

  async writeData() {
    // throw new Error('no write data.');
  }

  /**
   * 处理整个过程
   * @returns
   */
  async process() {
    if (this.list.length === 0) {
      throw new Error('list length must be greater than 0');
    }
    return new Promise((resolve, reject) => {
      let concurrency = this.list.length < this.options.concurrency ? this.list.length : this.options.concurrency;
      // Creates a new queue.
      this.queue = fastq.promise(this, this.processRow, concurrency);
      for (let i = 0; i < this.list.length; i++) {
        const row = this.list[i];
        // Add a task at the end of the queue.
        this.queue
          .push({ row, i })
          .then(() => {
            console.log(i, row);
            this.success++;
          })
          .catch(err => {
            console.log(i, row);
            this.fail++;
            if (this.options.showErrorLog) console.log(err);
          });
      }
      // Wait for the queue to be drained.
      // The returned Promise will be resolved when all tasks in the queue have been processed by a worker.
      this.queue.drained().then(() => {
        resolve('Done');
      });
    });
  }

  /**
   * 处理每一行，第行是一个任务
   */
  async processRow({ row, i }) {
    if (this.options.processRow) {
      await this.options.processRow(row, i, this);
    }
  }

  /**
   * 处理前
   */
  async beforeProcess() {
    if (this.options.onBeforeProcess) {
      await this.options.onBeforeProcess(this);
    }
  }

  /**
   * 处理后
   */
  async afterProcess() {
    if (this.options.onAfterProcess) {
      await this.options.onAfterProcess(this);
    }
  }

  /**
   * 处理完成
   */
  async completed() {
    if (this.options.onCompleted) {
      await this.options.onCompleted(this);
    }
  }
}

module.exports = Task;
