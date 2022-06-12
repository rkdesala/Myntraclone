import React from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Footer from "./Footer";
import Typewriter from "./Typewriter";
import Navbarafterlogin from "./Navbarafterlogin";
import one from "../components/Assets/images/footermen1.jpg";
import two from "../components/Assets/images/footermen2.jpg";
import three from "../components/Assets/images/footerwomen3.jpg";
import four from "../components/Assets/images/footerjewellery4.jpg";

export default function Homefullpage() {
  return (
    <>
      {Boolean(localStorage.getItem("token")) ? (
        <Navbarafterlogin />
      ) : (
        <Navbar />
      )}
      <Typewriter />
      <Carousel />
      <>
        <hr></hr>
        <div className="row mt-5 mb-5 ms-1 me-1">
          <div className="col-sm p-2 m-1" style={{ border: "3px gray solid" }}>
            <img src={one} style={{ width: "250px", height: "250px" }}></img>
            <h3>MENS FORMAL WEAR</h3>
          </div>
          <div className="col-sm p-3 m-1" style={{ border: "3px gray solid" }}>
            <img src={two} style={{ width: "250px", height: "250px" }}></img>
            <h3>MENS WEAR</h3>
          </div>
          <div className="col-sm p-3 m-1" style={{ border: "3px gray solid" }}>
            <img src={three} style={{ width: "250px", height: "250px" }}></img>
            <h3>WOMENS WEAR</h3>
          </div>
          <div className="col-sm p-3 m-1" style={{ border: "3px gray solid" }}>
            <img src={four} style={{ width: "250px", height: "250px" }}></img>
            <h3>JEWELLERY ITEMS</h3>
          </div>
        </div>
        <hr></hr>
      </>
      <Footer />
    </>
  );
}
