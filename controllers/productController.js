const path = require("path");
const productModel = require("../dbModel/productModel");
const fs = require("fs");
const categoryModel = require("../dbModel/categoryModel");

//localhost:9090/api/v1/product/addProduct
async function addproductController(req, res) {
  let {
    name,
    description,
    discountPrice,
    sellingPrice,
    review,
    rating,
    stock,
    category,
  } = req.body;
  const images = req.files.map(
    (item) => `${process.env.HOST_URL}/${item.filename}`
  );

  try {
    const product = new productModel({
      name,
      description,
      image: images,
      discountPrice,
      sellingPrice,
      review,
      stock,
      rating,
      category,
    });
    await product.save();

    await categoryModel.findOneAndUpdate(
      { _id: category },
      { $push: { product: product._id } },
      { new: true }
    );

    res.status(201).send({
      success: true,
      msg: "Product is created successful",
      data: product,
    });
  } catch (err) {
    res.status(500).send(err.message || err);
  }
}

// localhost:9090/api/v1/product/updateProduct
async function updateProductController(req, res) {
  let { id } = req.params;
  try {
    let { name, description } = req.body;

    // requested product image or new product image
    const images = req.files.map((item) => {
      return `${process.env.HOST_URL + item.filename}`;
    });

    const updateProduct = await productModel.findOneAndUpdate(
      { _id: id },
      { name, description, image: images }
    );

    // old image
    const productImageArray = updateProduct.image;
    productImageArray.forEach((element) => {
      const oldproductImageArray = element.split("/").pop();
      fs.unlink(
        `${path.join(__dirname, "../uploads")}/${oldproductImageArray}`,
        (err) => {
          if (err) {
            res.status(404).send({
              success: false,
              msg: err ? err.message : "Internal Server Error",
            });
          } else {
            res.status(200).send({
              success: true,
              msg: "Product is updated successful",
              data: updateProduct,
            });
          }
        }
      );
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: error ? error : "Internal Server Error" });
  }
}

// localhost:9090/api/v1/product/deleteProduct
async function deleteProductController(req, res) {
  let { id } = req.params;
  try {
    const deleteProduct = await productModel.findOneAndDelete({ _id: id });
    const imagePathArray = deleteProduct.image;
    imagePathArray.forEach((element) => {
      const imagePathArray = element.split("/").pop();

      fs.unlink(
        `${path.join(__dirname, "../uploads")}/${imagePathArray}`,
        (err) => {
          if (err) {
            res.status(404).send({
              success: false,
              msg: err ? err.message : "Internal Server Error",
            });
            category.save();
          } else {
            res.status(200).send({
              success: true,
              msg: "Product is deleted successful",
              data: deleteProduct,
            });
          }
        }
      );
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: error ? error : "Internal Server Error" });
  }
}

// localhost:9090/api/v1/product/allProduct
async function allProductController(req, res) {
  try {
    const allProduct = await productModel.find();
    res.send({
      success: true,
      msg: "All products fetched successfully",
      data: allProduct,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: error ? error : "Internal Server Error" });
  }
}

// localhost:9090/api/v1/product/singleProduct
async function singleProductController(req, res) {
  let { id } = req.params;
  try {
    const allProduct = await productModel.findOne({ _id: id });
    res.send({
      success: true,
      msg: "Product fetched successfully",
      data: allProduct,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: error ? error : "Internal Server Error" });
  }
}

module.exports = {
  addproductController,
  allProductController,
  singleProductController,
  deleteProductController,
  updateProductController,
};
