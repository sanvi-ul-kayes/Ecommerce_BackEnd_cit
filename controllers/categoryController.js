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
    const category = await categoryModel.findOneAndDelete({ _id: id });
    const Categoryimage = category.image.split("/").pop();

    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${Categoryimage}`,
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

//localhost:9090/api/v1/category/allCategory
async function allCategoryController(req, res) {
  try {
    const allCategory = await categoryModel.find({});
    if (allCategory) {
      res.send({
        success: true,
        msg: allCategory.length && "All Categories are fetched",
        data: allCategory,
      });
      console.log(allCategory);
    } else {
      res.status(404).send({
        success: false,
        msg: "No Category",
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: error ? error : "Internal Server Error" });
  }
}

//localhost:9090/api/v1/category/updateCategory
async function updateCategoryController(req, res) {
  let { id } = req.params;
  let { name, description } = req.body;
  const image = req.file;
  const { filename } = image;
  try {
    let category = await categoryModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        image: process.env.HOST_URL + filename,
      }
    );
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
            msg: "Category is Updated successful",
            data: category,
          });
          category.save();
        }
      }
    );
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: error ? error : "Internal Server Error" });
  }
}

//localhost:9090/api/v1/category/singleCategoryController
async function singleCategoryController(req, res) {
  const { id } = req.params;
  try {
    const category = await categoryModel.findOne({ _id: id });
    res.send({
      success: true,
      msg: "Single category fetched successfully",
      data: category,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: error ? error : "Internal Server Error" });
  }
}

module.exports = {
  createCategory,
  deleteCategoryController,
  allCategoryController,
  updateCategoryController,
  singleCategoryController,
};
