const mysql = require('mysql');
let pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'webserverdb.cs2jazaa7sng.us-east-1.rds.amazonaws.com',
  user            : 'admin',
  password        : 'Admin321',
  database        : 'vpc_flow_logs'
});

module.exports = pool