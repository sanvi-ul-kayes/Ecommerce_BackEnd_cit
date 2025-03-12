const express = require("express");
const router = express.Router();
const auth = require("./auth");
const category = require("./category");

//localhost:9090/api/v1/auth
router.use("/auth", auth);

//localhost:9090/api/v1/category
router.use("/category", category);

module.exports = router;
