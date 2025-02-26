const jwt = require("jsonwebtoken");
function authMiddleWare(req, res, next) {
  let { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(401).send({ success: false, msg: err });
      } else {
        let { role } = decoded.userInfo;
        if (role == "admin") {
          next();
        } else {
          res.status(401).send({ success: false, msg: "access denied" });
        }
      }
    });
  } else {
    res.status(404).send({ success: false, msg: "Token not found" });
  }
}

module.exports = authMiddleWare;
