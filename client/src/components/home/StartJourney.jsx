import React from 'react'
import "../../styles/startJourney.css"
import { styles } from '../../styles/styles'

const StartJourney = () => {
  return (
    <div className={`${styles.homeheader}`}>
      <div className={`flex sm:items-end justify-between flex-col sm:flex-row gap-[20px]`}>
        <div className={`flex-1`}>
            <h2 className={`${styles.heading}`}>Start Your Real Estate Journey Today</h2>
            <p>Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.</p>
        </div>
        
        <div className="flex-1  sm:text-right">
            <button  className={`${styles.buttonPadding} w-[100%] sm:w-[auto]`}>Explore Properties</button>
        </div>
      </div>
    </div>
  )
}

export default StartJourney