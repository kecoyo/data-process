const fastq = require('fastq');

const queue = fastq.promise(worker, 10);

async function worker(n) {
  return new Promise((resolve, reject) => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    setTimeout(() => {
      resolve(sum);
    }, 500);
  });
}

async function run() {
  setInterval(() => {
    const idle = queue.idle();
    const length = queue.length();
    console.log('🚀 ~ file: index.js:29 ~ setInterval ~ idle', idle, length);
  }, 1000);

  setInterval(async () => {
    for (let i = 0; i < 100; i++) {
      const num = Math.floor(Math.random() * 100 + 1);
      queue.push(num).then(result => {
        console.log('the result is', result);
      });
    }
  }, 10000);
}

run();
