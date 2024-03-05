import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { Houses } from "../assets/textAssets";
import { styles } from "../styles/styles";  

const Property = () => {
  const { propertyid } = useParams();
  const { addToCart, toggleCart } = useContext(CartContext);

  const house = Houses.find((house, index) => index == parseInt(propertyid));
  // console.log("house found:", house);
  if (!house) {
    return <div>no Property Found</div>;
  }

  const { image, title, details, features, price, id } = house;
  // console.log("details: ",{ image, title, details, features, price, id})
  const handleAddToCart = () => {
    addToCart(id, price, details, image, title);
    toggleCart()
    // console.log("add to cart handler console: ", { image, title, details, features, price, id})
  }; 
  return (
    <>
      <div
        className={`${styles.houseCardForProperty} flex flex-col  border border-Grey-15 rounded-[12px]`}
      >
        <h2 className={`${styles.cardHeading} text-center`}>{title}</h2>
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
            <p className={`${styles.paragraph}`}>{details}</p>
          </div>
          <div className="flex justify-between mt-[20px]">
            <div>
              <p className="text-[14px] lg:text-[18px] text-Grey-60">price</p>
              <p className="text-[20px]">{price}</p>
            </div>

            <button
              className={`${styles.buttonPadding} rounded-[8px] bg-Purple-60`}
              onClick={handleAddToCart}
            >
              Buy Property
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Property;
