const express = require("express");
const {
  createCartController,
  singleUserCart,
  incrementCartcontroller,
  decrementCartcontroller,
  deleteCartcontroller,
} = require("../../controllers/cartController");
const router = express.Router();

//localhost:9090/api/v1/cart/createCart
router.post("/createCart", createCartController);

//localhost:9090/api/v1/cart/singleUserCart/
router.get("/singleUserCart/:userId", singleUserCart);

//localhost:9090/api/v1/cart/incrementCart/
router.patch("/incrementCart/:userId", incrementCartcontroller);

//localhost:9090/api/v1/cart/decrementCart/
router.patch("/decrementCart/:userId", decrementCartcontroller);

//localhost:9090/api/v1/cart/deleteCart/
router.delete("/deleteCart/:userId", deleteCartcontroller);
module.exports = router;
