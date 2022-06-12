import React from "react";
import myntra from "../components/Assets/images/Myntra_logo.png";
import mens from "../components/Assets/images/MEN.jpg";
import women from "../components/Assets/images/women.jpg";
import jewelary from "../components/Assets/images/jewelery.jpg";
import { Link } from "react-router-dom";
export default function () {
  const clickhandler = () => {
    alert("you clicked image");
  };
  return (
    <>
      <div id="demo" class="carousel slide bg-dark" data-bs-ride="carousel">
        {/* <!-- Indicators/dots --> */}
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="0"
            class="active"
          ></button>
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="2"
          ></button>
        </div>

        {/* <!-- The slideshow/carousel --> */}
        <div class="carousel-inner" style={{ height: "500px" }}>
          {/* <div class="carousel-item active">
            <img
              src={myntra}
              alt="Los Angeles"
              class="d-block w-50 m-auto"
              style={{ height: "500px" }}
            />
          </div> */}
          <div class="carousel-item active">
            <Link
              to="/products"
              state={{ catageory: "mens" }}
              style={{ textDecoration: "none" }}
            >
              {" "}
              <img
                src={mens}
                alt="Chicago"
                class="d-block w-100 m-auto"
                style={{ height: "500px" }}
              />
            </Link>
            <div class="carousel-caption">
              <div className="col" style={{ float: "right" }}>
                <h1>Mens Wear</h1>
                <h2>Flat 30% off on All Mens wear</h2>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <Link
              to="/products"
              state={{ catageory: "womens" }}
              style={{ textDecoration: "none" }}
            >
              <img
                src={women}
                alt="New York"
                class="d-block w-100"
                style={{ height: "500px" }}
              />
            </Link>
          </div>
          <div class="carousel-item">
            <Link
              to="/products"
              state={{ catageory: "jewellery" }}
              style={{ textDecoration: "none" }}
            >
              <img
                src={jewelary}
                alt="New York"
                class="d-block w-100"
                style={{ height: "500px" }}
              />
            </Link>
            <div class="carousel-caption">
              <h2>Jewellery</h2>
              <h4>Flat 20% off on All Jewellery items</h4>
            </div>
          </div>
        </div>

        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </>
  );
}
