const mysql = require('mysql2/promise');

async function connectDbAsync() {
    if (hasDbConnection()) return global.connection;
    const connection = await createDbConnectionAsync();
    global.connection = connection;
    return connection;
}

function hasDbConnection() {
    return global.connection && global.connection !== 'disconnected';
}

async function createDbConnectionAsync() {
    return await mysql.createConnection({
        host: 'host',
        port: 3306,
        user: 'root',
        password: '',
        database: 'codelab'
    });
}

module.exports = { connectDbAsync };