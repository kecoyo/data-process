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
  setInterval(async () => {
    for (let i = 0; i < 10; i++) {
      const num = Math.floor(Math.random() * 100 + 1);
      queue.push(num).then(result => {
        console.log('the result is', result);
      });
    }
  }, 10000);
}

run();
