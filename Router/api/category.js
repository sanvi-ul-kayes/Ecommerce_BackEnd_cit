const express = require("express");
const router = express.Router();
const {
  createCategory,
  deleteCategoryController,
} = require("../../controllers/categoryController");
const multer = require("multer");
let mimetype = new Set(["image/jpeg", "image/jpg", "image/png", "image/gif"]);

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
acceptingMimeTypes = (req, file, cb) => {
  if (mimetype.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("only jpeg,jpg,png,gif type files are accepted"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: acceptingMimeTypes,
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

//localhost:9090/api/v1/category/deleteCategory
router.delete(
  "/deleteCategory/:id",
  upload.single("image"),
  deleteCategoryController,
  errorCheck
);

module.exports = router;
