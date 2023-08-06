import fastq from 'fastq';
import _ from 'lodash';

interface ProcessResult {
  success: number;
  fail: number;
}

/**
 * 定义配置
 */
export interface TaskOptions<T = any> {
  input: string | ((task: Task<T>) => Promise<T[]>);
  concurrency?: number; // 并发数
  showErrorLog?: boolean; // 显示错误日志
  onBeforeProcess?: (task: Task<T>) => Promise<void>;
  processRow: (row: T, task: Task<T>) => Promise<void>;
  onAfterProcess?: (task: Task<T>) => Promise<void>;
  onCompleted?: (task: Task<T>) => Promise<void>;
}

/**
 * 默认配置
 */
const defaultOptions = {
  concurrency: 10, // 并发数
  showErrorLog: true, // 显示错误日志
};

export default class Task<T = any> {
  /**
   * 选项配置
   */
  options: TaskOptions<T>;

  /**
   * 选项配置
   */
  list: T[] = [];

  constructor(options: TaskOptions<T>) {
    this.options = _.defaultsDeep({}, options, defaultOptions);
  }

  /**
   * 开始运行
   */
  async run() {
    let startTime = Date.now(); // 开始时间
    await this.readData();
    await this.beforeProcess();
    let { success, fail } = await this.process(); // 处理，返回成功和失败个数
    await this.afterProcess();
    await this.writeData();
    let endTime = Date.now(); // 结束时间
    console.log(`成功: ${success}, 失败: ${fail}, 用时：${(endTime - startTime) / 1000}s`);
    await this.completed();
  }

  async readData() {
    // throw new Error('no read data.');
    if (typeof this.options.input === 'function') {
      this.list = await this.options.input(this); // function
    } else {
      throw new Error('options.input must be a function.');
    }
  }

  async writeData() {
    // throw new Error('no write data.');
  }

  /**
   * 处理整个过程
   * @returns
   */
  async process(): Promise<ProcessResult> {
    return new Promise((resolve) => {
      let success = 0; // 成功个数
      let fail = 0; // 失败个数

      if (this.list.length === 0) {
        resolve({ success, fail });
        return;
      }
      let concurrency = this.list.length < this.options.concurrency! ? this.list.length : this.options.concurrency;
      // Creates a new queue.
      let queue: fastq.queueAsPromised = fastq.promise(this, this.processRow, concurrency!);
      for (let i = 0; i < this.list.length; i++) {
        const row = this.list[i];
        // Add a task at the end of the queue.
        queue
          .push(row)
          .then(() => {
            console.log(i, row);
            success++;
          })
          .catch((err: any) => {
            console.log(i, row);
            fail++;
            if (this.options.showErrorLog) console.log(err);
          });
      }
      // Wait for the queue to be drained.
      // The returned Promise will be resolved when all tasks in the queue have been processed by a worker.
      queue.drained().then(() => {
        resolve({ success, fail });
      });
    });
  }

  /**
   * 处理每一行，第行是一个任务
   */
  async processRow(row: T): Promise<void> {
    if (this.options.processRow) {
      await this.options.processRow(row, this);
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

export function createTask<T = any>(options: TaskOptions<T>) {
  new Task<T>(options).run();
}
