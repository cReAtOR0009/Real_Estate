import React from "react";
import { featuredProducts } from "../assets/textAssets";

const FeaturedItemCard = ({image, title, details, features, price}) => {
  return (
    <div className="featuredItemWrapper">
      <div className="featuredItem">
        <div>
          <img src={image} alt="" />
        </div>
        <div>
          <div className="featuredItemText">
            <h2>{title}</h2>
            <p>{details}</p>
          </div>
          <div className="productTags">
            {features.map((feature, index) => (
                <p key={index} className="feature">
                   <span><img src={feature.icon} alt="" /></span>
                   {feature.featureText}
                </p>
            ))}
          </div>
          <div className="featureditemPriceContainer" >
            <div className="price"><span>Price:</span>{`$${price}`}</div>
            <div className="buyButton">
              <button>View Property Details</button>
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
        <div className="featuredItemListContainer">
            {featuredProducts.map((featuredProduct, index)=> (
                <FeaturedItemCard key={index} {...featuredProduct} />
            ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};
