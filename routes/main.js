// const express = require("express");
// const router = express.Router();
// const admin = require("firebase-admin");

// let setAccount = require("../hallymnotice-firebase-adminsdk-4tjsg-635071432c.json");
// admin.initializeApp({
//   credential: admin.credential.cert(setAccount),
// });

// router.get("/push_send", function (req, res, next) {
//   let target_token = `토큰값`;
//   let message = {
//     data: {
//       title: "테스트 데이터 발송",
//       body: "데이터가 잘 가나요?",
//       style: "굳",
//     },
//     token: target_token,
//   };

//   admin
//     .messaging()
//     .send(message)
//     .then((res) => {
//       console.log("전송 성공 :", res);
//     })
//     .catch((err) => {
//       console.log("전송 실패 : ", err);
//     });
// });

// module.exports = router;
