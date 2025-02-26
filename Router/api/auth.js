const express = require("express");
const {
  registrationController,
  loginController,
} = require("../../controllers/authControllers");
const authMiddleWare = require("../../middleWare/authMiddleWare");
const router = express.Router();

//localhost:9090/api/v1/auth/registartion
router.post("/registration", registrationController);

//localhost:9090/api/v1/auth/login
router.post("/login", loginController);

//localhost:9090/api/v1/auth/user
router.get("/user", authMiddleWare, (req, res) => {
  res.send("user");
});

module.exports = router;
