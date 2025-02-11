const express = require("express");
const router = express.Router();
const auth = require("./auth");

//localhost:9090/api/v1/auth
router.use("/auth", auth);

module.exports = router;
