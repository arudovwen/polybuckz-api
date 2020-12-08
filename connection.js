const mysql = require("mysql");
// const con = mysql.createConnection({
//     host:'us-cdbr-east-02.cleardb.com',
//     user:'b9c3a0870852f4',
//     password:'06f354c2',
//     database:'heroku_32656126bc1fe7a'
// })

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "polybuckz",
});


con.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});


// const con = mysql.createPool({
//   host:'us-cdbr-east-02.cleardb.com',
//     user:'b9c3a0870852f4',
//     password:'06f354c2',
//     database:'heroku_32656126bc1fe7a'
// });

// ... later
con.query('select 1 + 1', (err, rows) => { /* */ });


module.exports = con;
