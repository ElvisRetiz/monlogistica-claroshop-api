const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

let dbUser = "sa", dbPassword = "kitsacv", dbServer = 'ELVIS-RETIZ', dbName = "ClaroShop"

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbServer,
  dialect: 'mssql'
});

module.exports = sequelize;