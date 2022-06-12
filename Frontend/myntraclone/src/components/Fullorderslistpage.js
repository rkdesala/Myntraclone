import React from "react";
import Navbar from "./Navbar";
import Navbarafterlogin from "./Navbarafterlogin";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Fullorderslistpage() {
  const [ordersdata, setordersdata] = useState([]);
  const [conststate, setconststate] = useState(true);
  function fetchordersdata() {
    axios
      .get(`http://localhost:5000/getmyorders`, {
        headers: { authtoken: localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === "ok") {
          setordersdata(res.data.orderslist);
          console.log(ordersdata);
        } else if (res.data.status === "failed") {
        }
      })
      .catch((e) => {
        alert("failed fetching orderslist");
      });
  }
  const ordercancelhandler = (idd) => {
    axios
      .get(`http://localhost:5000/deleteorderlistitem/${idd}`, {
        headers: { authtoken: localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === "ok") {
          setordersdata(res.data.orderslist);
          console.log(ordersdata);
        } else if (res.data.status === "failed") {
        }
      })
      .catch((e) => {
        alert(e);
      });
  };
  useEffect(() => {
    fetchordersdata();
  }, [conststate]);

  return (
    <>
      {Boolean(localStorage.getItem("token")) ? (
        <Navbarafterlogin />
      ) : (
        <Navbar />
      )}
      <>
        <div className="col-sm">
          {ordersdata.map((e) => {
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
                    <h4>
                      Order id:{"  "}
                      {e._id}
                    </h4>
                  </div>
                  <div className="col">
                    <h5>
                      Owner:{"  "}
                      {localStorage.getItem("username")}
                    </h5>
                  </div>
                  <div className="col">
                    <h5>
                      <span>
                        Order value:{"  "}
                        {e.Ordervalue}
                        {"  "} $
                      </span>
                      <span style={{ marginLeft: "15px" }}>
                        Orders Quantity {"  "}:{"  "}
                        {e.Totalitems}
                      </span>
                    </h5>
                    <h5>
                      {" "}
                      <span>
                        Order placed:{"  "}
                        {e.date}
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
                    onClick={() => ordercancelhandler(e._id)}
                  >
                    Cancelorder
                  </button>
                  <p>{}</p>
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
