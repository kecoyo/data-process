const { Sequelize } = require('sequelize');
const config = require('../../config');

const sequelize = new Sequelize(config.sequelize);

// eslint-disable-next-line wrap-iife
(async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
