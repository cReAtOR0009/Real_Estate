import React, { useState, useEffect, useContext } from "react";
import {
  featuredProducts,
  Houses,
  leftarrow,
  rightarrow,
} from "../../assets/textAssets";
import Amenity from "../Amenity";
import "../../styles/featured.css";
import { styles } from "../../styles/styles";
import { Link } from "react-router-dom";
import { NavigationContext } from "../../context/navigationContext";
import { PropertyContext } from "../../context/PropertiesContext";

const FeaturedItemCard = ({
  _id,
  images,
  title,
  description,
  amenities,
  price,
  index,
}) => {
  let id = _id;
  let firstImage = images[0]?.imageUrl;
  const { setNavActive, activeNav } = useContext(NavigationContext);
  const truncateDetails = (content, maxLength) => {
    const words = content.split(" ");
    const truncatedWords = words.slice(0, maxLength).join(" ");
    return words.length > maxLength ? `${truncatedWords}...` : content;
  };

  const truncatedDetails = truncateDetails(description, 20);
  return (
    <div className="featuredItemWrapper border border-Grey-15  bg-Grey-08 p-[15px] sm:p[30px] rounded-[12px]">
      <div className="featuredItem">
        <div>
          <img src={firstImage} alt="" />
        </div>
        <div>
          <div className="featuredItemText">
            <h2>{title}</h2>
            <p>
              {truncatedDetails}{" "}
              <Link
                to={`properties/${id}`}
                onClick={() => setNavActive("properties")}
                className="text-Purple-60"
              >
                {truncatedDetails.length > 20?"Read More":""}
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-[5px]">
            <div className="flex flex-wrap items-center border border-y-[2px] border-Grey-15 p-[10px] gap-[5px]">
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
              <p className="text-Purple-60 align-bottom">
                <Link to={`/properties/${id}`}>Check More...</Link>
              </p>
            </div>
          </div>
          <div className="featureditemPriceContainer">
            <div className="price">
              <span>Price</span>
              {`$${price}`}
            </div>
                <Link
            className={`buyButton ${styles.buttonPadding} ${styles.purpleButton}`}
                  to={`properties/${id}`}
                  onClick={() => setNavActive("properties")}
                >
              <button className="">
                  View Property Details
              </button>
                </Link>{" "}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProperties = () => {
  const [FeaturedHouse, setFeaturedHouse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let content;

  const {
    getProperties,
    properties,

  } = useContext(PropertyContext);
  console.log("properties:", properties)

  const handlePrevClick = (noOfPages) => {
    // console.log("number of page: ", noOfPages);
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure the page doesn't go below 0
  };

  // Handle click event for the "Next" button
  const handleNextClick = (noOfPages) => {
    // console.log("number of page: ", noOfPages);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, noOfPages)); // Ensure the page doesn't exceed the total number of pages
  };
  if (properties.error) {
    console.log("error", properties.errorValue)
    // return (<h1>error fetching data</h1>)
    content = <div className="mt-[200px] flex justify-center items-center mx-0 my-[auto] text-[30px] text-[red]">error fetching data</div>;
  } else if (properties.isLoading) {
    // console.log("properties.isLoading", properties.isLoading);
    content = <div className="mt-[200px] flex justify-center items-center mx-0 my-[auto]">
    <h1 className="text-[20px]">fetching Properties....</h1>
    {/* <div className="loader">

    </div> */}
  </div>;
  } else if (properties.properties.length > 0) {
    // console.log("properties.properties.length: ", properties.properties.length);
    const itemsPerDisplay = 3;
    const noOfPages =
      FeaturedHouse.length >= 3
        ? Math.ceil(FeaturedHouse.length / itemsPerDisplay)
        : 1;
    // const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerDisplay;
    const endIndex = startIndex + itemsPerDisplay;

    const displayedFeaturedItems =
      FeaturedHouse >= 3
        ? FeaturedHouse.slice(startIndex, endIndex)
        : FeaturedHouse;
    // console.log("displayedFeaturedItems: ", displayedFeaturedItems);
    // console.log("noOfPages: ", noOfPages);
    content = (
      <div>
        <div className="featuredItemListContainer">
          {displayedFeaturedItems.map((FeaturedHouse, index) => (
            <FeaturedItemCard key={index} index={index} {...FeaturedHouse} />
          ))}
          
        </div>

        <div className="featuredToggle">
          <p>
            <span className="currentPage">{currentPage}</span>of
            <span className="totalPage">{noOfPages}</span>
          </p>
          <div className="toggleButton">
            <div
              className="previous"
              onClick={() => handlePrevClick()}
              disabled={currentPage === 0}
            >
              <img src={leftarrow} alt="" />
            </div>
            <div
              className="next"
              onClick={() => handleNextClick(noOfPages)}
              disabled={currentPage === noOfPages - 1}
            >
              <img src={rightarrow} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (properties.properties === 0) {
    content =(<div className="mt-[200px]">
    Opps, no Property Found in Db :({" "}
  </div>)
  } else {
    content =(<div className="mt-[200px]">
    Opps, an Unknown Error Occured :({" "}
  </div>)
  }

  // console.log("properties from featured: ", properties);
  useEffect(() => {
    // getProperties();
    // console.log("useeffect content: ", content);
    setFeaturedHouse(properties.properties);
    // console.log("getProperties: ", properties);
    // console.log("isLoading: ", properties.isLoading);
    // return content
    // return () => content;
  }, [properties]);

  return (
    <div id="features" className={`${styles.homeheader}`}>
      <div
        className={`${""} flex sm:items-end justify-between flex-col sm:flex-row gap-[20px]`}
      >
        <div className={`${""} flex-1`}>
          <img src="" alt="" />
          <h3 className={`${styles.heading}`}>Featured Properties</h3>
          <p>
            Explore our handpicked selection of featured properties. Each
            listing offers a glimpse into exceptional homes and investments
            available through Estatein. Click "View Details" for more
            information.
          </p>
        </div>
        <div className={`flex-1 text-center sm:text-right`}>
          <button className={`${styles.buttonPadding} bg-Purple-60`}>
            View All Properties
          </button>
        </div>
      </div>

      <div className="featuredItemsContainerWrapper">
        {content}
        {/* {console.log("content", content)} */}
      </div>
    </div>
  );
};
export default FeaturedProperties;
