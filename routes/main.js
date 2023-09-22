const { setIntervalAsync } = require("set-interval-async");
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const db = require("../config/db");
const router = express.Router();
const admin = require("firebase-admin");

let setAccount = require("../hallymnotice-firebase-adminsdk-4tjsg-635071432c.json");
admin.initializeApp({
  credential: admin.credential.cert(setAccount),
});

const getHtmlGrade = async () => {
  try {
    return await axios.get(
      "https://www.hallym.ac.kr/hallym_univ/sub05/cP3/sCP1?category="
    );
  } catch (err) {
    console.log(err);
  }
};

const interval = 5000;

let Grade_id = {
  keyword: "지",
  id: 157,
  title: "",
  idCheck: [],
};
const sqlQuery = "SELECT * FROM user_info_main_final3";

setInterval(
  () =>
    getHtmlGrade().then((html) => {
      const $ = cheerio.load(html.data);
      let ul = [];
      const bodyList = $("li.tbl-row");
      bodyList.map((i, element) => {
        ul[i] = {
          id: $(element).find("span.col.col-1.tc span").text(),
          title: $(element)
            .find("span.col.col-2.dot span a")
            .text()
            .replace(/\s/g, ""),
        };
      });
      console.log(Grade_id.id);
      console.log(ul);
      ul.map((item) => {
        if (item.id !== Grade_id.id) {
          Grade_id.id = item.id;

          db.query(sqlQuery, (err, result) => {
            result.map((e) => {
              if (e.keywords !== "undefined") {
                let keywordsarr = e.keywords.split(",");
                keywordsarr.map((keyword) => {
                  if (item.title.includes(keyword)) {
                    console.log("찾음", e.id);
                    let message = {
                      data: {
                        title: "테스트 데이터 발송",
                        body: "데이터가 잘 가나요?",
                        style: "굳",
                      },
                      notification: {
                        title: `Hallym`, //핸드폰 메시지
                        body: `${[
                          ...e.keywords,
                        ]}의 새로운 단어가 등록 되었습니다.`,
                        // sound: "default",
                      },
                      apns: {
                        payload: {
                          aps: {
                            contentAvailable: true,
                          },
                        },
                      },
                      token: e.fcmToken,
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
                  }
                });
              }
            });
          });
        } else {
          console.log("등록된 키워드가 없습니다.");
          Grade_id.id = item.id;
        }
      });
    }),
  interval
);

module.exports = router;
