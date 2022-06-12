import "./App.css";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import Typewriter from "./components/Typewriter";
import Homefullpage from "./components/Homefullpage";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Registerpage from "./components/Registerpage";
import Pageafterlogin from "./components/Pageafterlogin";
import Viewpostitem from "./components/Viewpostitem";
import Fullwishlistpage from "./components/Fullwishlistpage";
import Fullorderslistpage from "./components/Fullorderslistpage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homefullpage />} />
          <Route path="/products" element={<Dashboard />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/postlogin" element={<Pageafterlogin />} />
          <Route path="/postview" element={<Viewpostitem />} />
          <Route path="/wishlist" element={<Fullwishlistpage />} />
          <Route path="/myorders" element={<Fullorderslistpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
