import React from "react";
import logo from "../images/logo.jfif";
import "./Navbar.css";
function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="Company logo" />
      <h2>Stackfusion Private Limited</h2>
    </div>
  );
}

export default Navbar;
