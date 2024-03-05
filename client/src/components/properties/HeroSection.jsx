import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { styles } from "../../styles/styles.js";
import {
  budget,
  contactFieldDetails,
  propertyPreferences,
  propertyPreferences2,
} from "../../assets/textAssets.js";
import { searchIcon } from "../../assets/imageImporter.js";
import { Houses } from "../../assets/textAssets.js";
import { NavigationContext } from "../../context/navigationContext.jsx";
import { CartContext } from "../../context/cartContext.jsx";

const SearchParameterInput = ({
  icon,
  placeholder,
  id,
  name,
  handleSearchChange,
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
        onChange={(e) => handleSearchChange(e, name)}
        className="border-l border-solid border-Grey-15 ml-[8px] pl-[8px] text-left "
      />
      <button className="absolute bottom-50 right-5 md:right-[10px]">
        <img src={searchBtn} alt="" />
      </button>
    </div>
  );
};

const HouseCard = ({ id, image, title, details, features, price, index }) => {
  const { setNavActive, activeNav } = useContext(NavigationContext);
  const { addToCart, toggleCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(id, price, details, image, title);
    toggleCart();
  };
  const truncateDetails = (content, maxLength) => {
    const words = content.split(" ");
    const truncatedWords = words.slice(0, maxLength).join(" ");
    return words.length > maxLength ? `${truncatedWords}...` : content;
  };

  const trauncatedDetails = truncateDetails(details, 10);
  return (
    <>
      <div
        className={`${styles.houseCardPadding} flex flex-col  border border-Grey-15 rounded-[12px]`}
      >
        <div className="imageContainer w-[auto]">
          <img className="object-cover w-[100%]" src={image} alt="" />
        </div>
        <div>
          <div className="pt-[24px] md:[30px] lg:[40px]">
            <p
              className={`${styles.paragraph} w-[auto] inline-block px-[12px] py-[6px] lg:px-[14px] lg:py-[8px] text-[14px] rounded-[28px] border border-Grey-15 text-white-90`}
            >
              Lorem ipsum dolor sit.
            </p>
            <h2 className={`${styles.cardHeading}`}>{title}</h2>
            <p className={`${styles.paragraph}`}>
              {trauncatedDetails}{" "}
              <Link to={`/properties/${id}`} className="text-Purple-60">
                Read More
              </Link>
            </p>
          </div>
          <div className="flex justify-between mt-[20px]">
            <div>
              <p className="text-[14px] lg:text-[18px] text-Grey-60">price</p>
              <p className="text-[20px]">{price}</p>
            </div>

            <button
              className={`${styles.buttonPadding} rounded-[8px] bg-Purple-60`}
            >
              <Link to={`${index}`}>View Property Details</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const MainHeaderContainer = ({ headerText, paragrapgText, styles }) => (
  <div className={styles.TextContainer}>
    <h1 className={styles.heading}>{headerText}</h1>
    <p className={styles.paragraph}>{paragrapgText}</p>
  </div>
);

const HeaderContainer = ({ headerText, paragrapgText, styles }) => (
  <div className={styles.headerTextContainer}>
    <h1 className={styles.heading}>{headerText}</h1>
    <p className={styles.paragraph}>{paragrapgText}</p>
  </div>
);

const InputField = ({ placeholder, name, label, type, onChange, styles }) => (
  <div className="flex flex-col flex-1  gap-[12px] md:gap-[16px]">
    <label htmlFor={label} className="text-[16px] text-White-99">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      className={styles}
    />
  </div>
);

const SelectField = ({ icon, label, options, styles, onChange }) => (
  <div className="custom-select flex flex-1 items-center relative">
    <label
      htmlFor={label}
      className="absolute left-3 text-[16px] text-White-99"
    >
      <img src={icon} alt="" />
    </label>
    <select
      name={label}
      id={label}
      onChange={onChange}
      className={`${styles} `}
    >
      {/* <option value="">{placeholder}</option> */}
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
const SelectField2 = ({ label, options, styles, onChange }) => (
  <div className="custom-select custom-selectPatch flex flex-col   flex-1 gap-[12px] md:gap-[16px] ">
    <label for={label} className="text-[16px] text-White-99">
      {label}
    </label>
    <select name={label} id={label} onChange={onChange} className={styles}>
      {/* <option value="">{name}</option> */}
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
const HeroSection = () => {
  const [searchParams, setsearchParams] = useState({
    Location: "",
    propertyType: "",
    calender: "",
    pricingRange: "",
    buildYear: "",
  });

  const [propertyChoice, setpropertyChoice] = useState({
    "First Name": "",
    "Last Name": "",
    Email: "",
    Phone: "",
    "Prefered Location": "",
    "Property Type": "",
    "No. of Bathrooms": "",
    "No. of Bedrooms": "",
    budget: "",
    preferedContact: "",
    message: "",
    agree: false,
    budget: "",
  });

  console.log(propertyChoice);

  const handleSearchChange = (e, property) => {
    setsearchParams((initialValue) => ({
      ...initialValue,
      [property]: e.target.value,
    }));
    // console.log(searchParams);
  };
  const handlePropertyPreferenceChange = (e, property) => {
    setpropertyChoice((initialValue) => ({
      ...initialValue,
      [property]: e.target.value,
    }));
    // console.log(searchParams);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", propertyChoice);
  };
  return (
    <>
      <div className="propertyGradientBg mt-[100px] sm-mt[100px]">
        {
          <MainHeaderContainer
            headerText="Find Your Dream Property"
            paragrapgText="Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey "
            styles={styles}
          />
        }
      </div>
      <div className={` ${styles.searchContainer}  md:mt-[-40px] flex-col`}>
        <div className="flex justify-between  bg-Grey-08 gap-[20px] px-[10px] py-[10px] rounded border border-solid border-Grey-15 md:mx-[90px] md:py-[16px] md:px-[20px]">
          <input
            className="my-[10px] w-[100%] border border-Grey-15  md:px-[0px] md:my-[0px]"
            type="text"
            placeholder="Search For A Property"
          />
          <button className="flex whitespace-nowrap px-[20px] py-[10px] w-[] bg-Purple-60 rounded-[8px]">
            <img src={searchIcon} alt="" />
            Find Property
          </button>
        </div>
        <form
          action=""
          className="flex flex-col sm:flex-wrap gap-[20px] justify-between mt-[20px] p-[20px] bg-Grey-10  rounded-[12px] md:flex-row lg:flex-nowrap md:mt-[-5px]"
        >
          {propertyPreferences.map((propertyPreference, index) => (
            <SelectField
              key={index}
              {...propertyPreference}
              onChange={(e) => handleSearchChange(e, propertyPreference.value)}
              styles={`${styles.inputFied2} flex-1 `}
            />
          ))}
        </form>
      </div>

      <div>
        {
          <HeaderContainer
            headerText="Discover a World of Possibilities"
            paragrapgText="Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home"
            styles={styles}
          />
        }
      </div>

      <div className={`${styles.subContainer} houseCardContainer`}>
        {Houses.map((house, index) => (
          <HouseCard key={index} index={index} {...house} />
        ))}
      </div>

      <div className="">
        {
          <HeaderContainer
            headerText="Let's Make it Happen"
            paragrapgText="Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together."
            styles={styles}
          />
        }

        <div
          className={`${styles.formContainer} formContainer border border-Grey-15 rounded-[12px]`}
        >
          <form className="flex flex-col gap-[30px]" action="" method="post">
            <div className="flex-col justify-between self-stretch gap-[30px] md:flex md:flex-row">
              {contactFieldDetails.map((contactFieldDetail, index) => (
                <InputField
                  key={index}
                  {...contactFieldDetail}
                  styles={styles.inputFied}
                />
              ))}
            </div>

            <div className="formsubContainer2 flex-col justify-between self-stretch gap-[30px] md:flex md:flex-row">
              {propertyPreferences2.map((propertyPreference, index) => (
                <SelectField2
                  key={index}
                  {...propertyPreference}
                  onChange={(e) =>
                    handlePropertyPreferenceChange(e, propertyPreference.label)
                  }
                  styles={styles.inputFied}
                />
              ))}
            </div>

            <div className="formsubContainer3 flex-col justify-between gap-[30px] md:flex md:flex-row">
              <div className="flex flex-col  gap-[12px] md:gap-[16px] grow">
                <label htmlFor="budget">Budget</label>
                <select
                  name="budget"
                  id=""
                  onChange={(e) =>
                    handlePropertyPreferenceChange(e, e.target.value)
                  }
                  className={`${styles.inputFied} w-[100%]`}
                >
                  {budget.options.map((budget, index) => (
                    <option key={index} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col  gap-[12px] md:gap-[16px]">
                <p>Preferred Contact Method</p>
                <div className="flex-col justify-between self-stretch gap-[30px] md:flex md:flex-row">
                  <input
                    name="phone"
                    type="phone"
                    placeholder="Enter Your Number"
                    onChange={(e) =>
                      handlePropertyPreferenceChange(e, e.target.name)
                    }
                    className={styles.inputFied}
                  />
                  <input
                    name="email"
                    type="mail"
                    placeholder="Enter Your Email"
                    onChange={(e) =>
                      handlePropertyPreferenceChange(e, e.target.name)
                    }
                    className={styles.inputFied}
                  />
                </div>
              </div>
            </div>

            <div className="formsubContainer4 flex flex-col flex-1 gap-[12px] md:gap-[16px]">
              <label for="message box">Message</label>
              <textarea
                id="message"
                placeholder="Enter your Message here.."
                name="message"
                rows="4"
                cols="50"
                className={`${styles.inputFied} w-[100%]`}
                onChange={(e) =>
                  handlePropertyPreferenceChange(e, e.target.name)
                }
              ></textarea>
            </div>

            <div className="formsubContainer5 flex  flex-wrap justify-between gap-[30px] ">
              <div className=" flex align-middle grow-[4]">
                <input
                  type="checkbox"
                  placeholder="I agree with Terms of Use and Privacy Policy"
                  id="agreement"
                  name="agreement"
                  value="true"
                  className={`${styles.inputFied} mr-[0px] md:mr-[5px] bg-Grey-08 text-Purple-60 text-center align`}
                />
                <label
                  htmlFor="agreement"
                  className={`${styles.paragraph} m-auto grow-[1]`}
                >
                  I agree with Terms of Use and Privacy Policy
                </label>
              </div>
              <button
                onClick={handleSubmit}
                className={`${styles.buttonPadding} flex-1  bg-Purple-60`}
              >
                Send Your Message
              </button>
            </div>
          </form>
        </div>
        <div
          className={`${styles.headerTextContainer}  flex flex-wrap md:flex-nowrap justify-center gap-[20px] md:gap-[100px] items-center propertyJourneybg`}
        >
          <div className="">
            <h1 className={styles.heading}>
              Start Your Real Estate Journey Today
            </h1>
            <p className={styles.paragraph}>
              Your dream property is just a click away. Whether you're looking
              for a new home, a strategic investment, or expert real estate
              advice, Estatein is here to assist you every step of the way. Take
              the first step towards your real estate goals and explore our
              available properties or get in touch with our team for
              personalized assistance.
            </p>
          </div>
          <button
            className={`${styles.buttonPadding} flex-1 whitespace-nowrap bg-Purple-60`}
          >
            Explore Properties
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
