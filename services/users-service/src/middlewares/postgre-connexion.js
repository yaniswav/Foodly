const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
    user: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    database: process.env.POSTGRESQL_DATABASE,
})

async function postgreConnect() {
    await client.connect()
    console.log('[Users-serivce] PostgreSQL connected')
}

async function postgreDisconnect() {
    await client.end()
    console.log('[Users-serivce] PostgreSQL disconnected')
}

module.exports.postgreConnect = postgreConnect;
module.exports.postgreDisconnect = postgreDisconnect;
module.exports.client = client;

// var g = await client.query('SELECT NOW()')
// console.log(g);