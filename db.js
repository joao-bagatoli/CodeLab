require('dotenv').config();
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
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
}

module.exports = { connectDbAsync };