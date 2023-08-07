/* eslint-disable quotes */
import { Op } from 'sequelize';
import sequelize from '../common/sequelize';
import { User } from './define-models';

// Find all users
async function findAll() {
  const users = await User.findAll();
  console.log(users.every(user => user instanceof User)); // true
  console.log('All users:', JSON.stringify(users, null, 2));
}

async function createUser() {
  const jane = await User.create({ name: 'Jane' });
  // Jane exists in the database now!
  console.log(jane instanceof User); // true
  console.log(jane.name); // "Jane"
}

async function createUser2() {
  const jane = await User.create({ name: 'Jane' });
  console.log(jane.name); // "Jane"
  jane.name = 'Ada';
  // the name is still "Jane" in the database
  await jane.save();
  // Now the name was updated to "Ada" in the database!
}

async function updateUser() {
  await User.update(
    {
      name: 'yangkk',
      remark: '杨可可',
    },
    {
      where: {
        id: 2,
      },
    }
  );
}

async function deleteUser() {
  // Delete everyone named "Jane"
  await User.destroy({
    where: {
      name: 'Ada',
    },
  });
}

async function findAndCountAll() {
  const { count, rows } = await User.findAndCountAll({});
  console.log('All users:', JSON.stringify(rows, null, 2), count);
  console.log('count:', count);
}

// eslint-disable-next-line wrap-iife
async function main() {
  // await createUser();
  // await createUser2();
  // await updateUser();
  // await deleteUser();
  await findAll();
  // await findAndCountAll();
  await sequelize.close();
}

main();
