import React, { useContext } from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import { ThemeContext } from "../../providers/ThemeContext";

const Main = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const themeClass = darkMode ? "dark" : "light";
  return (
    <div className={`bg-${themeClass}-background text-${themeClass}-text`}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode}></Header>
      <div className="min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
