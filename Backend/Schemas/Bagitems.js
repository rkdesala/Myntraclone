const mongoose = require("mongoose");

let allbagitems = new mongoose.Schema({
  owner: { type: String },
  itemid: { type: String },
});
module.exports = mongoose.model("allbagitems", allbagitems);
