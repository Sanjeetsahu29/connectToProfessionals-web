import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <Navbar />
      {/* any children routes of body will render here */}
      <Outlet />
    </div>
  );
};

export default Body;
