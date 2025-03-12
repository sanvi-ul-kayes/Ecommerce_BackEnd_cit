const { default: mongoose } = require("mongoose");

const categoryModel = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is required"],
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Categorie", categoryModel);
