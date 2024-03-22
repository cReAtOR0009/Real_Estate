import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/cartContext";
// import { Houses } from "../assets/textAssets";
import { styles } from "../styles/styles";
import { useFetchPropertiesQuery } from "../features/auth/authApiSlice";
import Amenity from "../components/Amenity";

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
  const scrollToTop = (() => {
    window.scrollTo(0, 0);
  })();
  let handleAddToCart;
  let content;
  let house;
  console.log("useFetchPropertiesQuery: ", useFetchPropertiesQuery());

  const handleFetchProperties = async () => {
    console.log("fectching Properties.....");
    if (isError) {
      // console.log("error fetching properties");
      // return setError(["Error fetching Properties"]);
    } else {
      // If no error, set houses data from the fetched data
      setHouses(data.data);
      // console.log("Houses: ", data);
      console.log("currentData: ", currentData);
      console.log("useFetchPropertiesQuery: ", useFetchPropertiesQuery());
      // house = Houses.find((house, index) => house._id == propertyid);
    }
  };

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
              <div className="imageContainer w-[auto]">
                <button onClick={handleFetchProperties}></button>
                <img
                  className="object-cover w-[100%]"
                  src={images[0]?.imageUrl}
                  alt={`${name}Image`}
                />
                {/* {console.log("image url", images[0]?.imageUrl)} */}
              </div>
              <div>
                <h2 className={`${styles.cardHeading} text-center`}>{name}</h2>
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
              <div className="pt-[24px] md:[30px] lg:[40px]">
                <p className={`${styles.paragraph}`}>{description}</p>
              </div>
              <div className="flex">
                <MdLocationOn size={25} />
                <p className="text-[20px]">
                  {address.street},{address.city},{address.state},
                  {address.zipcode}
                </p>
              </div>
              <div className="flex justify-between mt-[20px] border-Purple-60 py-[10px] border-y-2">
                <div>
                  <p className="text-[20px] lg:text-[22px] text-Grey-60">
                    Price
                  </p>
                  <p className="text-[20px]">{price}</p>
                </div>

                <button
                  className={`${styles.buttonPadding} rounded-[8px] bg-Purple-60`}
                  onClick={handleAddToCart}
                >
                  Buy Property
                </button>
              </div>
              <div className=" flex flex-wrap pt-[24px] md:[30px] lg:[40px]">
                <p className="hover:scale-[1.2] transition-all flex px-[14px] py-[10px] items-center m-[0px] gap-[2px] rounded-[28px] border border-solid border-Grey-40 bg-Grey-10">
                  <MdBedroomChild size={22} />
                  BedRooms-{bedrooms}
                </p>
                <p className="hover:scale-[1.2] transition-all flex px-[14px] py-[10px] items-center m-[0px] gap-[2px] rounded-[28px] border border-solid border-Grey-40 bg-Grey-10">
                  <MdBathroom size={22} />
                  Bathrooms-{bathrooms}
                </p>
                <p className="hover:scale-[1.2] transition-all flex px-[14px] py-[10px] items-center m-[0px] gap-[2px] rounded-[28px] border border-solid border-Grey-40 bg-Grey-10">
                  <BsRulers size={22} /> Size-{size}SM
                </p>
              </div>

              <div>
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
              </div>

              <div>
                <h1 className="text-[25px]">Additional Features:</h1>
                <div className="flex gap-[10px]">
                  {additionalFeatures.map((additionalFeature, index) => {
                    return (
                      <AdditionalFeatures key={index} {...additionalFeature} />
                    );
                  })}
                </div>
              </div>

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
                {rating.map((properties, index) => {
                  return <StarRating key={index} {...properties} />;
                })}
              </div>
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
    handleFetchProperties();
  }, [data, isLoading, isError, isSuccess]);

  return <>{content}</>;
};

export default Property;
