import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Postcard from "./Postcard";
import Navbarafterlogin from "./Navbarafterlogin";
export default function (props) {
  const location = useLocation();
  const thiscatageory = location.state.catageory;
  const [categorystate, setcategorystate] = useState(thiscatageory);
  const [postadata, setpostsdata] = useState([]);
  function Fetchposts() {
    axios
      .get(`http://localhost:5000/products/${thiscatageory}`)
      .then((res) => {
        console.log(res.data);
        setpostsdata(res.data);
      })
      .catch((e) => {
        alert("data not fetched");
      });
  }

  useEffect(
    (e) => {
      Fetchposts();
    },
    [thiscatageory]
  );
  return (
    <>
      {Boolean(localStorage.getItem("token")) ? (
        <Navbarafterlogin />
      ) : (
        <Navbar />
      )}

      <>
        <div className="d-flex">
          <div className="row m-auto">
            {postadata.map((e) => {
              return (
                <Postcard
                  title={e.title}
                  image={e.image}
                  price={e.price}
                  rating={e.rating.rate}
                  availableitems={e.rating.count}
                  description={e.description}
                  mongooseid={e._id}
                />
              );
            })}
          </div>
        </div>
      </>
      <div style={{ float: "bottom" }}>
        <Footer />
      </div>
    </>
  );
}
