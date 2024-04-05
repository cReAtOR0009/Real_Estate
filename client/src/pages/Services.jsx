import React from "react";
import MainHeaderContainer from "../components/smallcomponents/MainHeaderContainer";
import { styles } from "../styles/styles";
import OffersCard from "../components/smallcomponents/OffersCard";
import { offers } from "../assets/textAssets";
import ServiceCard from "../components/smallcomponents/ServiceCard";
import { serviceOffers } from "../assets/textAssets";
const Services = () => {
  return (
    <div className="mt-[100px] sm:mt-[100px]">
      <MainHeaderContainer
        headerText="Elevate Your Real Estate Experience"
        paragrapgText="Welcome to Estatein, where your real estate aspirations meet expert guidance. Explore our comprehensive range of services, each designed to cater to your unique needs and dreams."
        styles={styles}
      />
      <div className="flex flex-wrap gap-[10px] p-[10px] border-y border-Grey-15 shadow-cardlineshadow">
        {offers.map((offer, index) => (
          <OffersCard key={index} {...offer} />
        ))}
      </div>
      <MainHeaderContainer
        headerText="Unlock Property Value"
        paragrapgText="Selling your property should be a rewarding experience, and at Estatein, we make sure it is. Our Property Selling Service is designed to maximize the value of your property, ensuring you get the best deal possible. Explore the categories below to see how we can help you at every step of your selling journey"
        styles={styles}
      />
      <div className={`${styles.marginnedContainer} flex flex-wrap gap-[10px]`}>
        {serviceOffers.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
        <div className="p-[20px] flex-1 w-[100%] gap:[10px] md:gap-[20px] md:min-w-[50%] rounded-[10px] border border-solid border-Grey-15 bg-serviceCard">
          <div className="flex justify-between flex-col md:flex-row items-start md:items-end gap-[20px]">
            <h2 className={`${styles.boldHeader1}`}>
              Unlock the Value of Your Property Today Learn More
            </h2>
            <button
              className={`p-[10px] rounded-[5px] bg-Grey-10 w-[100%] md:w-auto`}
            >
              Learn More
            </button>
          </div>
          <p className={`${styles.paragraph}`}>
            Ready to unlock the true value of your property? Explore our
            Property Selling Service categories and let us help you achieve the
            best deal possible for your valuable asset.
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Services;
