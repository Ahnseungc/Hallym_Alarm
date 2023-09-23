const express = require("express");
const router = express.Router();
const db = require("../config/db");

const admin = require("firebase-admin");
const { combineReducers } = require("redux");

router.get("/", function (req, res, next) {
  res.send("업데이트 페이지 ");
});

router.post("/", (req, res) => {
  const fcmtoken = req.body.fcmToken;
  const keywords_s = req.body.keywords;
  console.log(keywords_s);
  const sqlQuery_s = `UPDATE user_info_main_final3 SET keywords="${keywords_s}" where fcmToken="${fcmtoken}"`;

  db.query(sqlQuery_s, (err, result) => {
    res.send("db저장 성공");
    res.json({
      success: true,
    });
    if (err) {
      console.log(err);
      res.send("유저 정보 업데이트 실패");
      res.json({
        success: true,
      });
    }
  });
});

module.exports = router;
