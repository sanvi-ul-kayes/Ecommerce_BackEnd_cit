function errorCheck(err, req, res, next) {
  if (err) {
    res.status(500).send({ msg: err.message });
  } else {
    next();
  }
}
module.exports = errorCheck;
