const express = require("express");
const router = express.Router();

const main = require("./main.js");
const user = require("./user.js");
const update = require("./update.js");

// router.use("/main", main);
router.use("/user", user);
router.use("/main", main);
router.use("/update", update);
// router.use("/main", main);

module.exports = router;
