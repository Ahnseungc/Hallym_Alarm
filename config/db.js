const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  port: 3306,
  database: "hallymnotice",
});

db.connect(function (err) {
  if (!err) {
    console.log("성공");
  } else {
    console.log("Error!" + err);
  }
});

module.exports = db;
