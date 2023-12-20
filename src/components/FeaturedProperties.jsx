import React from "react";

const featuredItemCard = () => {
  return (
    <div className="featuredItemWrapper">
      <div className="featuredItem">
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <div>
            <h2></h2>
            <p></p>
          </div>
          <div className="productTags"></div>
          <div>
            <div className="price"></div>
            <div className="buyButton">
              <button></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeaturedProperties = () => {
  return (
    <div className="featuredItemsContainer">
      <div className="featureItemHeader">
        <div>
          <img src="" alt="" />
          <h3>Featured Properties</h3>
          <p>
            Explore our handpicked selection of featured properties. Each
            listing offers a glimpse into exceptional homes and investments
            available through Estatein. Click "View Details" for more
            information.
          </p>
        </div>
        <div>
          <button>View All Properties</button>
        </div>
      </div>

      <div className="featuredItemsContainerWrapper">
        <div className="featuredItemListContainer"></div>
        <div></div>
      </div>
    </div>
  );
};
