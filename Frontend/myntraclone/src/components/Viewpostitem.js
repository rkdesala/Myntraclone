import React from "react";
import Navbar from "./Navbar";
import Navbarafterlogin from "./Navbarafterlogin";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Typewriter from "./Typewriter";
import myntra from "./Assets/images/Myntra_logo.png";
import { Link } from "react-router-dom";

export default function Viewpostitem() {
  const [placeorder, setplaceorder] = useState({
    Totalitems: 1,
    Ordervalue: 0,
  });
  const { Totalitems, Ordervalue } = placeorder;
  const location = useLocation();
  const thispostmongooseid = location.state.postmongooseid;
  const [thispoststate, setthispoststate] = useState(thispostmongooseid);
  const [postdata, setpostsdata] = useState({});
  const [ratecount, setratecount] = useState({});
  const [pocount, setcount] = useState({ rate: 0, count: 0 });
  const { rate, count } = pocount;
  function Fetchpost() {
    axios
      .get(`http://localhost:5000/getsinglepost/${thispostmongooseid}`)
      .then((res) => {
        console.log(res.data.rating.rate);
        setcount(res.data.rating);
        setpostsdata(res.data);
      })
      .catch((e) => {
        alert("data not fetched buddy");
      });
  }

  const orderchengehandler = (e) => {
    setplaceorder({ ...placeorder, [e.target.name]: e.target.value });
  };
  /////////////////////////////////////////
  const ordersubmithandler = (e) => {
    e.preventDefault();
    if (count > Totalitems) {
      const sendorder = {
        Totalitems: Totalitems,
        Ordervalue: postdata.price * Totalitems,
      };
      axios
        .post(
          `http://localhost:5000/placeorder/${thispostmongooseid}`,
          sendorder,
          {
            headers: { authtoken: localStorage.getItem("token") },
          }
        )
        .then((res) => {
          if (res.data.status === "ok") {
            alert("order placed Succesfully.Go to orders list");
          } else if (res.data.status === "failed") {
            alert("order not placed..please retry");
          }
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      alert("Order quantity is exceeding available quantity");
    }
  };
  useEffect(
    (e) => {
      Fetchpost();
    },
    [thispoststate]
  );
  return (
    <>
      {Boolean(localStorage.getItem("token")) ? (
        <Navbarafterlogin />
      ) : (
        <>
          <Navbar />
          <Typewriter />
        </>
      )}
      <hr></hr>
      <>
        {/* ///This is order maodal */}
        <div
          class="modal fade"
          id="orderBackdrop"
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
                  style={{
                    width: "100px",
                    height: "100px",
                    marginLeft: "180px",
                  }}
                ></img>{" "}
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h5>{postdata.title}</h5>
                <h6 style={{ float: "left" }}>⭐{rate}</h6>
                <img
                  src={postdata.image}
                  style={{ width: "250px", height: "250px" }}
                ></img>
              </div>
              <div class="modal-body">
                <form onSubmit={ordersubmithandler}>
                  <h5 style={{ float: "left" }}>Please select Quantity</h5>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    name="Totalitems"
                    value={Totalitems}
                    onChange={orderchengehandler}
                    required
                  >
                    <selected value="">Quantity</selected>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <div className="col-sm">
                    <p>Order value:{"  "}</p>
                    <h4>
                      {parseFloat(postdata.price * Totalitems).toFixed(2)}
                      {"  "}$ only
                    </h4>
                  </div>
                  <div className="col-sm mt-3">
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
                      Place order
                    </button>
                  </div>
                </form>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>

        {/* This is logout modal */}
        <div className="row mt-5">
          <div
            className="col-sm"
            style={{ marginBottom: "20px", borderRight: "3px pink solid" }}
          >
            <img
              src={postdata.image}
              style={{ width: "500px", height: "500px" }}
            />
          </div>
          <div className="col-sm">
            <div className="d-flex flex-column ">
              <div className="col-sm">
                <h5 style={{ float: "left" }}>{postdata.title}</h5>
              </div>
              <div className="col-sm mt-2">
                <p style={{ fontWeight: "bold", float: "left" }}>
                  <span>⭐{rate}</span>
                  <span style={{ marginLeft: "12px" }}>Items Left:{count}</span>
                </p>
              </div>
              <div className="col-sm" style={{ marginTop: "250px" }}>
                <h4>Price.${postdata.price}</h4>
              </div>
              <div className="col-sm">
                {localStorage.getItem("token") ? (
                  <button
                    class="btn btn-danger me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#orderBackdrop"
                  >
                    Buy
                  </button>
                ) : (
                  <button
                    class="btn btn-danger me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#orderBackdrop"
                    disabled
                  >
                    Login to Buy
                  </button>
                )}

                <button type="submit" class="btn btn-danger me-2" disabled>
                  Add to Bag
                </button>
              </div>
              <div className="col-sm">
                <h6>Description:{postdata.description}</h6>
              </div>
              <div className="col-sm">
                <p
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  100% ORIGINAL
                </p>
                <p style={{ textAlign: "center" }}>
                  Guarantee for all products at myntra.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
      <hr></hr>
      <Footer></Footer>
    </>
  );
}
