import React, { useContext, useState } from "react";
import { NavigationContext } from "../context/navigationContext";
import { CartContext } from "../context/cartContext";

import { NavLink, Link } from "react-router-dom";
import { navLinks, companydetails } from "../assets/textAssets";
import { logo, closeButton, openNavButton } from "../assets/imageImporter";
import { styles } from "../styles/styles";
import CartItem from "./CartItem";

import { MdOutlineClose } from "react-icons/md";

const ItemContainer = (image, title, quantity) => {
  return <></>;
};

const NavBar = () => {
  const { setNavActive, activeNav } = useContext(NavigationContext);
  const { cart, toggleCart } = useContext(CartContext);
  // console.log("cart: ", cart);
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <nav className={` bg-Grey-10 `}>
        <div
          className={`${styles.navContainer} bg-Grey-15 fixed top-0 z-20 w-full flex justify-between items-center p-4`}
        >
          <a href="/" className="logo">
            <img src={logo} alt={companydetails.title} />
          </a>
          <ul className="hidden py-[10px] sm:flex justify-between items-center space-x-4">
            {navLinks.map((navlink, index) => (
              <li
                key={index}
                className={` ${
                  activeNav === navlink.id
                    ? "rounded-[8px] py-[10px] bg-Grey-10 border border-Grey-15 "
                    : "hover:bg-Grey-10 rounded-[8px] py-[10px]"
                }`}
                onClick={() => setNavActive(navlink.id)}
              >
                <Link
                  to={
                    navlink.id === "home"
                      ? `/`
                      : navlink.id === "login"
                      ? "/login"
                      : navlink.id
                  }
                  className="px-[15px] py-[10px] w-[150px] h-[50px] text-center "
                >
                  {navlink.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-[30px]">
            <button className="hidden sm:flex bg-gray-08 border border-gray-15 rounded p-2">
              <Link to="/contact">Contact</Link>
            </button>

            <button className="relative" onClick={toggleCart}>
              cart{" "}
              <span className="absolute top-[-5px] right-[-5px]">
                {cart.properties.length}
              </span>
              {/* {console.log(cart.properties.length)} */}
            </button>
          </div>
          <div
            onClick={() => setShowNav(true)}
            className={`${showNav ? "hidden" : "flex"}`}
          >
            <img
              src={openNavButton}
              alt="open nav"
              className="flex sm:hidden cursor-pointer"
            />
          </div>

          {showNav ? (
            <div className="w-[200px] font-[20px] fixed top-0 bg-[#a685fa] z-10 right-0 p-[10px] h-[100vh] flex flex-col sm:hidden">
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
                        : "hover: rounded-[8px]  bg-Grey-10 border border-Grey-15"
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
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
      {cart.cartstate && (
        <div className=" z-[100] right-[0px] fixed top-0 bg-[#a685fa] p-[20px] w-[300px] sm:w-[500px] h-[100vh]">
          <MdOutlineClose
            className="cursor-pointer text-[30px]"
            onClick={toggleCart}
          />
          <h1 className="text-center font-semibold uppercase ">
            PROPERTIES ORDER
          </h1>
          {cart.properties.map((property, index) => (
            <CartItem key={index} {...property} />
          ))}

          <div className=" w-full absolute bottom-0 px-5 py-2 grid items-center text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-base font-semibold uppercase">SubTotal</h1>
              <h1 className="text-sm rounded px-1 py-0.5">${}Amount</h1>
            </div>
            <div className="grid items-center gap-2 text-White-90">
              <p className="font-medium text-center text-White-90">
                Taxes and Shipping Will Calculate At Shipping
              </p>
              <button
                type="button"
                className={`${styles.buttonPadding} text-white`}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}
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
