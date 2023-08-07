const { Pool } = require('multiprocess-pool');

const pool = new Pool(4);
pool.map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], `${__dirname}/worker`).then(function (res) {
  console.log(res); // [1, 4, 9, 16]
});
pool.close();
