import React from "react";
import { footerNav } from "../assets/textAssets";
import { logo, messageIcon, telegramIcon } from "../assets/imageImporter";
import "../styles/footer.css";

const FooterNavCard = ({ title, navigation }) => {
  return (
    <div className="pageNavContainer">
      <p>{title}</p>
      <ul className="footerNavLink">
        {navigation.map((navigation, index) => {
          return (
            <li key={index}>
              <a href={navigation.to}>{navigation.title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="left">
        <div className="logo">
          <img src={logo} alt="company logo" />
        </div>
        <div className="inputText">
          <img className="messageicon" src={messageIcon} alt="send us a message icon" />
          <input type="email" name="" id="" placeholder="Enter your Email" />
          {/* <button> */}
            <img className="telegramicon" src={telegramIcon} alt="send image icon" />
          {/* </button> */}
        </div>
      </div>
      <div className="footerNavContainer">
        {footerNav.map((pageNav, index) => (
          <FooterNavCard key={index} {...pageNav} />
        ))}
      </div>
    </div>
  );
};

export default Footer;
