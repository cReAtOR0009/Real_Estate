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
import "../../styles/hero.css"
import { styles } from "../../styles/styles";

const AchievementCard = ({ numbers, title }) => {
  return (
    <div className="achievementsCard">
      <div>
        <h2 className="fontWeight2">{`${
          numbers > 1000 ? numbers / 1000 + "K" : numbers + "+"
        }`}</h2>
      </div>
      <p className="greyText smallText2">{title}</p>
    </div>
  );
};

const OffersCard = ({ offer, icon, icon2 }) => {
  return (
    <div className="headerSection2Card">
      <div>
        <img src={icon} alt="" />
      </div>
      <p>{offer}</p>
      <img src={icon2} alt="" />
    </div>
  );
};

const Hero = () => {
  return (
    <>
    <header id="hero" className={`${styles.homeheader}`}>
    <div className={`  bg-Purple relative flex sm:flex-nowrap flex-wrap justify-center gap-[20px]  mt-[100px] sm:mt-[100px] `}>
        <section className="mt-[70px]">
          <div className="headerTextContainer">
            <h1 className={`${styles.heading} `}>Discover Your Dream Property with Estatein</h1>
            <p>
              Your journey to finding the perfect property begins here. Explore
              our listings to find the home that matches your dreams.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm: gap-[20px] my-[60px]">
            <button className={`${styles.buttonPadding} ${styles.blackButton}`}>Learn More</button>
            <button className={`${styles.buttonPadding} ${styles.purpleButton}`}>Browse Properties</button>
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
