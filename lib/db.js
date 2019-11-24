const mysql = require('mysql2');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Stanford',
  database: 'ewha'
});

module.exports =  connection.promise();