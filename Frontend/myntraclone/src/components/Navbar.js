import React, { useState } from "react";
import "./Navbar.css";
import myntra from "../components/Assets/images/Myntra_logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [logindetails, setlogindetails] = useState({ Email: "", Password: "" });
  const { Email, Password } = logindetails;
  const navigate = useNavigate();
  const changehandler = (e) => {
    setlogindetails({ ...logindetails, [e.target.name]: e.target.value });
  };
  const submithandler = (e) => {
    e.preventDefault();

    if (Email === "" || Password === "") {
      Window.alert("input fields are empty");
    } else {
      axios
        .post("http://localhost:5000/login", logindetails)
        .then((res) => {
          alert(res.data.status);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("wishlistlength", res.data.Wishlistlength);
          //console.log(res.data);
          navigate("/postlogin");
        })
        .catch((e) => {
          console.log();
          alert(e.response.data);
        });
    }

    //console.log(logindetails);
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
            {/* <ul class="navbar-nav me-2 ">
              <li class="nav-item" id="hoveffect">
                <a
                  class="nav-link"
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </a>
              </li>
            </ul> */}
            {/* this is modal */}
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
                      style={{ width: "35px", height: "35px" }}
                    ></img>{" "}
                    <h5
                      class="modal-title"
                      id="staticBackdropLabel"
                      style={{ fontSize: "35px", marginLeft: "10px" }}
                    >
                      Login
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form onSubmit={submithandler}>
                      <div class="form-floating mb-3">
                        <input
                          type="email"
                          name="Email"
                          value={Email}
                          onChange={changehandler}
                          class="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                          required
                        />
                        <label for="floatingInput">Email address</label>
                      </div>
                      <div class="form-floating">
                        <input
                          type="password"
                          name="Password"
                          value={Password}
                          onChange={changehandler}
                          class="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                          required
                        />
                        <label for="floatingPassword">Password</label>
                      </div>
                      <div className="col-sm mt-3">
                        <span style={{ marginLeft: "150px" }}>
                          New to Myntra?
                        </span>
                        <Link to="/register" style={{ textDecoration: "none" }}>
                          <button
                            type="button"
                            class="btn btn-primary ms-2"
                            data-bs-dismiss="modal"
                            style={{
                              background: "rgb(255, 63, 108)",
                              color: "White",
                            }}
                          >
                            Register
                          </button>
                        </Link>{" "}
                        <button
                          type="submit"
                          class="btn btn-primary"
                          data-bs-dismiss="modal"
                          style={{
                            background: "rgb(255, 63, 108)",
                            color: "White",
                            float: "right",
                          }}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer"></div>
                </div>
              </div>
            </div>
            {/* this is modal */}
            <form class="d-flex">
              <button
                class="btn me-1"
                type="button"
                style={{ background: "rgb(255, 63, 108)", color: "White" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Login/Signup
              </button>
              <input
                class="form-control me-2"
                type="text"
                placeholder="Search Product"
                disabled
              />
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
