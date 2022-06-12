const mongoose = require("mongoose");

let allorders = new mongoose.Schema({
  Orederid: { type: String },
  Owner: { type: String },
  Totalitems: { type: String },
  Ordervalue: { type: Number },
  date: { type: String },
});
module.exports = mongoose.model("alloredersdata", allorders);
