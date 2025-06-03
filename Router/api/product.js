const express = require("express");
const router = express.Router();
const {
  addproductController,
  allProductController,
  singleProductController,
  deleteProductController,
  updateProductController,
} = require("../../controllers/productController");
const upload = require("../../helpers/ImageHandler");
const errorCheck = require("../../helpers/errorHandler");

//localhost:9090/api/v1/product/addProduct
router.post(
  "/addProduct",
  upload.array("images"),
  errorCheck,
  addproductController
);

//localhost:9090/api/v1/product/allProduct
router.get(
  "/allProduct",
  upload.array("images"),
  errorCheck,
  allProductController
);

//localhost:9090/api/v1/product/singleProduct
router.get(
  "/singleProduct/:id",
  upload.array("images"),
  errorCheck,
  singleProductController
);

//localhost:9090/api/v1/product/updateProduct
router.patch(
  "/updateProduct/:id",
  upload.array("images"),
  errorCheck,
  updateProductController
);

// localhost:9090/api/v1/product/deleteProduct
router.delete(
  "/deleteProduct/:id",
  upload.array("images"),
  errorCheck,
  deleteProductController
);

module.exports = router;
