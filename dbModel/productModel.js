const { default: mongoose } = require("mongoose");

const productModel = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is required"],
      trim: true,
    },
    description: {
      type: String,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categorie",
    },
    discountPrice: {
      type: String,
    },
    sellingPrice: {
      type: String,
    },
    stock: {
      type: String,
    },
    rating: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productModel);
