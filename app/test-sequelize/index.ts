/* eslint-disable quotes */
import sequelize from '../common/sequelize';

async function select() {
  const res = await sequelize.query('select * from t_product');
  console.log(JSON.stringify(res[0]));
  await sequelize.close();
}

async function insert() {
  const res = await sequelize.query(`insert into t_product (name) values ('name-${Date.now()}')`);
  console.log(JSON.stringify(res[0]));
  await sequelize.close();
}

async function update() {
  const res = await sequelize.query(`update t_product set name = 'yangkk' where id = 1`);
  console.log(JSON.stringify(res[0]));
  await sequelize.close();
}

async function deleteFn() {
  const res = await sequelize.query(`delete from t_product where id = 2`);
  console.log(JSON.stringify(res[0]));
  await sequelize.close();
}

select();
// insert();
// update();
// deleteFn();
