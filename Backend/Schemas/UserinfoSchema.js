const mongoose = require("mongoose");

let allusersdata = new mongoose.Schema({
  Firstname: { type: String },
  Lastname: { type: String },
  Email: { type: String },
  Phone: { type: Number },
  Password: { type: String },
  Wishlist: { type: Array },
  Orders: { type: Array },
  Adress: { type: String },
});
module.exports = mongoose.model("allusersinfo", allusersdata);
