import React from "react";
import "./Navbar.css";
import myntra from "../components/Assets/images/Myntra_logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbarafterlogin() {
  const navigate = useNavigate();

  const logouthandler = () => {
    //console.log(Boolean(localStorage.getItem("token")));
    //alert("you want to logout");
    localStorage.clear();
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    //console.log(Boolean(localStorage.getItem("token")));
  };
  const nologouthandler = () => {
    navigate("/products");
  };
  return (
    <>
      <nav
        class="navbar navbar-expand-sm navbar-dark p-3"
        style={{ background: "white" }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="javascript:void(0)">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={myntra} style={{ width: "50px", height: "40px" }}></img>
            </Link>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
            style={{ background: "rgb(255, 63, 108)" }}
          >
            <span
              class="navbar-toggler-icon "
              style={{ color: "black" }}
            ></span>
          </button>
          <div class="collapse navbar-collapse" id="mynavbar">
            <ul class="navbar-nav me-auto">
              <Link
                to="/products"
                state={{ catageory: "mens" }}
                style={{ textDecoration: "none" }}
              >
                <li class="nav-item" id="hoveffect">
                  <a
                    className="nav-link"
                    href="javascript"
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    MEN
                  </a>
                </li>
              </Link>
              <Link
                to="/products"
                state={{ catageory: "womens" }}
                style={{ textDecoration: "none" }}
              >
                <li class="nav-item" id="hoveffect">
                  <a
                    class="nav-link"
                    href="javascript"
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    WOMEN
                  </a>
                </li>
              </Link>
              <Link
                to="/products"
                state={{ catageory: "jewellery" }}
                style={{ textDecoration: "none" }}
              >
                <li class="nav-item" id="hoveffect">
                  <a
                    class="nav-link"
                    href="javascript"
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    JEWELLERY
                  </a>
                </li>
              </Link>
              <Link
                to="/products"
                state={{ catageory: "ele" }}
                style={{ textDecoration: "none" }}
              >
                <li class="nav-item" id="hoveffect">
                  <a
                    class="nav-link"
                    href="javascript"
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    ELECTRONICS
                  </a>
                </li>
              </Link>
            </ul>
            <form class="d-flex">
              {/* <button
                class="btn me-1"
                type="button"
                style={{ background: "rgb(255, 63, 108)", color: "White" }}
              >
                Login/Signup
              </button> */}
              <input
                class="form-control me-2"
                type="text"
                placeholder="Search Product"
                disabled
              />
            </form>
            {/* THIS is logout modal */}
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    {" "}
                    <img
                      src={myntra}
                      style={{ width: "100px", height: "100px" }}
                    ></img>{" "}
                    <h5
                      class="modal-title"
                      id="staticBackdropLabel"
                      style={{ fontSize: "35px", marginLeft: "10px" }}
                    >
                      Are you sure You want to Logout?
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div className="row">
                        <div className="col-sm">
                          <span>
                            <button
                              type="button"
                              class="btn btn-primary ms-2"
                              data-bs-dismiss="modal"
                              style={{
                                background: "rgb(255, 63, 108)",
                                color: "White",
                              }}
                              onclick={nologouthandler}
                            >
                              Cancel
                            </button>
                          </span>
                          <span>
                            <button
                              type="button"
                              class="btn btn-primary ms-2"
                              data-bs-dismiss="modal"
                              style={{
                                background: "rgb(255, 63, 108)",
                                color: "White",
                              }}
                              onClick={logouthandler}
                            >
                              Proceed
                            </button>
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer"></div>
                </div>
              </div>
            </div>

            {/* This is logout modal */}
            <div
              className="d-flex m-auto ml-0"
              style={{ width: "200px", height: "60px" }}
            >
              <div className="col-4-sm  p-1">
                <span class="fa fa-user" style={{ fontSize: "50px" }}></span>
              </div>
              <div className="col-sm ">
                <div className="d-flex flex-column ">
                  <p
                    style={{
                      fontSize: "20px",
                      left: "0px",
                      fontWeight: "bolder",
                      marginBottom: "0px",
                    }}
                  >
                    Welcome...
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    {localStorage.getItem("username")}
                  </p>
                </div>
              </div>
            </div>
            <ul class="navbar-nav me-2 ">
              <Link
                to="/myorders"
                state={{ catageory: "" }}
                style={{ textDecoration: "none" }}
              >
                <li class="nav-item" id="hoveffect">
                  <a
                    class="nav-link"
                    href="javascript"
                    style={{
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                      paddingBottom: "10px",
                    }}
                  >
                    <span
                      class="fa fa-list-ul"
                      style={{ fontSize: "20px", paddingRight: "6px" }}
                    ></span>
                    MyOrders
                  </a>
                </li>
              </Link>
              <Link
                to="/wishlist"
                state={{ catageory: "" }}
                style={{ textDecoration: "none" }}
              >
                <li class="nav-item" id="hoveffect">
                  <a
                    class="nav-link"
                    href="javascript"
                    style={{
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                      paddingLeft: "5px",
                    }}
                  >
                    <span
                      class="fa fa-heart"
                      style={{ fontSize: "20px", paddingRight: "4px" }}
                    >
                      {" "}
                      <span
                        class="position-absolute top-5 start-95 translate-middle badge rounded-pill "
                        style={{ background: "rgb(255, 63, 108)" }}
                      >
                        {localStorage.getItem("wishlistlength")}
                      </span>
                    </span>
                    Mywish list
                  </a>
                </li>
              </Link>
              <li class="nav-item" id="hoveffect">
                <a
                  class="nav-link"
                  style={{
                    color: "black",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <span
                    class="fa fa-power-off"
                    style={{ fontSize: "20px", paddingRight: "4px" }}
                  ></span>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
