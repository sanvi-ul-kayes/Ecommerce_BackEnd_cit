function registrationController(req, res) {
  console.log(req.body);
  res.send("req");
}
function loginController(req, res) {
  res.send("login");
}

module.exports = { registrationController, loginController };
