const express = require("express");
const router = express.Router();
const db = require("../config/db");

const admin = require("firebase-admin");

let setAccount = require("../hallymnotice-firebase-adminsdk-4tjsg-635071432c.json");
admin.initializeApp({
  credential: admin.credential.cert(setAccount),
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("로그인 페이지 ");
});

router.post("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  // const name = req.query.name;
  // const fcmtoken = req.body.data[0];
  // const keywords = req.body.data[1];
  const fcmtoken = req.body.fcmtoken;
  const keywords = req.body.keywords;
  const newalarm = req.body.newalarm;
  //keyword   토근이랑 키워드 배열, 새 공지사항 여부 불린 값

  // console.log(name, token);

  const sqlQuery = `INSERT INTO user_info_main_final(fcmtoken, keywords,isNewNoticeReceiveNotify) VALUES("${fcmtoken}","${keywords}","${newalarm}");`;
  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log(err);
    // printRes(err, result);
  });

  let message = {
    // data: {
    //   title: "테스트 데이터 발송",
    //   body: "데이터가 잘 가나요?",
    //   style: "굳",
    // },
    notification: {
      title: `${keywords}의 새로운 단어가 등록 되었습니다.`,
      body: "이왜진?",
      sound: "default",
    },
    apns: {
      payload: {
        aps: {
          contentAvailable: true,
        },
      },
    },
    token: fcmtoken,
  };

  admin
    .messaging()
    .send(message)
    .then((res) => {
      console.log("전송 성공 :", res);
    })
    .catch((err) => {
      console.log("전송 실패 : ", err);
    });
});

module.exports = router;
