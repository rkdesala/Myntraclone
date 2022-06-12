const express = require("express");
const app = express();
const fetch = require("node-fetch");
var bodyparser = require("body-parser");
app.use(bodyparser());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors({ origin: "*" }));
/////////////////Schemas////////////////////////////
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authtoken = require("./Middlewares/Tokenmiddleware");
const userinfo_db = require("./Schemas/UserinfoSchema");
const Bagitems_db = require("./Schemas/Bagitems");
const Wishlist_db = require("./Schemas/Wishlist");
const allorders_db = require("./Schemas/allOrdersschema");
///////////////////////////////////////////////////////
const allproducts_database = require("./Schemas/allproducts");
const mongoose = require("mongoose");
app.use(bodyparser());
mongoose
  .connect(
    "mongodb+srv://ramakrishnadesala95:9390422554@myntracloneallitems.ry6bp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("not connected to db");
  });
/////////////////////////////////////////////
// https://youtu.be/chx9Rs41W6g
// https://youtu.be/BsDoLVMnmZs
// https://youtu.be/Edsxf_NBFrw
//https://youtu.be/I6tbhNUU96Y
/////////////////////////////////////////////
app.post("/register", async (req, res) => {
  try {
    let userexist = await userinfo_db.findOne({ Email: req.body.Email });
    console.log(Boolean(userexist));
    if (userexist) {
      throw "User with this mail already exist";
    }
    userexist = await userinfo_db.findOne({ Phone: req.body.Phone });
    if (userexist) {
      throw "User with this Mobile number already exist";
    }
    const hashedpassword = await bcrypt.hash(req.body.Password, 10);
    const userdetails = {
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Phone: req.body.Phone,
      Email: req.body.Email,
      Adress: req.body.Adress,
      Password: hashedpassword,
    };
    console.log(userdetails);
    await userinfo_db.create(userdetails);
    res.status(200).send("Registration successfull....Please Login");
  } catch (e) {
    console.log(e);
    res.status(200 || 5000).send(e || "Some internal server error");
  }
  res.end();
});

////////////////////////////////////////////////////////////////////

app.post("/login", async (req, res) => {
  console.log("req maken");
  console.log(req.body);
  try {
    console.log("this is try block");
    let userExist = await userinfo_db.findOne({ Email: req.body.Email });
    console.log(userExist.id);
    if (!userExist) {
      throw "You are not registered.... please register";
    }
    if (!(await bcrypt.compare(req.body.Password, userExist.Password))) {
      throw "Invalid credentials";
    }
    let userPayload = { userId: userExist.id };
    jwt.sign(
      userPayload,
      "Myntraclone",
      { expiresIn: 600000 },
      async (error, Token) => {
        if (error) {
          throw "error in token generation";
        } else {
          ////////////////////////////////////////////////////////
          console.log("after token generation");
          const person = await userinfo_db.findOne({ Email: req.body.Email });
          const Wishlist = await Wishlist_db.find({ Ownerid: person.id });

          const products = Wishlist.map(async (e) => {
            return await allproducts_database.findById(e.Itemid);
          });

          const wishlistproducts = await Promise.all(products);
          res.status(200).json({
            status: "sucess",
            token: Token,
            Wishlistlength: wishlistproducts.length,
            username: person.Firstname,
          });
          res.end();
        }
      }
    );
  } catch (e) {
    //console.log(e);
    res.status(200 || 500).send(e || " some Internal Server error");
    res.end();
  }
  //res.end();
});

//////////////////////////////////////////////////////////////////////////////////////////////

app.get("/products/:category", async (req, res) => {
  const categorydata = [];
  if (req.params.category == "mens") {
    let data = await allproducts_database.find({ category: "men's clothing" });
    console.log(data);

    res.status(200).send(data);
  }
  if (req.params.category == "womens") {
    let data = await allproducts_database.find({
      category: "women's clothing",
    });
    console.log(data);
    res.status(200).send(data);
  }
  if (req.params.category == "jewellery") {
    let data = await allproducts_database.find({ category: "jewelery" });
    console.log(data);
    res.status(200).send(data);
  }
  res.end();
});
///////////////////////////////////////////////////////////////////
app.get("/addtowishlist/:postid", authtoken, async (req, res) => {
  console.log(req.user.userId);
  try {
    if (
      await Wishlist_db.findOne({
        Ownerid: req.user.userId,
        Itemid: req.params.postid,
      })
    ) {
      throw "This Item is already in your wishlist";
    }
    const wishitem = { Ownerid: req.user.userId, Itemid: req.params.postid };
    await Wishlist_db.create(wishitem);
    const Wishlist = await Wishlist_db.find({ Ownerid: req.user.userId });

    const products = Wishlist.map(async (e) => {
      return await allproducts_database.findById(e.Itemid);
    });
    const wishlistproducts = await Promise.all(products);
    res.status(200).json({
      status: "added",
      Wishlistlength: wishlistproducts.length,
    });
  } catch (e) {
    res.status(200).json({
      status: "failed",
    });
  }
  res.end();
});
//////////////////////////////////////////////////////////////////////////
app.get("/deletewishlistitem/:postid", authtoken, async (req, res) => {
  console.log(req.user.userId);
  try {
    await Wishlist_db.deleteOne({
      Ownerid: req.user.userId,
      Itemid: req.params.postid,
    });
    const Wishlist = await Wishlist_db.find({ Ownerid: req.user.userId });

    const products = Wishlist.map(async (e) => {
      return await allproducts_database.findById(e.Itemid);
    });
    const wishlistproducts = await Promise.all(products);
    res.status(200).json({
      status: "ok",
      wishlist: wishlistproducts,
    });
  } catch (e) {
    res.status(200).json({
      status: "failed",
    });
  }
  res.end();
});

