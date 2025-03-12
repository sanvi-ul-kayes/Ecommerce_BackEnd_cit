async function createCategory(req, res) {
  let { name, description, image } = req.body;
  res.send(req.body);
  console.log(req.file);
}

module.exports = createCategory;
