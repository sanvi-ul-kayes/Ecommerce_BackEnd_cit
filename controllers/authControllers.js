const dbModel = require("../dbModel/dbModel");
const vailatedEmail = require("../helpers/vailatedEmail");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

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
          res.status(200).send({ user });
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
          let info = await dbModel.findOne({ email }).select("-password");
          const token = jwt.sign({ info }, process.env.SECRET_KEY, {
            expiresIn: "1d",
          });
          res
            .status(200)
            .send({ success: "Login Successful", data: existingUser, token });
        } else {
          res.status(404).send({ Error: "Invalid Credantial" });
        }
      }
    );
  } else {
    res.status(404).send({ err: "Invalid Credantial" });
  }
}

module.exports = { registrationController, loginController };
