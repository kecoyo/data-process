/* eslint-disable quotes */
const { Op } = require('sequelize');
const sequelize = require('../../../common/sequelize');
const { Product } = require('./define-models');

// Find all products
async function findAll() {
  const products = await Product.findAll();
  console.log(products.every(product => product instanceof Product)); // true
  console.log('All products:', JSON.stringify(products, null, 2));
}

async function createProduct() {
  const jane = await Product.create({ name: 'Jane' });
  // Jane 现在存在于数据库中！
  console.log(jane instanceof Product); // true
  console.log(jane.name); // "Jane"
}

async function createProduct2() {
  const jane = await Product.create({ name: 'Jane' });
  console.log(jane.name); // "Jane"
  jane.name = 'Ada';
  // the name is still "Jane" in the database
  await jane.save();
  // Now the name was updated to "Ada" in the database!
}

async function createProduct3() {
  const jane = await Product.create({ name: 'Jane' });
  // console.log(jane); // 不要这样!
  console.log(jane.toJSON()); // 这样最好!
  console.log(JSON.stringify(jane, null, 4)); // 这样也不错!
}

async function destroyProduct() {
  const jane = await Product.create({ name: 'Jane' });
  console.log(jane.name); // "Jane"
  await jane.destroy();
  // 现在该条目已从数据库中删除
}

// 重载实例
async function reloadProduct() {
  const jane = await Product.create({ name: 'Jane' });
  console.log(jane.name); // "Jane"
  jane.name = 'Ada';
  // 数据库中的名称依然是 "Jane"
  await jane.reload();
  console.log(jane.name); // "Jane"
}

// 仅保存部分字段
async function saveFields() {
  const jane = await Product.create({ name: 'Jane' });
  console.log(jane.name); // "Jane"
  console.log(jane.favoriteColor); // "green"
  jane.name = 'Jane II';
  jane.favoriteColor = 'blue';
  await jane.save({ fields: ['name'] });
  console.log(jane.name); // "Jane II"
  console.log(jane.favoriteColor); // "blue"
  // 上面显示为 "blue",因为本地对象将其设置为 "blue",
  // 但是在数据库中它仍然是 "green"：
  await jane.reload();
  console.log(jane.name); // "Jane II"
  console.log(jane.favoriteColor); // "green"
}

async function findAndCountAll() {
  const { count, rows } = await Product.findAndCountAll({
    offset: 10,
    limit: 2,
  });
  console.log('All users:', JSON.stringify(rows, null, 2), count);
  console.log('count:', count);
}

// eslint-disable-next-line wrap-iife
async function main() {
  // await createProduct();
  // await createProduct2();
  // await createProduct3();
  // await destroyProduct();
  // await reloadProduct();
  // await saveFields();
  await findAll();
  // await findAndCountAll();
  await sequelize.close();
}

main();