//////////////////////////////////////////////////////////////////////////
app.get("/getwishlist", authtoken, async (req, res) => {
  console.log(req.user.userId);
  try {
    const Wishlist = await Wishlist_db.find({ Ownerid: req.user.userId });

    const products = Wishlist.map(async (e) => {
      return await allproducts_database.findById(e.Itemid);
    });
    const wishlistproducts = await Promise.all(products);
    //console.log("these are wishlist products");
    //console.log(wishlistproducts);
    res.status(200).json({
      status: "ok",
      wishlist: wishlistproducts,
    });
  } catch (e) {
    res
      .status(200)
      .json({ status: "failed", message: "internal server error" });
  }
  res.end();
});

/////////////////////////////////////////////////////////////////////////////
app.get("/getsinglepost/:postid", async (req, res) => {
  console.log("this is requested post");
  console.log(req.params.postid);
  const requiredpost = await allproducts_database.findById(req.params.postid);
  const pp = requiredpost.rating;
  console.log(pp);
  res.status(200).send(requiredpost);
  res.end();
});

/////////////////////////////////////////////PLACE ORDER///////////

app.post("/placeorder/:postid", authtoken, async (req, res) => {
  try {
    console.log("this post should be updated");
    console.log(req.params.postid);
    let checkordercount = await allproducts_database.findById(
      req.params.postid
    );
    checkordercount.rating.count =
      parseInt(checkordercount.rating.count) - parseInt(req.body.Totalitems);

    await allproducts_database.findByIdAndUpdate(req.params.postid, {
      rating: {
        rate: checkordercount.rating.rate,
        count: checkordercount.rating.count,
      },
    });
    const d = new Date();
    const neworder = {
      Orederid: req.params.postid,
      Owner: req.user.userId,
      Totalitems: req.body.Totalitems,
      Ordervalue: req.body.Ordervalue,
      date: `on ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
    };
    await allorders_db.create(neworder);
    res.status(200).json({ status: "ok", message: "Orderpleced" });
  } catch (e) {
    res.status(200).json({ status: "failed", message: e });
  }
  res.end();
});

///////////////////////////get orders///////////////////////////////

app.get("/getmyorders", authtoken, async (req, res) => {
  try {
    const Orderlist = await allorders_db.find({ Owner: req.user.userId });
    res.status(200).json({
      status: "ok",
      orderslist: Orderlist,
    });
  } catch (e) {
    res
      .status(200)
      .json({ status: "failed", message: "internal server error" });
  }
  res.end();
});
///////////////////////s////////Cancel orders/////////////////////////////////

app.get("/deleteorderlistitem/:postid", authtoken, async (req, res) => {
  try {
    let thiscancelitem = await allorders_db.findById(req.params.postid);
    let thiscountupdate = await allproducts_database.findById(
      thiscancelitem.Orederid
    );
    await allproducts_database.findByIdAndUpdate(thiscancelitem.Orederid, {
      rating: {
        rate: thiscountupdate.rating.rate,
        count: parseInt(
          parseInt(thiscountupdate.rating.count) +
            parseInt(thiscancelitem.Totalitems)
        ),
      },
    });
    await allorders_db.findByIdAndDelete(req.params.postid);
    const Orderlist = await allorders_db.find({ Owner: req.user.userId });
    res.status(200).json({
      status: "ok",
      orderslist: Orderlist,
    });
  } catch (e) {
    res
      .status(200)
      .json({ status: "failed", message: "internal server error" });
  }
  res.end();
});
/////////////////////////////////////////////////////////
app.listen(5000, () => {
  console.log("server startes on port 5000");
});

/////////////////////////////////////////////////////////////////////////////////////////////
async function fetchdata() {
  var data = [];
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      data.push(json);
      data.forEach(async (i) => {
        await allproducts_database.create(i);
        return console.log(i);
      });
      //console.log(json);
    });
}
//fetchdata();
