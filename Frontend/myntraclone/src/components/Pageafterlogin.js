import React from "react";
import Navbarafterlogin from "./Navbarafterlogin";
import Carousel from "./Carousel";
import Footer from "./Footer";
import Typewriter from "./Typewriter";
import Navbar from "./Navbar";

export default function Pageafterlogin() {
  return (
    <>
      {Boolean(localStorage.getItem("token")) ? (
        <Navbarafterlogin />
      ) : (
        <Navbar />
      )}
      <Typewriter />
      <Carousel></Carousel>
      <Footer />
    </>
  );
}
