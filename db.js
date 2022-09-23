const { Pool } = require('pg');

let pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'password',
});

module.exports.pool = pool;