const { default: mongoose } = require("mongoose");

function dbConnect() {
  console.log("Connecting...");
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Database is Connected");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = dbConnect;
