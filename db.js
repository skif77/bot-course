const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'db-bot',
    'postgres',
    'root',
    {
        host   : '34.155.149.98',
        port   : '5432',
        dialect : 'postgres'
    }
)