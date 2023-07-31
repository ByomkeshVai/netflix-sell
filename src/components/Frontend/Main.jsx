import React, { useContext } from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import { ThemeContext } from "../../providers/ThemeContext";
import { useState } from "react";

import Preloader from "../Shared/Preloader";

const Main = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const themeClass = darkMode ? "dark" : "light";

  const [loading, setLoading] = useState(true);

  // Simulate an API call or other data loading process
  // to set the loading state to false after 3 seconds
  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className={`bg-${themeClass}-background text-${themeClass}-text`}>
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode}></Header>
          <div className="min-h-[calc(100vh-68px)]">
            <Outlet />
          </div>
          <Footer></Footer>
        </div>
      )}
    </>
  );
};

export default Main;
