const { default: mongoose } = require("mongoose");

const cartModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ecommerce",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartModel);
