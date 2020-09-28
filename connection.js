const mysql = require('mysql');
const con = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'polybuckz'
})

con.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });




  module.exports = con