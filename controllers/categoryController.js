const categoryModel = require("../dbModel/categoryModel");

async function createCategory(req, res) {
  let { email, description } = req.body;
  const category = new categoryModel({
    email,
    description,
    image: process.env.HOST_URL + req.file.filename,
  });
  await category.save();
  res.status(200).send({ success: true, msg: "category created successfully" });
}

module.exports = createCategory;
