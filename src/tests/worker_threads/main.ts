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
const results: string[] = [];

const time = Date.now();

const main = async () => {
  array.map(async (item) => {
    const result = (await runWorker('hello worker threads: ' + item)) as string;
    console.log(result);
    results.push(result);
    if (results.length === array.length) {
      console.log('done');
      console.log((Date.now() - time) / 1000);
    }
  });
};

main().catch((err) => console.error(err));
