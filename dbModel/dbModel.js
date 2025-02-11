const { default: mongoose } = require("mongoose");

const dbModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    OTP: {
      type: String,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
    },
    adderss: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ecommerce", dbModel);
