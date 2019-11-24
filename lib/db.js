const mysql = require('mysql2');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234qwer',
  database: 'ewha'
});

module.exports =  connection.promise();
