import React, { useState, useEffect, useContext } from "react";
import { NavigationContext } from "../context/navigationContext";
import { NavLink, Link } from "react-router-dom";
import { navLinks, companydetails } from "../assets/textAssets";
import { logo, closeButton } from "../assets/imageImporter";
import "../styles/nav.css"

const NavBar = () => {
  const { setNavActive, activeNav, setActiveNav } = useContext(NavigationContext);

  return (
    <>
      <nav>
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
        {/* <div style={{ backgroundColor: `var(--greyShade0)` }}> */}
        <div className="navigation">
          <Link to="/" className="logo">
            <img src={logo} alt={companydetails.title} />
          </Link>
          <ul>
            {navLinks.map((navlink, index) => {
              return (
                <li
                  key={index}
                  className={`navItem ${
                    activeNav == navlink.id ? "activeNav" : ""
                  }`}
                  onClick={() => setNavActive(navlink.id)}
                >
                  <Link to={navlink.id === "home" ? `/` : navlink.id}>
                    {navlink.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button className="ContactBtn activeNav">Contact</button>
        </div>
        {/* </div> */}
      </nav>
    </>
  );
};

export default NavBar;
