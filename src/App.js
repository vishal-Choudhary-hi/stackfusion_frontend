import React from "react";
import Navbar from "./Components/Navbar";
import InpurForm from "./Components/InpurForm";
import "./App.css";
function App() {
  return (
    <div>
      <Navbar />
      <InpurForm />
      <div className="name">~ Vishal Choudhary</div>
    </div>
  );
}

export default App;
