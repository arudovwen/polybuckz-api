const mysql = require("mysql");
const con = mysql.createConnection({
    host:'us-cdbr-east-02.cleardb.com',
    user:'b6bbea201c07dd',
    password:'09c00c2c',
    database:'heroku_fa446684ae8a265'
})

// const con = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "polybuckz",
// });

con.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

module.exports = con;
