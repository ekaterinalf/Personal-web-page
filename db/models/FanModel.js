const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const fanSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  instagram: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const FanModel = model("Fan", fanSchema);

module.exports = FanModel;
