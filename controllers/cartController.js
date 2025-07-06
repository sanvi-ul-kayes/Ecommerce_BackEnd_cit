const cartModel = require("../dbModel/cartModel");

//localhost:9090/api/v1/cart/createCart
async function createCartController(req, res) {
  try {
    let { product, price, quantity, user } = req.body;
    const createCart = new cartModel({
      product,
      price,
      quantity,
      user,
    });
    await createCart.save();
    res.status(201).send({
      success: true,
      msg: "Cart Created successful",
      data: createCart,
    });
  } catch (error) {
    res.status(500).send({ success: false, msg: "Invalid credantial", error });
  }
}

//localhost:9090/api/v1/cart/singleUserCart
async function singleUserCart(req, res) {
  let { userId } = req.params;
  const singleUserCart = await cartModel.findOne({ user: userId });
  res.status(200).send({
    success: true,
    msg: "Single cart fetched successfully",
    data: singleUserCart,
  });
}

//localhost:9090/api/v1/cart/incrementCart
async function incrementCartcontroller(req, res) {
  let { userId } = req.params;
  try {
    const incrementCart = await cartModel
      .findOne({ _id: userId })
      .populate("product");
    if (incrementCart.product.stock > incrementCart.quantity) {
      incrementCart.quantity++;
      await incrementCart.save();
      res.status(200).send({
        success: true,
        msg: "Increment Cart successfully",
        data: incrementCart,
      });
    } else {
      res.status(200).send({ msg: "Stock Out" });
    }
  } catch (error) {
    res.send(error);
  }
}

//localhost:9090/api/v1/cart/decrementCart
async function decrementCartcontroller(req, res) {
  let { userId } = req.params;
  const decrementCart = await cartModel.findOne({ _id: userId });

  if (decrementCart.quantity > 1) {
    decrementCart.quantity--;
    await decrementCart.save();
    res.status(200).send({
      success: true,
      msg: "decrement Cart successfully",
      data: decrementCart,
    });
  } else {
    res.status(400).send({ msg: "Product is require" });
  }
}

//localhost:9090/api/v1/cart/deleteCart
async function deleteCartcontroller(req, res) {
  let { userId } = req.params;
  try {
    const deleteCart = await cartModel.findOneAndDelete({ _id: userId });
    res
      .status(200)
      .send({ success: true, msg: "Cart delete Sucessful", data: deleteCart });
  } catch (error) {
    res.status(404).send({ msg: "Cart is require" });
  }
}

module.exports = {
  createCartController,
  singleUserCart,
  incrementCartcontroller,
  decrementCartcontroller,
  deleteCartcontroller,
};
