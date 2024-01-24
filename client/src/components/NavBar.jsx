import React, { useContext, useState } from "react";
import { NavigationContext } from "../context/navigationContext";
import { NavLink, Link } from "react-router-dom";
import { navLinks, companydetails } from "../assets/textAssets";
import { logo, closeButton, openNavButton } from "../assets/imageImporter";
import { styles } from "../styles/styles";

const NavBar = () => {
  const { setNavActive, activeNav } = useContext(NavigationContext);
  const [showNav, setShowNav] = useState(false)

  return (
    <nav className={` bg-Grey-10 `}>
      <div className={`${styles.navContainer} bg-Grey-15 fixed top-0 z-20 w-full flex justify-between items-center p-4`}>
        <a href="/" className="logo">
          <img src={logo} alt={companydetails.title} />
        </a>
        <ul className="hidden py-[10px] sm:flex justify-between items-center space-x-4">
          {navLinks.map((navlink, index) => (
            <li
              key={index}
              className={` ${
                activeNav === navlink.id ? "rounded-[8px] py-[10px] bg-Grey-10 border border-Grey-15" : ""
              }`}
              onClick={() => setNavActive(navlink.id)}
            >
              <Link
                to={navlink.id === "home" ? `/` : navlink.id}
                className="px-[15px] py-[10px] w-[150px] h-[50px] text-center "
              >
                {navlink.title}
              </Link>
            </li>
          ))}
        </ul>
        <button className="hidden sm:flex bg-gray-08 border border-gray-15 rounded p-2">
          Contact
        </button>
        <div onClick={() => setShowNav(true)} className={`${showNav?"hidden":"flex"}`}>
          <img src={openNavButton} alt="open nav" className="flex sm:hidden cursor-pointer" />
        </div>

       { showNav? <div className="w-[200px] font-[20px] fixed top-0 bg-[#a685fa] z-10 right-0 p-[10px] h-[100vh] flex flex-col sm:hidden">
          <div className="flex justify-between items-center">
            <a href="/" className=" flex w-[100px] h-[50px] cursor-pointer">
              <img src={logo} alt={companydetails.title} />
            </a>

            <div className="text-[30px] cursor-pointer" onClick={() => setShowNav(false)}>
              x
            </div>
          </div>

          <ul className="flex flex-col items-flex-start gap-[20px]">
          {navLinks.map((navlink, index) => (
            <li
              key={index}
              className={`w-[150px] my-[10px] text-center  ${
                activeNav === navlink.id ? "rounded-[8px]  bg-Grey-10 border border-Grey-15" : ""
              }`}
              onClick={() =>{ setNavActive(navlink.id), setShowNav(false)}}
            >
              <Link
                to={navlink.id === "home" ? `/` : navlink.id}
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

        </div>: ""}
      </div>
    </nav>
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
        </div>