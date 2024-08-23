import React, { useContext, useState,  } from "react";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/auth/authApiSlice.js";
import { NavigationContext } from "../context/navigationContext";
import { CartContext } from "../context/cartContext";
import { logOut } from "../features/auth/authSlice";
import Login from "../pages/Login.jsx";

import { Link } from "react-router-dom";
import { navLinks, companydetails } from "../assets/textAssets";
import { logo, closeButton, openNavButton } from "../assets/imageImporter";
import { styles } from "../styles/styles";
import { FaOpencart } from "react-icons/fa6";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";
import { useSelector } from "react-redux";

import CartList from "./cartList.jsx";

const ItemContainer = (image, title, quantity) => {
  return <></>;
};

const NavBar = () => {
  const { setNavActive, activeNav } = useContext(NavigationContext);
  const { cart, toggleCart } = useContext(CartContext);
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  // console.log("cart: ", cart);
  const [showNav, setShowNav] = useState(false);
  const dispatch = useDispatch();
  const [logout, { isLoading, isError, isSuccess }] = useLogoutMutation();

  const handleAuthClick = async() => {
    if (token) {
      try {
        await logout().unwrap();
        // Handle successful logout (e.g., redirect to login page)
        dispatch(logOut());
      } catch (err) {
        // Handle error during logout
        console.error('Failed to logout:', err);
      }
    } else {
        // Navigate to login page
        // navigate('/login');
        return <Login />
    }
  }

  return (
    <>
      <nav className={` bg-Purple-75 `}>
        <div
          className={`${styles.navContainer} bg-Purple-75 fixed top-0 z-20 w-full flex justify-between items-center p-4`}
        >
          <a href="/" className="logo w-[150px] md:min-w-[150px] lg:[200px]">
            <img src={logo} alt={companydetails.title} />
          </a>
          <ul className="hidden py-[10px] md:flex justify-between items-center max-lg:space-x-2  space-x-4">
            {navLinks.map((navlink, index) => (
              <li
                key={index}
                className={` text-nowrap max-lg:text-[15px] px-[10px]  md:py-[5px] lg:px-[15px]  lg:py-[10px] ${
                  activeNav === navlink.id
                    ? "rounded-[8px]   bg-Grey-10 border border-Grey-15 "
                    : "hover:bg-Grey-10 rounded-[8px] "
                }`}
                onClick={() => setNavActive(navlink.id)}
              >
                <Link
                  to={
                    navlink.id === "home"
                      ? `/`
                      : navlink.id === "login"
                      ? "/login"
                      // : !token
                      // ? "/login"
                      : navlink.id
                  }
                  className="  text-center "
                >
                  
                  {navlink.title === "Login" ? (
                <button onClick={handleAuthClick} disabled={isLoading}>
                    {token ? "Logout" : "Login"}
                </button>
            ) : (
                navlink.title
            )}
                  
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-[30px]">
            <button className="hidden sm:flex bg-gray-08 border border-gray-15 rounded p-2">
              <Link to="/contact">Contact</Link>
            </button>

            <button className="relative" onClick={toggleCart}>
              <FaOpencart size={20} />
              <span className="absolute top-[-10px] right-[-10px]">
                {cart.properties.length}
              </span>
              {/* {console.log(cart.properties.length)} */}
            </button>
          </div>
          <div
            onClick={() => setShowNav(true)}
            className={`flex md:hidden ${showNav ? "hidden" : "flex"}`}
          >
            <img
              src={openNavButton}
              alt="open nav"
              className="flex md:hidden cursor-pointer"
            />
          </div>

          {showNav ? (
            <div className="w-[200px] font-[20px] fixed top-0 bg-[#a685fa] z-10 right-0 p-[10px] h-[100vh] flex flex-col md:hidden">
              <div className="flex justify-between items-center">
                <a href="/" className=" flex w-[100px] h-[50px] cursor-pointer">
                  <img src={logo} alt={companydetails.title} />
                </a>

                <div
                  className="text-[30px] cursor-pointer"
                  onClick={() => setShowNav(false)}
                >
                  x
                </div>
              </div>

              <ul className="flex flex-col items-flex-start gap-[20px]">
                {navLinks.map((navlink, index) => (
                  <li
                    key={index}
                    className={`w-[150px] my-[10px] text-center  ${
                      activeNav === navlink.id
                        ? "rounded-[8px]  bg-Grey-10 border border-Grey-15"
                        : "hover:rounded-[8px]  hover:bg-Grey-10  hover:border-Grey-15 outline-none"
                    }`}
                    onClick={() => {
                      setNavActive(navlink.id), setShowNav(false);
                    }}
                  >
                    <Link
                      to={
                        navlink.id === "home"
                          ? `/`
                          : navlink.id === "login"
                          ? "/login"
                          : navlink.id
                      }
                      className="w-[100%] h-[100%] leading-[50px] px-[10px] block text-gray-700"
                    >
                      {navlink.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <button className="bg-gray-08 border border-gray-15 rounded p-2">
                Contact
              </button>
              <div className="self-center my-auto">

              <button className="relative self-end w-auto" onClick={toggleCart}>
              <FaOpencart size={30} />
              <span className="absolute top-[-10px] right-[-10px]">
                {cart.properties.length}
              </span>
              {/* {console.log(cart.properties.length)} */}
            </button>
              </div>

            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
      {/* {console.log("cartstate from nav", cart.cartstate)} */}
      {cart.cartstate && <CartList />}
    </>
  );
};

export default NavBar;

<div className="adverts">
  <div></div>
  <div className="smallText1">
    <p>✨Discover Your Dream Property with Estatein</p>
    <a href="">
      <button>Learn More</button>
    </a>
  </div>
  <div>
    <img src={closeButton} alt="close button" />
  </div>
</div>;
