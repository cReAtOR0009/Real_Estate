import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  useFetchPropertiesQuery,
  useSearchPropertiesQuery,
} from "../../features/auth/authApiSlice.js";
import { styles } from "../../styles/styles.js";
import InputField from "../formComponent/InputField.jsx";
import SelectField from "../formComponent/SelectField.jsx";
import SelectField2 from "../formComponent/SelectField2.jsx";
import HeaderContainer from "../textComponents/HeaderContainer.jsx";
import Journey from "../smallcomponents/Journey.jsx";

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
import MainHeaderContainer from "../smallcomponents/MainHeaderContainer.jsx";
import Amenity from "../Amenity.jsx";

const HouseCard = ({
  _id,
  images,
  name,
  description,
  amenities,
  features,
  price,
  index,
}) => {
  let id = _id;
  // console.log("images: ", images);
  // console.log("images zero: ", images[0].imageUrl);
  // const { setNavActive, activeNav } = useContext(NavigationContext);
  // const { addToCart, toggleCart } = useContext(CartContext);

  const handleAddToCart = () => {
    // addToCart(id, price, description, images[0]?.imageUrl, name);
    // toggleCart();
  };
  const truncateDetails = (content, maxLength) => {
    const words = content.split(" ");
    const truncatedWords = words.slice(0, maxLength).join(" ");
    return words.length > maxLength ? `${truncatedWords}...` : content;
  };

  const trauncatedDetails = truncateDetails(description, 10);
  return (
    <>
      <div
        className={`${styles.houseCardPadding} flex flex-col  border border-Grey-15 rounded-[12px]`}
      >
        <div className="imageContainer w-[auto]">
          <img
            className="object-cover w-[100%] rounded-[10px] max-h-[400px] max-w-[400px]"
            src={images[0]?.imageUrl}
            alt=""
          />
        </div>
        <div>
          <div className="pt-[24px] md:[30px] lg:[40px]">
            {/* {console.log("ammenities", amenities)}
            {console.log(
              "Object.keys(ammenities): ",
              amenities ? Object.keys(amenities) : "null"
            )}
            {console.log(
              "Object.keys(ammenities): ",
              amenities ? Object.values(amenities) : "null"
            )} */}
            <div className="flex flex-wrap border border-y-[2px] border-Grey-15 p-[10px] gap-[10px]">
              {Object.keys(amenities).map((ammenity, index) => {
                if (ammenity !== "_id") {
                  return (
                    <Amenity
                      icon={Object.keys(amenities)[index]}
                      available={Object.values(amenities)[index]}
                      text={Object.keys(amenities)[index]}
                      key={index}
                    />
                  );
                }
              })}
            </div>
            <p
              className={`${styles.paragraph} w-[auto] inline-block px-[12px] py-[6px] lg:px-[14px] lg:py-[8px] text-[14px] rounded-[28px] border border-Grey-15 text-white-90`}
            >
              Lorem ipsum dolor sit.
            </p>
            <h2 className={`${styles.cardHeading}`}>{name}</h2>
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

            <Link
              to={`${id}`}
              className={`${styles.buttonPadding} rounded-[8px] bg-Purple-60`}
            >
              <button>View Property Details</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const HeroSection = () => {
  const [Houses, setHouses] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchParams, setsearchParams] = useState({
    // property_city: "",
    // property_state: "",
    // bedrooms: "",
    // bathrooms: "",
    // property_status: "",
    ["property name"]: searchName,
    ["property type"]: "",
    ["property size"]: "",
    ["build year"]: "",
    ["min price"]: "",
    ["max price"]: "",
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
  });
  const {
    currentData,
    data: data,
    isLoading,
    isError,
    error,
    isFetching,
    isSuccess,
    isUninitialized,
    refetch,
  } = useFetchPropertiesQuery();

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useSearchPropertiesQuery(searchParams, {
    skip: !Object.keys(searchParams).length,
  });

  const handleSearchChange = (e, property) => {
    property.toLowerCase();
    setsearchParams((initialValue) => ({
      ...initialValue,
      [property]: e.target.value,
    }));
  };

  // console.log("searchParams:", searchParams);
  const handlePropertyPreferenceChange = (e, property) => {
    setpropertyChoice((initialValue) => ({
      ...initialValue,
      [property]: e.target.value,
    }));
    // console.log(searchParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    let content = "";
    if (searchLoading) {
      console.log("loading...");
      content = `<div>Loading...</div>`;
    } else if (searchError) {
      console.log("search Error...");
      console.log("search Error...", searchError);
      content = `<div>Error: ${searchError.message}</div>`;
    } else if (searchData) {
      console.log(searchData); // Example: Log searchData to console
      setHouses(searchData.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form data submitted:", propertyChoice);
  };

  let content;

  useEffect(() => {
    const handleFetchProperties = async () => {
      if (isError) {
      } else if (!isError && data.status == 200) {
        // If no error, set houses data from the fetched data
        setHouses(data.data);
      }
    };
    handleFetchProperties();
    // console.log("content: ", content);
  }, [isLoading]);

  if (Houses.length > 0) {
    content = Houses.map((house, index) => {
      // console.log("housecars: " + index, house);
      return <HouseCard key={index} {...house} index={index} />;
    });
  } else if (isLoading) {
    content = (
      <div className="mt-[200px] flex justify-center items-center mx-0 my-[auto]">
        <h1 className="text-[20px] text-center">fetching Properties....</h1>
      </div>
    );
  } else if (isError) {
    console.log("error: ", isError);
    let errorHere = error.error;
    // setError(errorHere);
    console.log("error:", errorHere);
    content = (
      // <div className="mt-[200px] flex justify-center items-center self-center mx-0 my-[auto] text-center text-[30px] text-[red]">
        <h1 className="text-center text-[30px] text-[red]">error fetching data</h1>
      // </div>
    );
  } else if (Houses.length == 0) {
    console.log("data: ", data);
    content =
      // <div className="text-center mx-auto">
      "Opps, no Property Found :(";
    // {/* <button onClick={handleFetchProperties}>Fetch again...</button> */}
    // </div>
    // return content;
  } else {
    content = (
      <div className="mt-[200px]">
        Opps, an Unknown Error Occured :({" "}
        {/* <button onClick={handleFetchProperties}>Fetch again...</button> */}
      </div>
    );
  }

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
      <div
        className={` ${styles.searchContainer} flex  md:mt-[-40px] flex-col`}
      >
        <form action="" className="" onSubmit={handleSearch}>
          <div className="flex justify-between  bg-Grey-08 gap-[20px] px-[10px] py-[10px] rounded border border-solid border-Grey-15 md:mx-[90px] md:py-[16px] md:px-[20px]">
            <input
              // onChange={(e) => handleSetName(e.target.value)}
              onChange={(e) =>
                handleSearchChange(e, e.target.name.toLocaleLowerCase())
              }
              // value={searchName}
              name="property Name"
              className="my-[10px] w-[100%] border border-Grey-15  md:px-[0px] md:my-[0px] p-2"
              type="text"
              placeholder="Search For A Property"
            />
            <button
              onClick={(e) => handleSearch(e)}
              className="flex whitespace-nowrap px-[20px] py-[10px] w-[] bg-Purple-60 rounded-[8px]"
            >
              <img src={searchIcon} alt="" />
              Find Property
            </button>
          </div>
          <div className=" flex  sm:flex-wrap gap-[20px] justify-between mt-[20px] p-[20px] bg-Grey-10  rounded-[12px]lg:flex-nowrap md:mt-[-5px]">
            {propertyPreferences.map((propertyPreference, index) => (
              <div className="min-w-[100px w-full sm:w-auto">
                <SelectField
                  key={index}
                  {...propertyPreference}
                  label={propertyPreference.value}
                  onChange={(e) =>
                    handleSearchChange(
                      e,
                      propertyPreference.value.toLocaleLowerCase()
                    )
                  }
                  styles={`${styles.inputFied2} flex-1 `}
                />
              </div>
            ))}
          </div>
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

      <div
        className={`${styles.subContainer} houseCardContainer mx-0 my-[auto] text-center`}
      >
        {content}
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
            <div className="flex-col justify-between self-stretch gap-[30px] md:flex md:flex-row flex-wrap">
              {contactFieldDetails.map((contactFieldDetail, index) => (
                <InputField
                  key={index}
                  {...contactFieldDetail}
                  styles={styles.inputField}
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
                  styles={styles.inputFiedl2}
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
                <div className="flex-col justify-between self-stretch gap-[10px] flex md:gap-[30px]  md:flex-row">
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
                className={`${styles.inputField} w-[100%]`}
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
                  className={`${styles.inputFied} mr-[0px] md:mr-[5px] bg-Grey-08 text-Purple-60 text-center`}
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
                className={`${styles.buttonPadding}   bg-Purple-60`}
              >
                Send Your Message
              </button>
            </div>
          </form>
        </div>
        <Journey
          paragraphText="Your dream property is just a click away. Whether you're looking
        for a new home, a strategic investment, or expert real estate
        advice, Estatein is here to assist you every step of the way. Take
        the first step towards your real estate goals and explore our
        available properties or get in touch with our team for
        personalized assistance."
          HeaderText="Start Your Real Estate Journey Today"
          buttonText="Explore Properties"
        />
      </div>
    </>
  );
};

export default HeroSection;
