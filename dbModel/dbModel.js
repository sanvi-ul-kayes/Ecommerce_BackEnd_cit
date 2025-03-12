const { default: mongoose } = require("mongoose");

const dbModel = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
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
    isVarify: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ecommerce", dbModel);
