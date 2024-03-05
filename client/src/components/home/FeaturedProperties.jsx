import React, { useState, useContext } from "react";
import {
  featuredProducts,
  leftarrow,
  rightarrow,
} from "../../assets/textAssets";
import "../../styles/featured.css";
import { styles } from "../../styles/styles";
import { Link } from "react-router-dom";
import { NavigationContext } from "../../context/navigationContext";

const FeaturedItemCard = ({
  id,
  image,
  title,
  details,
  features,
  price,
  index,
}) => {
  const { setNavActive, activeNav } = useContext(NavigationContext);
  const truncateDetails = (content, maxLength) => {
    const words = content.split(" ");
    const truncatedWords = words.slice(0, maxLength).join(" ");
    return words.length > maxLength ? `${truncatedWords}...` : content;
  };

  const truncatedDetails = truncateDetails(details, 10);
  return (
    <div className="featuredItemWrapper border border-Grey-15  bg-Grey-08 p-[15px] sm:p[30px] rounded-[12px]">
      <div className="featuredItem">
        <div>
          <img src={image} alt="" />
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
                Read More
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-[5px]">
            {features.map((feature, index) => (
              <p
                key={index}
                className="flex px-[14px] py-[10px] items-center m-[0px] gap-[2px] rounded-[28px] border border-solid border-Grey-15 bg-Grey-10"
              >
                <span>
                  <img
                    className="w-[22px] h-[17px]"
                    src={feature.icon}
                    alt=""
                  />
                </span>
                {feature.featureText}
              </p>
            ))}
          </div>
          <div className="featureditemPriceContainer">
            <div className="price">
              <span>Price</span>
              {`$${price}`}
            </div>
            <div
              className={`buyButton ${styles.buttonPadding} ${styles.purpleButton}`}
            >
              <button className="">
                <Link
                  to={`properties/${index}`}
                  onClick={() => setNavActive("properties")}
                >
                  View Property Details
                </Link>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProperties = ({ featuredProduct = featuredProducts }) => {
  const itemsPerDisplay = 3;
  const noOfPages = Math.ceil(featuredProduct.length / itemsPerDisplay);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerDisplay;
  const endIndex = startIndex + itemsPerDisplay;

  const displayedFeaturedItems = featuredProduct.slice(startIndex, endIndex);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure the page doesn't go below 0
  };

  // Handle click event for the "Next" button
  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, noOfPages)); // Ensure the page doesn't exceed the total number of pages
  };
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
        <div className=" featuredItemListContainer ">
          {displayedFeaturedItems.map((featuredProduct, index) => (
            <FeaturedItemCard key={index} index={index} {...featuredProduct} />
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
              onClick={handlePrevClick}
              disabled={currentPage === 0}
            >
              <img src={leftarrow} alt="" />
            </div>
            <div
              className="next"
              onClick={handleNextClick}
              disabled={currentPage === noOfPages - 1}
            >
              <img src={rightarrow} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeaturedProperties;
