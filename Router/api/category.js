const express = require("express");
const router = express.Router();
const {
  createCategory,
  deleteCategoryController,
  allCategoryController,
  updateCategoryController,
  singleCategoryController,
} = require("../../controllers/categoryController");
// const authMiddleWare = require("../../middleWare/authMiddleWare");
const upload = require("../../helpers/ImageHandler");
const errorCheck = require("../../helpers/errorHandler");
//localhost:9090/api/v1/category/createCategory
router.post(
  "/createCategory",
  // authMiddleWare,
  upload.single("image"),
  errorCheck,
  createCategory
);

//localhost:9090/api/v1/category/deleteCategory
router.delete(
  "/deleteCategory/:id",
  //authMiddleWare,
  upload.single("image"),
  errorCheck,
  deleteCategoryController
);

//localhost:9090/api/v1/category/allCategory
router.get(
  "/allCategory",
  upload.single("image"),
  errorCheck,
  allCategoryController
);

//localhost:9090/api/v1/category/singleCategory
router.get(
  "/singleCategory/:id",
  upload.single("image"),
  errorCheck,
  singleCategoryController
);

//localhost:9090/api/v1/category/updateCategory
router.patch(
  "/updateCategory/:id",
  //authMiddleWare,
  upload.single("image"),
  errorCheck,
  updateCategoryController
);

module.exports = router;
