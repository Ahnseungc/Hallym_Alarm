const express = require("express");
const router = express.Router();
const db = require("../config/db");

const admin = require("firebase-admin");
const { combineReducers } = require("redux");

router.get("/", function (req, res, next) {
  res.send("로그인 페이지 ");
});

router.post("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const fcmtoken = req.body.fcmToken;
  const keywords = req.body.keywords;

  console.log(keywords);

  const sqlQuery = `INSERT INTO user_info_main_final3(fcmtoken, keywords) VALUES("${fcmtoken}","${keywords}");`;

  db.query(sqlQuery, (err, result) => {
    res.json({
      success: true,
    });
    if (err) {
      console.log(err);
      res.json({
        success: false,
      });
    }
  });
});

module.exports = router;
