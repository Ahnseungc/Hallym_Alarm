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
    res.send("db저장 성공");
    if (err) {
      console.log(err);
      res.send("유저 정보 업데이트 실패");
    }
  });
});

router.post("/update", (req, res) => {
  const fcmtoken = req.body.fcmToken;
  const keywords_s = req.body.keywords;
  console.log(keywords_s);
  // const sqlQuery = `update user_info_main_final3 keywords set keywords =`${keywords_s}``;

  db.query(sqlQuery, (err, result) => {
    res.send("db저장 성공");
    if (err) {
      console.log(err);
      res.send("유저 정보 업데이트 실패");
    }
  });
});

module.exports = router;
