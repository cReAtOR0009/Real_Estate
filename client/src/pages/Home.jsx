import React from "react";
import {
  NavBar,
  Hero,
  FeaturedProperties,
  Faq,
  StartJourney,
  Testimonials,
} from "./index";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [scroll, setScroll] = useState(0);

  const updateScroll = () => {
    // console.log("window.scrollY", window.scrollY)
    // const postion = window.scrollY;
    // window.addEventListener("scroll", updateScroll);
    // setScroll(postion);
    // console.log("scrollyyy", scroll);

    // return () => {
    //   window.scrollTo(0, scroll)
    //  return window.removeEventListener("scroll", updateScroll);
    // };
  };

  useEffect(() => {updateScroll()}, [scroll]);

  // console.log("scrollyyy2", scroll);
  // const scrollToTop = (() => {
  //   window.scrollY = scrollY;
  // })();
  return (
    <div>
      {/* <NavBar /> */}
      <Hero id="hero" />
      <FeaturedProperties />
      {/* <div>{scroll}</div> */}
      <Testimonials />
      <StartJourney />
      <Faq />
    </div>
  );
};

export default Home;
