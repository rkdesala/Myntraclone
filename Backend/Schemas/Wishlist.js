const mongoose = require("mongoose");

let allwishlists = new mongoose.Schema({
  Ownerid: { type: String },
  Itemid: { type: String },
});
module.exports = mongoose.model("allwishlistinfo", allwishlists);
