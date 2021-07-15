const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

let dbUser = "sa", dbPassword = "kitsacv", dbServer = 'ELVIS-RETIZW', dbName = "ClaroShop"

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbServer,
  dialect: 'mssql',
  dialectOptions: { 
    options: {
      instanceName: 'SQLEXPRESS'
    }
  }
});

module.exports = sequelize;