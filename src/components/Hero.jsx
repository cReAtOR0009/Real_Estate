import React from "react";
import { achievement1, offers } from "../assets/textAssets";
import {
  hero,
  dreamcircle,
  iconContainer,
  iconContainer1,
  iconContainer2,
  iconContainer3,
} from "../assets/imageImporter";
import "../styles/hero.css"

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
    <header className="">
      <div className="headerSection1">
        <section className="headerLeft">
          <div className="headerTextContainer">
            <h1>Discover Your Dream Property with Estatein</h1>
            <p>
              Your journey to finding the perfect property begins here. Explore
              our listings to find the home that matches your dreams.
            </p>
          </div>
          <div className="headerButtonContainer">
            <button className="blackButton">Learn More</button>
            <button className="colouredButton">Browse Properties</button>
          </div>
          <div className="headerAchievementContainer">
            {achievement1.map((achievement, index) => (
              <AchievementCard key={index} {...achievement} />
            ))}
          </div>
        </section>
        <section className="headerRight">
          <img src={hero} alt="" />
          <div>
            <img src={dreamcircle} alt="" />
          </div>
        </section>
      </div>
      <div className="headerSection2">
        {offers.map((offer, index) => (
          <OffersCard key={index} {...offer} />
        ))}
      </div>
    </header>
  );
};

export default Hero;
