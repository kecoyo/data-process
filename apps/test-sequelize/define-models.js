const { DataTypes } = require('sequelize');
const sequelize = require('../../common/sequelize');

const User = sequelize.define(
  'User',
  {
    name: { type: DataTypes.STRING, allowNull: false, comment: '用户姓名' },
    remark: { type: DataTypes.STRING, comment: '备注' },
  },
  {
    comment: '用户表',
  }
);

// (async () => {
//   await sequelize.sync({ alert: true });
//   console.log('All models were synchronized successfully.');
// })();

module.exports = {
  User,
};
