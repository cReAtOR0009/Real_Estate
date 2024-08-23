import React from "react";
import OffersCard from "../components/smallcomponents/OffersCard";
import {
  achievement1,
  Aboutvalues,
  AboutAchivements,
  AboutExperience,
} from "../assets/textAssets";
import { about1 } from "../assets/imageImporter";
import "../styles/hero.css";
import { styles } from "../styles/styles";
import AchievementCard2 from "../components/smallcomponents/AchievementCard";
import Journey from "../components/smallcomponents/AboutPage/Journey";

const Hero = () => {
  return (
    <div className={`${styles.topContainer} flex flex-wrap md:flex-nowrap`}>
      <div className="flex-1 flex flex-col justify-around order-2 sm:order-1">
        <Journey
          paragraphText={
            "Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the  trust of countless clients."
          }
          HeaderText={"Our Journey"}
        />
        <div className="flex justify-between flex-wrap sm:flex-nowrap gap-4 sm:gap-8 xl:gap-12">
          {achievement1.map((achievement, index) => (
            <AchievementCard2 key={index} {...achievement} />
          ))}
        </div>
      </div>
      <div className="order-1 sm:order-2">
        <img src={about1} alt="" />
      </div>
    </div>
  );
};

const Values = () => {
  const ValuesCard = ({ logo, header, paragraph }) => {
    return (
      <div className="flex- flex flex-col flex-wrap justify-between p-2 sm:p-6 w-[100%] md:w-[50%] xl:min-w-[300px]">
        <div className="flex items-center">
          <img src={logo} alt="" className="w-[50px] h-[auto] sm:w-[60px]" />
          <h3
            className={`text-[18px] sm:text-[20px] xl:text-[24px] font-semibold`}
          >
            {header}
          </h3>
        </div>
        <p className={`${styles.paragraph}`}>{paragraph}</p>
      </div>
    );
  };

  return (
    <div className={`${styles.mainContainer}`}>
      <div className="flex items-center flex-wrap md:flex-nowrap">
        {/* <div className="flex-"> */}

        <Journey
          // extrastyle={"justify-around"}
          paragraphText={
            "Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
          }
          HeaderText={"Our Values"}
        />
        {/* </div> */}
        <div className="flex flex- flex-wrap p-0 md:p-8 xl:p-10 rounded-lg">
          {Aboutvalues.map((values) => {
            return <ValuesCard key={values.header} {...values} />;
          })}
        </div>
      </div>
    </div>
  );
};

const AchievementCard = ({ heading, paragraph }) => {
  return (
    <div
      className={`flex-1 flex flex-col p-4 sm:p-6 md:p-8 xl:p-10 gap-2 sm:gap-6 xl:gap-10  min-w-[200px] rounded-md`}
    >
      <h3 className={`text-[18px] sm:text-[20px] xl:text-[24px] font-semibold`}>
        {heading}
      </h3>
      <p className={`${styles.paragraph}`}>{paragraph}</p>
    </div>
  );
};
const Achievement = () => {
  return (
    <div
      className={`${styles.mainContainer} flex flex-col justify-between gap-4 sm:gap-4 md:gap-6`}
    >
      <Journey
        paragraphText={
          "Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
        }
        HeaderText={"Our Achievements"}
      />
      <div className="flex- flex flex-wrap">
        {AboutAchivements.map((achievement) => {
          return <AchievementCard {...achievement} />;
        })}
      </div>
    </div>
  );
};

const Experience = () => {
  const ExperienceCard = ({ heading, paragraph }) => {
    return (
      <div
        className={`flex-1 flex flex-col p-4 sm:p-6 md:p-8 xl:p-10 gap-2 sm:gap-6 xl:gap-10 min-w-[200px] md:min-w-[30%] rounded-md`}
      >
        <h3 className={`text-[18px] sm:text-[20px] xl:text-[24px] font-semibold`}>
          {heading}
        </h3>
        <p className={`${styles.paragraph}`}>{paragraph}</p>
      </div>
    );
  };
  return (
    <div className={`${styles.mainContainer} flex flex-col gap-4 sm:gap-4 md:gap-6`}>
      <Journey
        paragraphText={
          "At Estatein, we've designed a straightforward process to help you find and purchase your dream property with ease. Here's a step-by-step guide to how it all works."
        }
        HeaderText={"Navigating The Estatein Experience"}
      />

      <div className={`flex- flex flex-wrap gap-4`}>
        {AboutExperience.map(experience => {
         return <ExperienceCard key={experience.heading} {...experience} />
        })}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <>
      <Hero />
      <Values />
      <Achievement />
      <Experience />
    </>
  );
};

export default About;
