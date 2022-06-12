const mongoose = require("mongoose");

let allproductsdata = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  rating: { type: Object },
});
module.exports = mongoose.model("Allproductsdata", allproductsdata);
