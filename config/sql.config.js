//const sql = require('mssql');

// Configuration object
const sqlconfig = {
    user: 'sa',
    password: '%pns000%',
    server: '192.168.1.211\\SQL2017', // You can use 'localhost\\instance' to connect to a named instance
    database: 'NMTDB',
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true // Change to true for local dev / self-signed certs
    }
};


module.exports = sqlconfig;
