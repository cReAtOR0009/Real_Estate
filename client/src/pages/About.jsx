import React from "react";
import OffersCard from "../components/smallcomponents/OffersCard";
import { achievement1, offers } from "../assets/textAssets";
import "../styles/hero.css";
import { styles } from "../styles/styles";
import AchievementCard from "../components/smallcomponents/AchievementCard";

const About = () => {
  return (
    <div className="flex mt-[100px] sm:mt-[100px]">
      <div className="flex flex-col sm:flex-row">
        <div>
          <h1 className={`${styles.heading}`}>Our Journey</h1>
          <p className={`${styles.paragraph}`}>
            Our story is one of continuous growth and evolution. We started as a
            small team with big dreams, determined to create a real estate
            platform that transcended the ordinary. Over the years, we've
            expanded our reach, forged valuable partnerships, and gained the
            trust of countless clients.
          </p>
          <div className="headerAchievementContainer">
              {achievement1.map((achievement, index) => (
                <AchievementCard key={index} {...achievement} />
              ))}
            </div>
        </div>
      </div>
      <div>
        <img src="" alt="" />
      </div>
    </div>
  );
};
   
export default About;
