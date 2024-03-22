import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import {
  Fees,
  feeTotalInitialCostss,
  monthlyExpenses,
  monthlyFees,
} from "../assets/textAssets";
import { faqs } from "../assets/textAssets";
import FaqCard from "../components/smallcomponents/FaqCard";
import FaqBox from "../components/smallcomponents/FaqBox";
import MainHeaderContainer from "../components/smallcomponents/MainHeaderContainer";
import { rightarrow, leftarrow } from "../assets/textAssets";
// import { Houses } from "../assets/textAssets";
import { styles } from "../styles/styles";
import { useFetchPropertiesQuery } from "../features/auth/authApiSlice";
import Amenity from "../components/Amenity";
import { contactFieldDetails } from "../assets/textAssets";
import InputField from "../components/formComponent/InputField";
import { MdBathroom, MdLocationOn } from "react-icons/md";
import { MdBedroomChild } from "react-icons/md";
import { BsRulers } from "react-icons/bs";
import { FaSwimmingPool } from "react-icons/fa";
import { FaPlantWilt } from "react-icons/fa6";
import { GiHomeGarage } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { GrShieldSecurity } from "react-icons/gr";
import { MdBalcony } from "react-icons/md";
import { GiHotSpices } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import AdditionalFeatures from "../components/AdditionalFeatures";
import HeaderContainer from "../components/textComponents/HeaderContainer";
import Fee from "../components/smallcomponents/Fee";
import Journey from "../components/smallcomponents/Journey";

const StarRating = ({ value, review }) => {
  // Ensure the rating is within the valid range (1 to 5)
  const normalizedRating = Math.min(5, Math.max(1, value));

  // Create an array of stars based on the rating
  const stars = Array.from(
    { length: normalizedRating },
    (_, index) => index + 1
  );

  return (
    <div className="flex flex-col max-w-[200px] p-[10px] border border-solid border-Grey-60 rounded-[5px]">
      <div>
        {stars.map((star) => (
          <span key={star} role="img" aria-label="star">
            ⭐
          </span>
        ))}
      </div>
      <p>{review}</p>
    </div>
  );
};

