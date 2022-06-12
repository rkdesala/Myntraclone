import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import myntra from "./Assets/images/Myntra_logo.png";
import Typewriter from "./Typewriter";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registerpage() {
  const [regdetails, setregdetails] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    var userdata = data;
    if (userdata.Password != userdata.Confirmpassword) {
      alert("Passwords are not matching");
    }
    axios
      .post("http://localhost:5000/register", userdata)
      .then((res) => {
        alert(res.data);
        navigate("/");
      })
      .catch((e) => {
        alert("registration Failed");
      });
  };

  return (
    <>
      <Navbar />
      <Typewriter />
      <>
        <div className="row bg-light" style={{ border: "3px pink solid" }}>
          <div className="col-sm bg-light">
            <img
              src={myntra}
              style={{
                margin: "auto",
                width: "350px",
                height: "350px",
                marginTop: "50px",
              }}
            ></img>
          </div>
          <div className="col-sm">
            <h1 style={{ textAlign: "center" }}>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-sm">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      {...register("Firstname", {
                        required: true,
                      })}
                      placeholder="name@example.com"
                      required
                    />
                    <label for="floatingInput">First Name</label>
                  </div>
                </div>
                <div className="col-sm">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      {...register("Lastname", {
                        required: true,
                      })}
                      id="floatingInput"
                      placeholder="name@example.com"
                      required
                    />
                    <label for="floatingInput">Last Name</label>
                  </div>
                </div>
                <div className="row p-0 ms-1">
                  <div className="col-sm">
                    <div class="form-floating mb-3">
                      <input
                        type="email"
                        name="Email"
                        {...register("Email", {
                          required: true,
                        })}
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        required
                      />
                      <label for="floatingInput">Email</label>
                    </div>
                  </div>
                </div>
                <div className="row p-0 ms-1">
                  <div className="col-sm">
                    <div class="form-floating mb-3">
                      <input
                        type="number"
                        {...register("Phone", {
                          required: true,
                          minLength: 10,
                          maxLength: 10,
                        })}
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        required
                      />
                      <label for="floatingInput">Mobile</label>
                      {errors.Phone?.type === "required" && (
                        <p style={{ color: "red" }}>This field is required</p>
                      )}
                      {errors.Phone?.type === "minLength" && (
                        <p style={{ color: "red" }}>This not a valid number</p>
                      )}
                      {errors.Phone?.type === "maxLength" && (
                        <p style={{ color: "red" }}>This not a valid number</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row p-0 ms-1">
                  <div className="col-sm">
                    <div class="form-floating mb-3">
                      <input
                        type="text"
                        {...register("Adress", {
                          required: true,
                        })}
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        required
                      />
                      <label for="floatingInput">Adress</label>
                    </div>
                  </div>
                </div>
                <div className="row p-0 ms-1">
                  <div className="col-sm">
                    <div class="form-floating mb-3">
                      <input
                        type="password"
                        {...register("Password", {
                          required: true,
                          minLength: 10,
                        })}
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        required
                      />
                      <label for="floatingInput">Password</label>
                      {errors.Password?.type === "minLength" && (
                        <p style={{ color: "red" }}>
                          Password should be atleast 10 Characters long
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        {...register("Confirmpassword", {
                          required: true,
                        })}
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        required
                      />
                      <label for="floatingInput">Confirm Password</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm">
                    <input type="checkbox" required />
                    {"      "}
                    <label>Terms and Conditions</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm">
                    <button
                      type="submit"
                      class="btn btn-primary ms-2"
                      data-bs-dismiss="modal"
                      style={{
                        background: "rgb(255, 63, 108)",
                        color: "White",
                      }}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
      <Footer />
    </>
  );
}
