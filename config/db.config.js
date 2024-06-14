// Get the client
const mysql = require("mysql2");

function setConnection() {
  return mysql.createConnection({
    host: "192.168.2.215",
    user: "root",
    password: "%pns000%",
    database: "mkt_crm_db",
    port: '3306'
  });
}

module.exports = setConnection;