const cartModel = require("../dbModel/cartModel");

//localhost:9090/api/v1/cart/createCart
async function createCartController(req, res) {
  try {
    let { product, price, quantity, user } = req.body;

    const createCart = cartModel({
      product,
      price,
      quantity,
      user,
    });

    await createCart.save();
    res
      .status(201)
      .send({ success: true, msg: "Cart Created successfu", data: createCart });
  } catch (error) {
    res.status(500).send({ success: false, msg: "Invalid credantial", error });
  }
}

//localhost:9090/api/v1/cart/singleUserCart
async function singleUserCart(req, res) {
  let { userId } = req.params;
  const singleUserCart = await cartModel.find({ user: userId });
}

module.exports = { createCartController, singleUserCart };
