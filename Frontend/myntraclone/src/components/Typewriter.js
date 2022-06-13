import React from "react";
import {
  Typewriter,
  handleDone,
  handleType,
  useTypewriter,
} from "react-simple-typewriter";
import myntra from "../components/Assets/images/Myntra_logo.png";
//import "react-simple-typewriter/dist/index.css";

export default function () {
  const { text } = useTypewriter({
    words: [
      "Flat 30% off on Mens wear",
      "Flat 20% off on Womens wear",
      "Flat 20% off on All Jewellery Items",
      "Flat 50% off on All Electronics Purchase",
    ],
    cursor: true,
    cursorStyle: "!",
    loop: 0,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });
  return (
    <>
      <div className="col-sm">
        <h1>Welcome to Myntraclone</h1>
        <p>
          <span>
            <img src={myntra} style={{ width: "50px", height: "40px" }}></img>
          </span>
          <span> {text}</span>
        </p>
      </div>
    </>
  );
}
