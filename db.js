// require('dotenv').config();
const mysql = require('mysql2/promise');

async function connectDbAsync() {
    if (hasDbConnection()) return global.connection;

    try {
        const connection = await createDbConnectionAsync();
        global.connection = connection;
        return connection;
    } catch(error) {
        console.error('Error connecting to database', error);
        throw error;
    }
}

function hasDbConnection() {
    return global.connection && global.connection.state !== 'disconnected';
}

async function createDbConnectionAsync() {
    return await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'codelab'
    });
}

module.exports = { connectDbAsync };