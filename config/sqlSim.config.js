const sqlconfig = {
  user: "sa",
  password: "%pns000%",
  server: "192.168.8.216\\Test", // You can use 'localhost\\instance' to connect to a named instance
  database: "SIMSDB_UAT",
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true, // Change to true for local dev / self-signed certs
  },
};

module.exports = sqlconfig;
