import { createTask } from '@/common/task';
import _ from 'lodash';
import path from 'path';
import { Worker } from 'worker_threads';

const runWorker = (workerData) => {
  return new Promise((resolve, reject) => {
    // 引入 workerExample.js `工作线程`脚本文件
    const worker = new Worker(path.join(__dirname, 'worker.mjs'), { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`stopped with  ${code} exit code`));
    });
  });
};

const array = _.range(1, 100);

createTask({
  input: async () => {
    return array;
  },
  processRow: async (row) => {
    const result = (await runWorker('hello worker threads: ' + row)) as string;
    console.log(result);
  },
});
