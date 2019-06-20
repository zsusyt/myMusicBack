const Sequelize = require('sequelize');

const sequelize = new Sequelize('music', 'crawler', '123456', {
  host: 'localhost',
  dialect: 'mysql',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  define: {
    freezeTableName: true
  }
});

module.exports.sequelize = sequelize;