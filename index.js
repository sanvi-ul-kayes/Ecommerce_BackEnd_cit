const express = require("express");
require("dotenv").config();
const app = express();
const router = require("./Router");
const dbConnect = require("./config/dbConfig");
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//localhost:9090/home
app.use(router);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("server is running");
});
