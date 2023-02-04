const mysql = require("mysql2");

const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "dev",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 5,
});

module.exports = connectionPool;
