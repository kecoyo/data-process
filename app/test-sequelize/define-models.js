const { DataTypes } = require('sequelize');
const sequelize = require('../common/sequelize');

const User = sequelize.define(
  'User',
  {
    // name: { type: DataTypes.STRING, allowNull: false, comment: '用户姓名' },
    // remark: { type: DataTypes.STRING, comment: '备注' },
  },
  {
    comment: '用户表',
  }
);

// t_product
const Product = sequelize.define(
  'Product',
  {
    name: { type: DataTypes.STRING, comment: '产品名称' },
    favoriteColor: { type: DataTypes.STRING, comment: '最喜欢的颜色' },
  },
  {
    comment: '产品表',
    tableName: 't_product',
  }
);

// (async () => {
//   await sequelize.sync({
//     // force: true,
//     // alert: true,
//   });
//   console.log('All models were synchronized successfully.');
// })();

module.exports = {
  User,
  Product,
};
