const mysql = require('mysql2');
const config = require('../../config.json');

const pool = mysql.createPool(config.mysql);

const promisePool = pool.promise();

module.exports = promisePool;
