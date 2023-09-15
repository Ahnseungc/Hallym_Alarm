const express = require("express");
const cors = require("cors");
const app = express();

const port = 3065;

const routes = require("./routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

app.use("/", routes);
app.use(
  cors({
    origin: "*", // 출처 허용 옵션
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(port, () => console.log(`server running on port ${port}`));
