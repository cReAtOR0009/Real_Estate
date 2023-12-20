import React, { useState } from "react";
import { navLinks, companydetails } from "../assets/textAssets";
import { logo, closeButton } from "../assets/imageImporter";

export const NavBar = () => {
  const [activeNav, setActiveNav] = useState("home");
  return (
    <>
      <nav>
        <div className="adverts">
            <div></div>
          <div className="smallText1">
            <p>
            ✨Discover Your Dream Property with Estatein
            </p>
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
          <div className="logo">
            <img src={logo} alt={companydetails.title} />
          </div>
          <ul>
            {navLinks.map((navlink, index) => {
              return (
                <li
                  key={index}
                  className={`navItem ${
                    activeNav == navlink.id ? "activeNav" : ""
                  }`}
                  onClick={() => setActiveNav(navlink.id)}
                >
                  {navlink.title}
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
