const express = require("express");
const {
  registrationController,
  loginController,
} = require("../../controllers/authControllers");
const router = express.Router();

//localhost:9090/api/v1/auth/registartion
router.post("/registration", registrationController);

//localhost:9090/api/v1/auth/login
router.post("/login", loginController);

module.exports = router;
