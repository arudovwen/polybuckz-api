const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const mail = require("./mailer");
const con = require("./connection");

const files = require("./test.js");
files.fileExistsSync('hello')


app.use(bodyParser.json());
app.use(cors());
// use the express-static middleware
// app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.send(`Hi, server is listening at port ${port}`);
});
app.get("/gallery", (req, res) => {
  var sql = "select * from assets";
  con.query(sql, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});
app.post("/gallery", (req, res) => {
  var sql = `insert into assets (col,title, source, description) values('${req.body.line}','${req.body.title}','${req.body.src}','${req.body.description}')`;

  con.query(sql, (err, result) => {
    if (err) throw err;

    con.query(
      `select * from assets where id=${result.insertId}`,
      (err, rows) => {
        if (err) throw err;

        res.status(201).send(rows[0]);
      }
    );
  });
});

app.get("/gallery/:id", (req, res) => {
  const id = Number(req.params.id);
  con.query(`select * from assets where id=${id}`, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
});
app.delete("/gallery/:id", (req, res) => {
  var sql = `delete from assets where id = ${Number(req.params.id)}`;
  con.query(sql, (err, rows) => {
    if (err) throw err;
    res.send();
  });
});

app.get("/team", (req, res) => {
  var sql = "select * from teams";
  con.query(sql, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});
app.post("/team", (req, res) => {
  var sql = `insert into teams (title, profile, description) values('${req.body.title}','${req.body.src}','${req.body.description}')`;

  con.query(sql, (err, result) => {
    if (err) throw err;

    con.query(
      `select * from teams where id=${result.insertId}`,
      (err, rows) => {
        if (err) throw err;

        res.status(201).send(rows[0]);
      }
    );
  });
});

app.get("/team/:id", (req, res) => {
  const id = Number(req.params.id);
  con.query(`select * from teams where id=${id}`, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
});
app.delete("/team/:id", (req, res) => {
  var sql = `delete from teams where id = ${Number(req.params.id)}`;
  con.query(sql, (err, rows) => {
    if (err) throw err;
    res.send();
  });
});

app.post("/sendmail", (req, res) => {
  let htmlContent = `
              
                <p>Hi,</p>
                <p>${req.body.name} contacted with the following Details</p>
                <br/>
                <p>Email: ${req.body.email}</p>
                <p>Phone: ${req.body.phone}</p>
                <p> Name: ${req.body.name}</p>
                <p>Message: ${req.body.message}</p>`;
           
                var mailOptions = {
                  from: `${req.body.name} <${req.body.email}>`,
                  to: "successahon@gmail.com",
                  subject: req.body.subject,
                  text: "",
                  html: htmlContent,
                };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.send(info.response);
      console.log("Email sent: " + info.response);
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});