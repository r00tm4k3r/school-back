const mysql = require('mysql2')
require('dotenv').config()


var pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BASE
})


module.exports = pool.promise()