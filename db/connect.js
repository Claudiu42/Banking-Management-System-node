// db/connect.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "pibd_user",
  password: "Bruh",
  database: "Sistem_de_gestiune_bancara",
  waitForConnections: true, // Ensures the pool waits for connections instead of failing when full
  connectionLimit: 10, // Limit the maximum number of connections
  queueLimit: 0, // No limit to the connection queue
  dateStrings: true,
});

// Export the pool for use in the application
module.exports = pool;
