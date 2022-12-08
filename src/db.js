const { createPool } = require('mysql2/promise')

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '08292002jaider',
    port: 3306,
    database: 'library'
})

module.exports = pool;