const express = require("express");
const router = express.Router();

// const main = require("./main.js");
const user = require("./user.js");

// router.use("/main", main);
router.use("/user", user);

module.exports = router;
