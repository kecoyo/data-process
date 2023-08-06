import hamsters from 'hamsters.js';
const { Worker, parentPort } = require('worker_threads');

hamsters.init({
  debug: true, //Boolean defaults to false
  Worker: Worker,
  parentPort: parentPort,
});

console.log('🚀 ~ file: test-hamsters.ts:2 ~ hamsters:', hamsters);

var params = {
  array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  threads: 10,
};

let n = 1;

hamsters.run(
  params,
  (rtn: any) => {
    var arr = params.array;
    arr.forEach(function (item) {
      console.log('🚀 ~ file: test-hamsters.ts:24 ~ item:', item);
      rtn.data.push((item * 120) / 10);
    });
  },
  (results: any) => {
    console.log('🚀 ~ file: test-hamsters.ts:30 ~ results:', results);
  },
);
