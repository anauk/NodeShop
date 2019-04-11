//путь к базе данных без сиквалайза
/*
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'M15201983'
});

module.exports = pool.promise();*/

const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', 'M15201983', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;