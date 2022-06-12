import React from "react";

export default function Footer() {
  return (
    <>
      <div className="row bg-light">
        <div className="col-sm">
          <div className="d-flex flex-column">
            <div className="col-sm">
              <p
                style={{
                  color: "black",
                  fontSize: "20px",
                  fontWeight: "bolder",
                }}
              >
                ONLINE SHOPPING
              </p>
              <p> MEN</p>
              <p> WOMEN</p>
              <p> JEWLERY</p>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="d-flex flex-colum">
            <div className="col-12">
              <p
                style={{
                  color: "black",
                  fontSize: "20px",
                  fontWeight: "bolder",
                }}
              >
                Stay connected with us
              </p>
              <p style={{ marginTop: "10px", textAlign: "center" }}>
                <i
                  class="fa fa-youtube"
                  style={{ fontSize: "25px", color: "gray", padding: "8px" }}
                ></i>
                <i
                  class="fa fa-facebook"
                  style={{ fontSize: "25px", color: "gray", padding: "8px" }}
                ></i>
                <i
                  class="fa fa-instagram"
                  style={{ fontSize: "25px", color: "gray", padding: "8px" }}
                ></i>
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="d-flex flex-colum">
            <div className="col-12">
              <p
                style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
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
  );
}
