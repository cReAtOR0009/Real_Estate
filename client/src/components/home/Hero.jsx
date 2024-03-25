import React from "react";
import { achievement1, offers } from "../../assets/textAssets";
import {
  hero,
  dreamcircle,
  iconContainer,
  iconContainer1,
  iconContainer2,
  iconContainer3,
} from "../../assets/imageImporter";
import { PropertyContext } from "../../context/PropertiesContext";
import OffersCard from "../smallcomponents/OffersCard";
import AchievementCard from "../smallcomponents/AchievementCard";
import "../../styles/hero.css";
import { styles } from "../../styles/styles";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../features/auth/authSlice";

const Hero = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  return (
    <>
      <header
        id="hero"
        className={`${styles.homeheader} mt-[100px] sm:mt-[100px] `}
      >
        <div
          className={`  bg-Purple relative flex sm:flex-nowrap flex-wrap justify-center gap-[20px]`}
        >
          <section className="mt-[30px]">
            <div className="headerTextContainer">
              <h1 className={`${styles.heading} `}>
                Discover Your Dream Property with Estatein{user}
              </h1>
              <p>{token?.slice(180)}</p>
              <p>
                Your journey to finding the perfect property begins here.
                Explore our listings to find the home that matches your dreams.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-[20px] my-[60px]">
              <button
                className={`${styles.buttonPadding} ${styles.blackButton}`}
              >
                Learn More
              </button>
              <button
                className={`${styles.buttonPadding} ${styles.purpleButton}`}
              >
                <Link to={"/properties"}>Browse Properties</Link>
              </button>
            </div>
            <div className="headerAchievementContainer">
              {achievement1.map((achievement, index) => (
                <AchievementCard key={index} {...achievement} />
              ))}
            </div>
          </section>
          <section className="headerRight ">
            <img src={hero} alt="" />
            <div>
              <img src={dreamcircle} alt="" />
            </div>
          </section>
        </div>
      </header>
      <div className=" headerSection2">
        {offers.map((offer, index) => (
          <OffersCard key={index} {...offer} />
        ))}
      </div>
    </>
  );
};

export default Hero;
