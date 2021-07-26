const mongoose = require("mongoose");
const { dbShop, options } = require("./config");

async function connect() {
  await mongoose.connect(dbShop, options);
  console.log("db connected");
}

module.exports = connect;
