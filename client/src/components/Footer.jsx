import React from "react";
import { Link, NavLink } from "react-router-dom";
import { footerNav } from "../assets/textAssets";
import { logo, messageIcon, telegramIcon } from "../assets/imageImporter";
import { socialHandles } from "../assets/textAssets";
import "../styles/footer.css";
import { styles } from "../styles/styles";

import PropertyForm from "./form/PropertyForm";

const FooterNavCard = ({ title, navigation }) => {
  return (
    <div className={`${styles.paragraph} pageNavContainer`}>
      <p className="text-[20px]">{title}</p>
      <ul className="footerNavLink">
        {navigation.map((navigation, index) => {
          return (
            <li key={index}>
              <a
                href={
                  title.toLowerCase() !== "home"
                    ? `/${title.toLowerCase()}/#${navigation.to}`
                    : `/#${navigation.to}`
                }
              >
                {navigation.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <>
      <div
        className={`${styles.TextContainer} flex flex-wrap  gap-[10px] justify-center `}
      >
        <div className="left max-w-[100vw]">
          <div className="logo ">
            <img className="w-[150px]" src={logo} alt="company logo" />
          </div>
          <div className="inputText ">
            <img
              className="messageicon"
              src={messageIcon}
              alt="send us a message icon"
            />
            <input
              className="border border-solid border-Grey-50"
              type="email"
              name=""
              id=""
              placeholder="Enter your Email"
            />
            {/* <button> */}
            <img
              className="telegramicon cursor-pointer"
              src={telegramIcon}
              alt="send image icon"
            />
            {/* </button> */}
          </div>
        </div>
        <div className="footerNavContainer">
          {footerNav.map((pageNav, index) => (
            <FooterNavCard key={index} {...pageNav} />
          ))}
        </div>
      </div>

      <div
        className={`flex flex-nowrap md:flex-wrap md:flex-row flex-col-reverse  justify-between px-[16px] md:px-[80px] lg:px-[100px] py-[10px] md:py-[12px] lg:py-[12px] bg-Grey-10`}
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-[20px]">
          <p>@2023 _creator. All Rights Reserved.</p>
          <p>Terms & Conditions</p>
        </div>
        <div className="flex justify-center gap-[20px]">
          {socialHandles.map((handle, index) => (
            <Link
              key={index}
              to={handle.link}
              className="w-[auto] h-[auto] p-[10px] rounded-[50%] bg-Grey-08"
            >
              <img src={handle.icon} alt="" className="w-[20px] h-[auto]" />
            </Link>
          ))}
        </div>
      </div>
      {/* <PropertyForm /> */}
    </>
  );
};

export default Footer;
