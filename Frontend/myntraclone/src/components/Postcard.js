import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import "./Postcard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Postcard(props) {
  const navigate = useNavigate();

  const loginstatusreminder = () => {
    alert("Please longin to wishlist this item..");
  };

  const addtowishlisthandler = (idd) => {
    const Token = localStorage.getItem("token");
    console.log("this is token");
    console.log(Token);
    axios
      .get(`http://localhost:5000/addtowishlist/${idd}`, {
        headers: {
          authtoken: Token,
        },
      })
      .then((res) => {
        if (res.data.status === "failed") {
          alert("This item is already in your wishlist");
        } else if (res.data.status === "added") {
          alert("Item added to to wishlist");
          localStorage.setItem("wishlistlength", res.data.Wishlistlength);
        }
      })
      .catch((e) => {
        //alert(e);
      });
  };
  return (
    <div className="col-sm-3 mt-2">
      <div class="card m-auto" style={{ width: "18rem", height: "350px" }}>
        {" "}
        <img
          src={props.image}
          class="card-img-top m-auto"
          alt="..."
          style={{ width: "100px", height: "150px", textAlign: "center" }}
        />
        <div class="card-body">
          <div className="d-flex flex-column">
            <div className="p-0">
              <h5
                class="card-title"
                style={{ fontSize: "12px", textAlign: "left" }}
              >
                {props.title}
              </h5>
            </div>
            <div className="p-0">
              <p style={{ textAlign: "left" }}>
                <span>⭐{props.rating}</span>
                <span></span>
              </p>
              <p style={{ textAlign: "left" }}>
                <span>Price: ${props.price}</span>
              </p>
            </div>
          </div>

          <p class="card-text"></p>

          {Boolean(localStorage.getItem("token")) ? (
            <button
              type="submit"
              href="#"
              class="btn btn-danger me-2"
              onClick={() => addtowishlisthandler(props.mongooseid)}
            >
              wishlist item
            </button>
          ) : (
            <button
              type="submit"
              href="#"
              class="btn btn-danger me-2"
              onClick={loginstatusreminder}
            >
              wishlist item
            </button>
          )}

          <Link
            to="/postview"
            state={{ postmongooseid: props.mongooseid }}
            style={{ textDecoration: "none" }}
          >
            <button href="#" class="btn btn-danger ">
              view
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
