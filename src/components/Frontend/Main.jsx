import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";

const Main = () => {
  return (
    <div className="hero-overlay bg-opacity-60 ">
      <Header></Header>
      <div className="min-h-[calc(100vh-18px)]">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
