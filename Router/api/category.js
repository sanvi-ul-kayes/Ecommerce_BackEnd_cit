const express = require("express");
const createCategory = require("../../controllers/categoryController");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniquename = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".");
    cb(
      null,
      file.fieldname + "-" + uniquename + `.${extension[extension.length - 1]}`
    );
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

function errorCheck(err, req, res, next) {
  if (err) {
    res.status(500).send({ msg: err.message });
  } else {
    next();
  }
}

//localhost:9090/api/v1/category/createCategory
router.post(
  "/createCategory",
  upload.single("image"),
  createCategory,
  errorCheck
);

module.exports = router;