const Property = () => {
  const { propertyid } = useParams();
  const { addToCart, toggleCart, getTotal } = useContext(CartContext);
  const [errorstate, setError] = useState([]);
  const [Houses, setHouses] = useState([]);
  const [imageToDisplayed, setImageToDisplay] = useState(undefined);
  const changeDisplayImage = (imageToDisplay) => {
    setImageToDisplay(imageToDisplay);
  };
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
  // const scrollToTop = (() => {
  //   window.scrollTo(0, 0);
  // })();
  let handleAddToCart;
  let content;
  let house;
  console.log("useFetchPropertiesQuery: ", useFetchPropertiesQuery());

  if (Houses.length > 0) {
    house = Houses.find((house, index) => house._id == propertyid);
    if (!house) {
      content = (
        <div>
          content ={" "}
          <div className="mt-[200px]">
            House with {propertyid} id not Found in Db
          </div>
          ;
        </div>
      );
      // return content
    } else {
      // console.log("house", house);
      let {
        _id: id,
        name,
        description,
        price,
        bedrooms,
        bathrooms,
        size,
        address,
        amenities,
        additionalFeatures,
        rating,
        images,
        tags,
        propertyType,
        salesHistory,
        nearbyAmenities,
        availability,
      } = house;
      tags;
      handleAddToCart = () => {
        let image = images[0]?.imageUrl;
        addToCart(id, price, description, image, name);
      };
      let displayImage = images[0].imageUrl;
      // setImageToDisplay(displayImage);
      console.log("house", house);
      console.log("nearbyAmenities", nearbyAmenities);
      console.log("tags", tags);
      // console.log("tags", tags[0].split(","));
      content = (
        <>
          (
          <div className="mt-[100px]">
            <div
              className={`${styles.houseCardForProperty} flex flex-col text-[15px] p-[20px] border border-Grey-15 rounded-[12px]`}
            >
              <div className="flex justify-between">
                <div className="flex">
                  <p className="text-[20px]">
                    {address.street},{address.city},{address.state},
                    {/* {address.zipcode} */}
                  </p>
                  <MdLocationOn size={25} />
                </div>
                <h2 className={`${styles.cardHeading} text-center`}>{name}</h2>
                <div>
                  <p className="text-[20px] lg:text-[22px] text-Grey-60">
                    Price
                  </p>
                  <p className="text-[20px]">${price}</p>
                </div>
              </div>

              <div
                className={`hidden sm:flex flex-warap p-[10px] m-[10px] rounded-[12px] border border-solid border-Grey-50 gap-[10px]`}
              >
                {images.length > 0 ? (
                  images.map((image, index) => {
                    return (
                      <img
                        src={image.imageUrl}
                        alt={`${name} image`}
                        className="w-[144px] h-[94px] rounded-[8px]"
                        onClick={() => changeDisplayImage(image.imageUrl)}
                      />
                    );
                  })
                ) : (
                  <h1>no image to display</h1>
                )}
              </div>
              <div className="imageContainer w-[auto]">
                {/* <button onClick={handleFetchProperties}></button> */}
                <img
                  className="object-cover w-[100%]"
                  src={imageToDisplayed}
                  alt={`${name}Image`}
                />
                {/* {console.log("image url", images[0]?.imageUrl)} */}
              </div>

              <div
                className={`flex sm:hidden flex-warap p-[10px] m-[10px] rounded-[12px] border border-solid border-Grey-50`}
              >
                {images.map((image, index) => {
                  return (
                    <img
                      src={image.imageUrl}
                      alt={`${name} image`}
                      className="w-[67x] h-[41px] rounded-[6px]"
                    />
                  );
                })}
              </div>
              <div>
                <div className="flex items-center text-[20px]">
                  <IoMdCheckmarkCircleOutline size={25} />
                  <p
                    className={`${
                      availability ? "text-Purple-60" : "text-[red]"
                    } text-[20px uppercase]`}
                  >
                    {availability
                      ? "This Property Is Available"
                      : "This Property Is currently not Available for Sale or Lease"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap  pt-[24px] rounded-[15px] md:[30px] lg:[40px]">
                <div className="max-w-[100vw] grow p-[20px] sm:max-w-[50%] ">
                  <div>
                    <h2>Description</h2>
                    <p className={`${styles.paragraph}`}>
                      {description} Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Autem, necessitatibus. Rerum corporis
                      dolorum quae sit veniam, repellendus, qui quod molestias
                      distinctio eligendi nemo odit illo maiores architecto.
                      Voluptatem illo facere vitae, alias veniam, sapiente
                      doloremque atque excepturi vel quos eos ratione sunt
                      soluta? Tenetur, repellat impedit fugit quidem deleniti
                      soluta?
                    </p>
                  </div>
                  <div className=" flex flex-wrap gap-[10px] border-t-2 border-Grey-15 pt-[10px] my-[10px] md:[30px] lg:[40px]">
                    <p className="flex flex-col justify-start hover:scale-[1.2] transition-all px-[14px] py-[10px] items-center m-[0px] gap-[2px] border-l-1 border-Grey-40 bg-Grey-10">
                      <MdBedroomChild size={22} />
                      BedRooms-{bedrooms}
                    </p>
                    <p className="flex flex-col hover:scale-[1.2] transition-all  px-[14px] py-[10px] items-center m-[0px] gap-[2px]  border-r  border-Grey-40 bg-Grey-10">
                      <MdBathroom size={22} />
                      Bathrooms-{bathrooms}
                    </p>
                    <p className="flex flex-col hover:scale-[1.2] transition-all  px-[14px] py-[10px] items-center m-[0px] gap-[2px]  border-r  border-Grey-40 bg-Grey-10">
                      <BsRulers size={22} /> Area-{size}Square Feet
                    </p>
                  </div>
                </div>
                <div className="grow sm:max-w-[50%]">
                  <h1 className="text-[25px]">Key Features and Amenities</h1>
                  <div className="flex flex-col gap-[10px]">
                    {additionalFeatures.map((additionalFeature, index) => {
                      return (
                        <AdditionalFeatures
                          key={index}
                          {...additionalFeature}
                        />
                      );
                    })}
                  </div>
                  <div>
                    <h2 className="text-[20px] ">Common Features: </h2>
                    <div className="flex flex-wrap border border-y-[2px] border-Grey-15 p-[10px] gap-[10px]">
                      <Amenity
                        icon={<FaSwimmingPool size={25} />}
                        text="Swimming Pool"
                        available={amenities.swimmingPool}
                      />
                      <Amenity
                        icon={<FaPlantWilt size={25} />}
                        text="Garden"
                        available={amenities.garden}
                      />
                      <Amenity
                        icon={<GiHomeGarage size={25} />}
                        text="Garage"
                        available={amenities.garage}
                      />
                      <Amenity
                        icon={<CgGym size={25} />}
                        text="Gym"
                        available={amenities.gym}
                      />
                      <Amenity
                        icon={<GrShieldSecurity size={25} />}
                        text="Security System"
                        available={amenities.securitySystem}
                      />
                      <Amenity
                        icon={<MdBalcony size={25} />}
                        text="Balcony"
                        available={amenities.balcony}
                      />
                      <Amenity
                        icon={<GiHotSpices size={25} />}
                        text="Central Heating"
                        available={amenities.centralHeating}
                      />
                      <Amenity
                        icon={<TbAirConditioning size={25} />}
                        text="Air Conditioning"
                        available={amenities.airConditioning}
                      />
                    </div>
                    <div>{propertyType}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-[20px] border-Purple-60 py-[10px] border-y-2">
                {/* <div>
                  <p className="text-[20px] lg:text-[22px] text-Grey-60">
                    Price
                  </p>
                  <p className="text-[20px]">{price}</p>
                </div> */}

                <button
                  className={`${styles.buttonPadding} rounded-[8px] bg-Purple-60`}
                  onClick={handleAddToCart}
                >
                  Buy Property
                </button>
              </div>
              {/* <div>
                <h2 className="text-[20px] ">Features: </h2>
                <div className="flex flex-wrap border border-y-[2px] border-Grey-15 p-[10px] gap-[10px]">
                  <Amenity
                    icon={<FaSwimmingPool size={25} />}
                    text="Swimming Pool"
                    available={amenities.swimmingPool}
                  />
                  <Amenity
                    icon={<FaPlantWilt size={25} />}
                    text="Garden"
                    available={amenities.garden}
                  />
                  <Amenity
                    icon={<GiHomeGarage size={25} />}
                    text="Garage"
                    available={amenities.garage}
                  />
                  <Amenity
                    icon={<CgGym size={25} />}
                    text="Gym"
                    available={amenities.gym}
                  />
                  <Amenity
                    icon={<GrShieldSecurity size={25} />}
                    text="Security System"
                    available={amenities.securitySystem}
                  />
                  <Amenity
                    icon={<MdBalcony size={25} />}
                    text="Balcony"
                    available={amenities.balcony}
                  />
                  <Amenity
                    icon={<GiHotSpices size={25} />}
                    text="Central Heating"
                    available={amenities.centralHeating}
                  />
                  <Amenity
                    icon={<TbAirConditioning size={25} />}
                    text="Air Conditioning"
                    available={amenities.airConditioning}
                  />
                </div>
                <div>{propertyType}</div>
              </div> */}

              <div className="flex flex-wrap gap-[10px] py-[10px] ">
                {tags.map((tag, index) => {
                  return (
                    <span
                      key={index}
                      className="p-[5px] border border-solid rounded-[5px]"
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>

              <div className="flex flex-col">
                <h1 className="text-[25px]">Nearby amenities: </h1>
                <div className="flex flex-wrap gap-[10px]">
                  {nearbyAmenities.map((nearbyAmenity, index) => {
                    return (
                      <>
                        <div className="flex items-center p-[10px] hover:scale-[1.2] transition-all">
                          <IoMdCheckmarkCircleOutline size={25} />
                          <span
                            className="p-[5px] bg-Purple-70 border border-solid border-Purple-50 rounded-[10px]"
                            key={index}
                          >
                            {nearbyAmenity}
                          </span>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <h2 className="text-[25px]">Ratings</h2>
              <div className="flex flex-wrap gap-[10px]">
                {rating.length > 0 ? (
                  rating.map((properties, index) => {
                    return <StarRating key={index} {...properties} />;
                  })
                ) : (
                  <h1>no rating available yet</h1>
                )}
              </div>

              <div className="flex flex-wrap  sm:flex-nowrap  sm:max-w-[100vw]">
                <div className="grow sm:max-w-[50vw]">
                  <h1
                    className={`${styles.heading}`}
                  >{`inquire About ${name}`}</h1>
                  <p>
                    Interested in this property? Fill out the form below, and
                    our real estate experts will get back to you with more
                    details, including scheduling a viewing and answering any
                    questions you may have.
                  </p>
                </div>
                <div className="grow sm:max-w-[50vw] p-[20px] border border-solid border-Grey-50 rounded-[10px]">
                  <form action="" className="flex flex-col gap-[30px]">
                    {contactFieldDetails.map(
                      (contactFieldDetail, index) =>
                        index % 2 === 0 && ( // Render pairs based on even index
                          <div
                            className="flex flex-wrap gap-[20px]"
                            key={index}
                          >
                            <InputField
                              {...contactFieldDetail}
                              styles={styles.inputFied}
                            />
                            {/* Render the second element if it exists */}
                            {index + 1 < contactFieldDetails.length && (
                              <InputField
                                {...contactFieldDetails[index + 1]}
                                styles={styles.inputFied}
                              />
                            )}
                          </div>
                        )
                    )}
                    <div className="flex flex-col">
                      <label htmlFor="selected property">
                        Selected Property
                      </label>
                      <InputField
                        type={"text"}
                        placeholder={`${name} ${address.street},${address.city},${address.state} `}
                        name={"selected property"}
                        onChange={() => {}}
                        styles={styles.inputFied}
                        value={`${name} ${address.street},${address.city},${address.state}`}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="Message" className="my-[10px]">
                        Message
                      </label>
                      <textarea
                        // type={"textarea"}
                        placeholder={``}
                        name="Message"
                        onChange={() => {}}
                        className={`${styles.inputFied} mr-[0px]  bg-Grey-08 text-Purple-60 text-center`}
                        // styles={styles.inputFied}
                        // value=""
                      />
                    </div>

                    <div className="flex justify-center items-center">
                      <div className="flex justify-end items-end">
                        <InputField
                          type={"checkbox"}
                          placeholder="I agree with Terms of Use and Privacy Policy"
                          id="agreement"
                          className={`${styles.inputFied} w-[20px] bg-Grey-08 text-Purple-60 text-center`}
                          name="agreement"
                          onChange={() => {}}
                          styles={styles.inputFied}
                        />
                        <label
                          htmlFor="agreement"
                          className={`${styles.paragraph} text-[10px] m-auto grow-[1]`}
                        >
                          I agree with Terms of Use and Privacy Policy
                        </label>
                      </div>

                      <button
                        className={`"hover:bg-[#946cf9] transition-all px-[10px] py-[10px] lg:px-[24px] lg:py-[18px] rounded-[8px] text-[10px] sm:text-[12px] bg-Purple-60`}
                      >
                        Send Your Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mx-[20px]">
              {
                <HeaderContainer
                  headerText="Comprehensive Pricing Details"
                  paragrapgText="At Estatein, transparency is key. We want you to have a clear understanding of all costs associated with your property investment. Below, we break down the pricing for Seaside Serenity Villa to help you make an informed decision"
                  styles={styles}
                />
              }
            </div>
            <div
              className={`${""} text-center mx-[20px] sm:mx-[40px] md:mx-[90px] px-[20px] sm:px-[20px] md:px-[30px] border border-solid border-Grey-10 bg-Grey-15 flex p-[20px]`}
            >
              <span className="font-bold border-r pr-[10px] border-Grey-30">
                Note
              </span>
              <p className="text-center text-[15px] pl-[10px]">
                The figures provided above are estimates and may vary depending
                on the property, location, and individual circumstances.
              </p>
            </div>
            <div className="flex  flex-wrap mx-[20px] sm:mx-[40px] md:mx-[90px] px-[0px] sm:px-[0px] md:px-[0px] my-[20px] gap-[30px]">
              <div className="">
                <span className={`${styles.paragraph}`}>Listing Price</span>
                <h2 className="text-[20px] sm:text-[25px] font-extrabold">
                  ${price}
                </h2>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col grow p-[15px] sm:p-[20px] border border-solid border-Grey-20 rounded-[10px]">
                  <div className="flex justify-between py-[10px] sm:py-[20px]">
                    <span>Additional Fees</span>
                    <button className={`${styles.buttonPadding} bg-Purple-60`}>
                      Learn More
                    </button>
                  </div>
                  <div>
                    {Fees.map((fee, index) => {
                      if (index % 2 === 0) {
                        return (
                          <div key={index} className="flex flex-wrap">
                            <Fee {...fee} index={index} />
                            {index + 1 < Fees.length && (
                              <Fee {...Fees[index + 1]} index={index + 1} />
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
                <div className="flex flex-col grow p-[15px] sm:p-[20px] border border-solid border-Grey-20 rounded-[10px]">
                  <div className="flex justify-between py-[10px] sm:py-[20px]">
                    <span>Monthly Costs</span>
                    <button className={`${styles.buttonPadding} bg-Purple-60`}>
                      Learn More
                    </button>
                  </div>
                  <div>
                    {monthlyFees.map((fee, index) => {
                      if (index % 2 === 0) {
                        return (
                          <div key={index} className="flex flex-wrap">
                            <Fee {...fee} index={index} />
                            {index + 1 < Fees.length && (
                              <Fee {...Fees[index + 1]} index={index + 1} />
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
                <div className="flex flex-col grow p-[15px] sm:p-[20px] border border-solid border-Grey-20 rounded-[10px]">
                  <div className="flex justify-between py-[10px] sm:py-[20px]">
                    <span>Total Initial Costs</span>
                    <button className={`${styles.buttonPadding} bg-Purple-60`}>
                      Learn More
                    </button>
                  </div>
                  <div>
                    {feeTotalInitialCostss.map((fee, index) => {
                      if (index % 2 === 0) {
                        return (
                          <div key={index} className="flex flex-wrap">
                            <Fee {...fee} index={index} />
                            {index + 1 < Fees.length && (
                              <Fee {...Fees[index + 1]} index={index + 1} />
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
                <div className="flex flex-col grow p-[15px] sm:p-[20px] border border-solid border-Grey-20 rounded-[10px]">
                  <div className="flex justify-between py-[10px] sm:py-[20px]">
                    <span>Monthly Expenses</span>
                    <button className={`${styles.buttonPadding} bg-Purple-60`}>
                      Learn More
                    </button>
                  </div>
                  <div>
                    {monthlyExpenses.map((fee, index) => {
                      if (index % 2 === 0) {
                        return (
                          <div key={index} className="flex flex-wrap">
                            <Fee {...fee} index={index} />
                            {index + 1 < Fees.length && (
                              <Fee {...Fees[index + 1]} index={index + 1} />
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div>{<FaqBox faq={faqs} />}</div>
            <div>
              <Journey
                paragraphText="Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance."
                HeaderText="Start Your Real Estate Journey Today"
                buttonText="Explore Properties"
              />
            </div>
          </div>
          )
        </>
      );
    }

    // return content
  } else if (isLoading) {
    content = <div className="mt-[200px]">fetching Data.....</div>;
  } else if (isError) {
    console.log("error: ", isError);
    let errorHere = error.error;
    // setError(errorHere);
    console.log("error:", errorHere);
    content = (
      <div className="mt-[200px]">Error fetching Data: {errorHere}</div>
    );
  } else if (Houses.length < 0) {
    console.log("data: ", data);
    content = (
      <div className="mt-[200px]">
        Opps, no Property Found in Db :({" "}
        <button onClick={handleFetchProperties}>Fetch</button>
      </div>
    );
    // return content;
  }

  useEffect(() => {
    const handleFetchProperties = async () => {
      console.log("fectching Properties.....");
      if (isError) {
        // console.log("error fetching properties");
        // return setError(["Error fetching Properties"]);
      } else {
        // If no error, set houses data from the fetched data
        setHouses(data.data);
        setImageToDisplay(data.data[0].images[0].imageUrl);
        // console.log("Houses: ", data);
        console.log("currentData: ", currentData);
        console.log("useFetchPropertiesQuery: ", useFetchPropertiesQuery());
        // house = Houses.find((house, index) => house._id == propertyid);
      }
    };
    handleFetchProperties();
  }, [data, isLoading, isError, isSuccess]);

  return <>{content}</>;
};

export default Property;
