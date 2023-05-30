const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('dunkin_db', 'root', '00000000', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
  });
  module.exports=sequelize
