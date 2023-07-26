import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useCustomer from "../../../hooks/useCustomer";
import { RiSunLine, RiMoonLine } from "react-icons/Ri";
import logo from "../../../assets/main.png";
import useSelect from "../../../hooks/useSelect";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const Header = ({ toggleDarkMode, darkMode }) => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isCustomer] = useCustomer();
  const [select] = useSelect();

  const priceData = select?.map((select) => parseInt(select.price));

  const totalSum = priceData.reduce((acc, price) => {
    const priceInt = parseFloat(price, 10);
    return isNaN(priceInt) ? acc : acc + priceInt;
  }, 0);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };
  const Icon = darkMode ? RiSunLine : RiMoonLine;
  const [isOpen, setIsOpen] = useState(false);
  const Navbar = (
    <>
      <li class="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
        <Link to="">Streaming</Link>
      </li>
      <li class="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
        <Link to="">Air Ticket</Link>
      </li>
      <li class="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
        <Link to="">About</Link>
      </li>
      <li class="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
        <Link to="">Contact</Link>
      </li>
    </>
  );
  return (
    <header className="relative z-50 bg-gradient-to-r to-transparent  mx-auto  font-bold  ">
      <div className="container flex items-center max-w-screen-2xl mx-auto lg:h-16 h-12  lg:p-6 lg:py-10">
        <div class="navbar ">
          <div class="navbar-start">
            <div class="dropdown">
              <label tabindex="0" class="btn btn-ghost lg:hidden">
                <svg
                  onClick={() => setIsOpen((isOpen) => !isOpen)}
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <motion.nav
                animate={isOpen ? "open" : "closed"}
                variants={variants}
              >
                <ul
                  tabindex="0"
                  class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {Navbar}
                </ul>
              </motion.nav>
            </div>
            <Link to="/">
              <div className="mr-auto md:w-48 flex-shrink-0">
                <img className="lg:h-36 lg:mt-[20px] mt-[10px]" src={logo} alt="" />
              </div>
            </Link>
          </div>
          <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">{Navbar}</ul>
          </div>
          <div class="navbar-end">
            <div className="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
              <a className="font-bold md:text-xl" href="tel:+880 9638 882345">
                +880 9638 882345
              </a>
              <span className="font-semibold text-sm text-gray-400">
                Support 24/7
              </span>
            </div>
            <div>
              <button className="ml-14" onClick={toggleDarkMode}>
                <Icon size={26} />
              </button>
            </div>
            <ul className="ml-4 xl:w-48 flex items-center justify-end">
              <li className="ml-2 lg:ml-4 relative inline-block">
                {isAdmin ? (
                  <Link className="" to="/admin/dashboard">
                    <img
                      className="h-14 w-14 lg:h-14 p-2 rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                  </Link>
                ) : isCustomer ? (
                  <Link className="" to="/customer/dashboard">
                    <img
                      className="h-14 w-14 lg:h-14 p-2 rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link className="" to="/login">
                    <svg
                      className="h-9 lg:h-10 p-2 text-gray-500 svg-inline--fa fa-user fa-w-14 fa-9x"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="user"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
                      ></path>
                    </svg>
                  </Link>
                )}
              </li>
              <Link to="/customer/dashboard/selected">
                <li className="ml-2 lg:ml-4 relative inline-block">
                  <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">
                    {select?.length || 0}
                  </div>
                  <svg
                    className="h-9 lg:h-10 p-2 text-gray-500 svg-inline--fa fa-shopping-cart fa-w-18 fa-9x"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="shopping-cart"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
                    ></path>
                  </svg>
                </li>
              </Link>
            </ul>
          </div>
          <Link to="/customer/dashboard/selected">
            <div className="ml-4 hidden sm:flex flex-col font-bold flex">
              <span className="text-xs text-gray-400">Your Cart</span>

              <span>৳{totalSum}</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
