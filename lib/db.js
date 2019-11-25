const mysql = require('mysql2');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'team20',
  password: 'team20',
  database: 'team20'
});

module.exports =  connection.promise();