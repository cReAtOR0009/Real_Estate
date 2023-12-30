import React, { useState } from "react";
import { styles } from "../../styles/styles.js";
import { searchinputs } from "../../assets/textAssets.js";
import { searchIcon } from "../../assets/imageImporter.js";
import { Houses } from "../../assets/textAssets.js";

const SearchParameterInput = ({
  icon,
  placeholder,
  id,
  name,
  handleChange,
  type,
  searchBtn,
}) => {
  return (
    <div className="flex align-middle w-[100%] relative px-[12px] py-[14px] border border-solid border-Grey-15 rounded-[8px]  bg-Grey-08">
      <img className=" " src={icon} alt="" />
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={(e) => handleChange(e, name)}
        className="border-l border-solid border-Grey-15 ml-[8px] pl-[8px] text-left "
      />
      <button className="absolute bottom-50 right-5 md:right-[10px]">
        <img src={searchBtn} alt="" />
      </button>
    </div>
  );
};

const HouseCard = ({ image, title, details, features, price }) => {
  return (
    <>
      <div className={`${styles.houseCardPadding} flex flex-col md:w-[280px]border border-Grey-15 rounded-[12px]`}>
        <div className="imageContainer w-[auto]">
          <img className="object-cover w-[100%]" src={image} alt=""  />
        </div>
        <div>
          <div className="pt-[24px] md:[30px] lg:[40px]">
            <p className={`${styles.paragraph} w-[auto] px-[12px] py-[6px] lg:px-[14px] lg:py-[8px] text-[14px] rounded-[28px] border border-Grey-15 text-white-90`}>Lorem ipsum dolor sit.</p>
            <h2 className={`${styles.cardHeading}`}>{title}</h2>
            <p className={`${styles.paragraph}`}>{details}</p>
          </div>
          <div className="flex justify-between mt-[20px]">
            <div>
              <p className="text-[14px] lg:text-[18px] text-Grey-60">price</p>
              <p className="text-[20px]">{price}</p>
            </div>
            
              <button className={`${styles.buttonPadding} rounded-[8px] bg-Purple-60`}>View Property Details</button>

          </div>
        </div>
      </div>
    </>
  );
};

const HeaderContainer = ({headerText, paragrapgText, styles}) => 
  (
   <div className={styles.TextContainer}>
        <h1 className={styles.heading}>{headerText}</h1>
        <p className={styles.paragraph}>
         {paragrapgText}
        </p>
      </div>
  )


const HeroSection = () => {
  const [searchParams, setsearchParams] = useState({
    Location: "",
    propertyType: "",
    calender: "",
    pricingRange: "",
    buildYear: "",
  });

  console.log(searchParams);

  const handleChange = (e, name) => {
    setsearchParams((initialValue) => ({
      ...initialValue,
      [name]: e.target.value,
    }));
    console.log(searchParams);
  };

  const handleSubmit = () => {};
  return (
    <>
      <div className={styles.TextContainer}>
      {<HeaderContainer headerText="Find Your Dream Property" paragrapgText="Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey " styles={styles} />}
      </div>
      <div className={` ${styles.subContainer} flex-col`}>
        <div className="flex justify-between  gap-[20px] px-[10px] py-[10px] rounded border border-solid border-Grey-15 md:mx-[90px] md:py-[16px] md:px-[20px]">
          <input
            className="my-[10px] w-[100%] md:px-[20px] md:my-[10px]"
            type="text"
            placeholder="Search For A Property"
          />
          <button className="flex whitespace-nowrap px-[20px] py-[10px] w-[] bg-Purple-60 rounded-[8px]">
            <img src={searchIcon} alt="" />
            Find Property
          </button>
        </div>
        <div className="flex flex-col sm:flex-wrap gap-[20px] justify-between mt-[20px] p-[20px] bg-Grey-10  rounded-[12px] md:flex-row lg:flex-nowrap md:mt-[-5px]">
          {searchinputs.map((searchinput, index) => (
            <SearchParameterInput
              key={index}
              {...searchinput}
              handleChange={handleChange}
            />
          ))}
        </div>
      </div>

      <div className={styles.TextContainer}>
       {<HeaderContainer headerText="Discover a World of Possibilities" paragrapgText="Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home" styles={styles}/>}
      </div>

      <div className={`${styles.subContainer} houseCardContainer`}>
        {Houses.map((house, index) => (
          <HouseCard key={index} {...house}/>
        ))} 
      </div>


      <div>
       { <HeaderContainer headerText="Let's Make it Happen" paragrapgText="Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together." styles={styles} />}
      </div>
    </>
  );
};

export default HeroSection;
