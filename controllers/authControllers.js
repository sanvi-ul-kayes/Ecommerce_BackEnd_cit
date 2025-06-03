const dbModel = require("../dbModel/dbModel");
// const sendEmail = require("../helpers/sendEmail");
const vailatedEmail = require("../helpers/vailatedEmail");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const otp = otpGenerator.generate(6, {
  upperCaseAlphabets: false,
  specialChars: false,
});

//localhost:9090/api/v1/auth/registration
async function registrationController(req, res) {
  let { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    res.status(404).send({ msg: "All field is required" });
  }

  let user = await dbModel.findOne({ email });

  if (user) {
    res.status(400).send({ Used: "Email already in use" });
  } else {
    if (!vailatedEmail(email)) {
      res.status(404).send({ Error: "Invalid Email" });
    } else {
      bcrypt.hash(password, 10, async function (err, hash) {
        try {
          let user = new dbModel({
            name,
            email,
            password: hash,
            role,
          });
          await user.save();
          let OTP = await dbModel.findOneAndUpdate(
            { email },
            { $set: { OTP: otp } },
            { new: true }
          );
          setTimeout(async () => {
            let OTP = await dbModel.findOneAndUpdate(
              { email },
              { $set: { OTP: null } },
              { new: true }
            );
          }, 10000);

          // sendEmail(email);
          res.status(200).send({
            success: true,
            Msg: "Registration completed",
            data: user,
          });
        } catch (error) {
          res.status(500).send({ error });
        }
      });
    }
  }
}

//localhost:9090/api/v1/auth/login
async function loginController(req, res) {
  let { email, password } = req.body;
  let existingUser = await dbModel.findOne({ email });

  if (existingUser) {
    bcrypt.compare(
      password,
      existingUser.password,
      async function (err, result) {
        if (result == true) {
          // let info = await dbModel.findOne({ email }).select("-password");[in order to select we can use select()(& to delete a value we can simply give a - before the value's name]

          if (existingUser.role == "user") {
            let userInfo = {
              name: existingUser.name,
              id: existingUser._id,
              email: existingUser.email,
              role: existingUser.role,
            };
            const token = jwt.sign({ userInfo }, process.env.SECRET_KEY, {
              expiresIn: "1d",
            });
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
            });
            res.status(200).send({
              success: "User Login Successful",
              data: userInfo,
              token,
            });
          } else if (existingUser.role == "admin") {
            let userInfo = {
              name: existingUser.name,
              id: existingUser._id,
              email: existingUser.email,
              role: existingUser.role,
            };
            const token = jwt.sign({ userInfo }, process.env.SECRET_KEY, {
              expiresIn: "1d",
            });
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
            });
            res.status(200).send({
              success: "Admin Login Successful",
              data: userInfo,
              token,
            });
          }
        } else {
          res.status(404).send({ Error: "Invalid Credantial" });
        }
      }
    );
  } else {
    res.status(404).send({ err: "Invalid Credantial" });
  }
}

//localhost:9090/api/v1/auth/otp_varify
async function otpVarifyController(req, res) {
  let { email, otp } = req.body;
  const existingUser = await dbModel.findOne({ email });
  if (existingUser) {
    if (existingUser.OTP == otp) {
      existingUser.isVarify = true;
      await existingUser.save();
      res.status(200).send({ msg: "OTP is varified", Data: existingUser });
    } else {
      res.status(404).send("Invalid OTP");
    }
  } else {
    res.status(404).send("OTP Not Found");
  }
}

//localhost:9090/api/v1/auth/otp_resend
async function resendOtpController(req, res) {
  let { email } = req.body;
  const existingUser = await dbModel.findOne({ email });
  if (existingUser) {
    existingUser.OTP = otp;
    await existingUser.save();
    setTimeout(async () => {
      existingUser.OTP = null;
      await existingUser.save();
    }, 10000);
    // sendEmail({ email, otp });
    res.status(200).send({ msg: "OTP Re_send successful", existingUser });
  } else {
    res.status(404).send("user Not found");
  }
}

module.exports = {
  registrationController,
  loginController,
  otpVarifyController,
  resendOtpController,
};
