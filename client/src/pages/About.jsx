import React from "react";
import OffersCard from "../components/smallcomponents/OffersCard";
import { offers } from "../assets/textAssets";
import "../styles/hero.css";

const About = () => {
  return (
    <div className="mt-[100px] sm:mt-[100px]">
      <div className="flex flex-col sm:flex-row">
        <div>
          <h1>Our Journey</h1>
          <p>
            Our story is one of continuous growth and evolution. We started as a
            small team with big dreams, determined to create a real estate
            platform that transcended the ordinary. Over the years, we've
            expanded our reach, forged valuable partnerships, and gained the
            trust of countless clients.
          </p>
          <div className="grid grid-cols-auto minmax-[300px,1fr] gap-16 p-10 border border-gray-400 bg-Grey-15 shadow-md">
            {offers.map((offers, index) => {
              return <OffersCard key={index} {...offers} />;
            })}
          </div>
        </div>
        <div>hello</div>
      </div>
    </div>
  );
};

export default About;
