import React from "react";
import MainHeaderContainer from "../components/smallcomponents/MainHeaderContainer";
import { styles } from "../styles/styles";
import OffersCard from "../components/smallcomponents/OffersCard";
import { offers } from "../assets/textAssets";
import ServiceCard from "../components/smallcomponents/ServiceCard";
import Journey from "../components/smallcomponents/Journey";
import {
  propertyManagementOffers,
  smartInvestmentOffers,
  serviceOffers,
} from "../assets/textAssets";
const Services = () => {
  return (
    <div className="mt-[100px] sm:mt-[100px]">
      <div>
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
      </div>

      {/* propertyManagementOffers */}

      <div>
        <MainHeaderContainer
          headerText="Unlock Property Value"
          paragrapgText="Selling your property should be a rewarding experience, and at Estatein, we make sure it is. Our Property Selling Service is designed to maximize the value of your property, ensuring you get the best deal possible. Explore the categories below to see how we can help you at every step of your selling journey"
          styles={styles}
        />

        <div
          className={`${styles.marginnedContainer} flex flex-wrap gap-[10px]`}
        >
          {serviceOffers.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
          <div className="p-[20px] flex-1 w-[100%] gap:[10px] sm:gap-[20px] sm:min-w-[50%] rounded-[10px] border border-solid border-Grey-15 bg-serviceCard">
            <div className="fflex justify-between flex-col sm:flex-row items-start sm:items-end gap-[20px]">
              <h2 className={`${styles.boldHeader1}`}>
                Unlock the Value of Your Property Today Learn More
              </h2>
              <button
                className={`p-[10px] rounded-[5px] bg-Grey-10 w-[100%] sm:w-auto`}
              >
                Learn More
              </button>
            </div>
            <p className={`${styles.paragraph}`}>
              Ready to unlock the true value of your property? Explore our
              Property Selling Service categories and let us help you achieve
              the best deal possible for your valuable asset.
            </p>
          </div>
        </div>
      </div>
      <div>
        <MainHeaderContainer
          headerText="Effortless property Management"
          paragrapgText="Owning a property should be a pleasure, not a hassle. Estatein's Property Management Service takes the stress out of property ownership, offering comprehensive solutions tailored to your needs. Explore the categories below to see how we can make property management effortless for you"
          styles={styles}
        />
        <div
          className={`${styles.marginnedContainer} flex flex-wrap gap-[10px]`}
        >
          {propertyManagementOffers.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
          <div className="p-[20px] flex-1 w-[100%] gap:[10px] sm:gap-[20px] sm:min-w-[50%] rounded-[10px] border border-solid border-Grey-15 bg-serviceCard">
            <div className="flex justify-between flex-col sm:flex-row items-start sm:items-end gap-[20px]">
              <h2 className={`${styles.boldHeader1}`}>
                Unlock the Value of Your Property Today Learn More
              </h2>
              <button
                className={`p-[10px] rounded-[5px] bg-Grey-10 w-[100%] sm:w-auto`}
              >
                Learn More
              </button>
            </div>
            <p className={`${styles.paragraph}`}>
              Ready to unlock the true value of your property? Explore our
              Property Selling Service categories and let us help you achieve
              the best deal possible for your valuable asset.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${styles.marginnedContainer} flex flex-col flex-wrap md:flex-nowrap sm:flex-row gap-[30px]`}
      >
        <div className="flex flex-col max-w-[100vw] md:max-w-[33vw] gap-[20px]">
          <div className="w-[100%] sm:w-[100%] min-w-[400px]">
            <h1 className={`${styles.heading}`}>
              Smart Investments, Informed Decisions
            </h1>
            <p className={`${styles.paragraph}`}>
              Building a real estate portfolio requires a strategic approach.
              Estatein's Investment Advisory Service empowers you to make smart
              investments and informed decisions.
            </p>
          </div>
          <div className="bg-serviceCard p-[25px] flex flex-col gap-[15px] w-[100%] rounded-[10px] sm:w-[100%] border border-solid border-Grey-30">
            <h2 className={`${styles.boldHeader1}`}>
              Unlock Your Potential Potential
            </h2>
            <p className={`${styles.paragraph}`}>
              Explore our Property Management Service categories and let us
              handle the complexities while you enjoy the benefits of property
              ownership.
            </p>
            <button
              className={`${styles.buttonPadding} bg-Grey-08 border border-solid border-Grey-20`}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-[10px] bg-Grey-15 p-[10px]">
          {" "}
          {smartInvestmentOffers.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      <div>
        <Journey
          paragraphText="Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance."
          buttonText={"Explore Properties"}
          HeaderText={"Start Your Real Estate Journey Today"}
        />
      </div>
    </div>
  );
};

export default Services;
