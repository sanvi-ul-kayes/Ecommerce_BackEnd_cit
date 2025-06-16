const express = require("express");
const {
  createCartController,
  singleUserCart,
} = require("../../controllers/cartController");
const router = express.Router();

//localhost:9090/api/v1/cart/createCart
router.post("/createCart", createCartController);

//localhost:9090/api/v1/cart/singleUserCart/
router.get("/singleUserCart/:userId", singleUserCart);
module.exports = router;
