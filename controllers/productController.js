const productModel = require("../dbModel/productModel");

//localhost:9090/api/v1/product/addProduct
async function productController(req, res) {
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
  const images = req.files.map((item) => {
    return item.filename;
  });
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

  try {
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(500).send(err.message || err);
  }
}

module.exports = productController;
