import React from "react";
import Navbarafterlogin from "./Navbarafterlogin";
import Typewriter from "./Typewriter";
import Footer from "./Footer";
import axios from "axios";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

export default function Fullwishlistpage() {
  const [wishlishdata, setwishlistdata] = useState([]);
  const [conststate, setconststate] = useState(true);
  function fetchwishlistdata() {
    axios
      .get(`http://localhost:5000/getwishlist`, {
        headers: { authtoken: localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === "ok") {
          //alert("added to wishlist");
          setwishlistdata(res.data.wishlist);
          console.log(wishlishdata);
          localStorage.setItem("wishlistlength", res.data.wishlist.length);
        } else if (res.data.status === "failed") {
          alert(res.data.message);
        }
      })
      .catch((e) => {
        alert("failed fetching wishlist");
      });
  }

  const wishlistdeletehandler = (idd) => {
    axios
      .get(`http://localhost:5000/deletewishlistitem/${idd}`, {
        headers: { authtoken: localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === "ok") {
          alert("This item removed from wishlist");
          setwishlistdata(res.data.wishlist);
          //setconststate(!conststate);
          console.log(wishlishdata);
          localStorage.setItem("wishlistlength", res.data.wishlist.length);
        } else if (res.data.status === "failed") {
          alert("failed removing this item from wishlist");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(
    (e) => {
      fetchwishlistdata();
    },
    [conststate]
  );

  return (
    <>
      {Boolean(localStorage.getItem("token")) ? (
        <Navbarafterlogin />
      ) : (
        <Navbar />
      )}
      <>
        <div className="col-sm">
          {wishlishdata.map((e) => {
            return (
              <div
                className="row mt-3"
                style={{
                  border: "3px rgb(255, 63, 108) solid",
                  width: "80%",
                  margin: "auto",
                }}
              >
                <div className="col-sm">
                  <div className="col">
                    <img
                      src={e.image}
                      style={{ width: "100px", height: "100px", float: "left" }}
                    />
                  </div>
                  <div className="col">
                    <h5>{e.title}</h5>
                  </div>
                  <div className="col">
                    <h5>
                      <span>⭐{e.rating.rate}</span>
                      <span style={{ marginLeft: "15px" }}>
                        Price: {"  "}$:{"  "}
                        {e.price}
                      </span>
                    </h5>
                  </div>
                </div>
                <div className="col-sm mt-3">
                  <button
                    type="button"
                    class="btn btn-primary ms-2"
                    style={{
                      background: "rgb(255, 63, 108)",
                      color: "White",
                    }}
                    onClick={() => wishlistdeletehandler(e._id)}
                  >
                    Remove
                  </button>
                  <p>{e._id}</p>
                </div>
              </div>
            );
          })}
        </div>
      </>

      <Footer />
    </>
  );
}
