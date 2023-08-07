/* eslint-disable quotes */
import mysql from '../common/mysql';

async function select() {
  const res = await mysql.query('select * from t_product');
  console.log(JSON.stringify(res));
  await mysql.end();
}

async function insert() {
  const res = await mysql.query(`insert into t_product (name) values ('name-${Date.now()}')`);
  console.log(JSON.stringify(res));
  await mysql.end();
}

async function update() {
  const res = await mysql.query(`update t_product set name = 'yangkk' where id = 1`);
  console.log(JSON.stringify(res));
  await mysql.end();
}

async function deleteFn() {
  const res = await mysql.query(`delete from t_product where id = 2`);
  console.log(JSON.stringify(res));
  await mysql.end();
}

// select();
// insert();
// update();
// deleteFn();
