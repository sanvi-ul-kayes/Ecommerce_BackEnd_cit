const categoryModel = require("../dbModel/categoryModel");
const fs = require("fs");
const path = require("path");

//localhost:9090/api/v1/category/createCategory
async function createCategory(req, res) {
  let { name, description } = req.body;
  let category = new categoryModel({
    name,
    description,
    image: process.env.HOST_URL + req.file.filename,
  });
  await category.save();
  res.status(200).send({
    success: true,
    msg: "category created successfully",
    data: category,
  });
}

//localhost:9090/api/v1/category/deleteCategory
async function deleteCategoryController(req, res) {
  let { id } = req.params;
  try {
    let category = await categoryModel.findOneAndDelete({ _id: id });
    let Categoryimage = category.image.split("/").pop();

    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${Categoryimage}`,
      (err) => {
        if (err) {
          res.status(404).send({
            success: false,
            msg: err ? err.message : "Internal Server Error",
          });
        } else {
          res.status(200).send({
            success: true,
            msg: "Category is deleted successful",
            data: category,
          });
        }
      }
    );
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: error ? error : "Internal Server Error" });
  }
}
module.exports = { createCategory, deleteCategoryController };
