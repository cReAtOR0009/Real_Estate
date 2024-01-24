import React from 'react'
import {NavBar, Hero, FeaturedProperties,Faq, StartJourney, Testimonials} from './index'

const Home = () => {
  return (
    <div>
        {/* <NavBar /> */}
        <Hero id="hero" />
        <FeaturedProperties />
        <Testimonials />
        <StartJourney />
        <Faq />
    </div>
  )
}

export default Home