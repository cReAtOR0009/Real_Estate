import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { Houses } from "../assets/textAssets";
import { styles } from "../styles/styles";

import Property2 from "./Property2";

const Property = () => {
  const { propertyid } = useParams();
  const { addToCart, toggleCart } = useContext(CartContext);

  const dummyData = [
    {
      title: "Cozy Family Home",
      description: "A beautiful family home with stunning views",
      price: 300000,
      bedrooms: 4,
      bathrooms: 2,
      size: 2000,
      address: {
        street: "123 Main St",
        city: "Cityville",
        state: "Stateville",
        zipcode: "12345",
      },
      amenities: {
        swimmingPool: true,
        garden: true,
        garage: true,
        gym: false,
        securitySystem: true,
        balcony: false,
        centralHeating: true,
        airConditioning: true,
      },
      additionalFeatures: [
        { name: "Fireplace", description: "Cozy fireplace for winter nights" },
        { name: "Deck", description: "Spacious deck for outdoor entertaining" },
      ],
      rating: [
        {
          value: 4,
          review: "Great property, loved the neighborhood!",
          createdAt: new Date(),
          createdBy: "user123",
        },
      ],
      images: [
        { url: "https://example.com/image1.jpg" },
        { url: "https://example.com/image2.jpg" },
      ],
      propertyType: "House",
      agent: { id: "agent123", ref: "John Doe" },
      tags: ["family-friendly", "great-view"],
      status: "For Sale",
      virtualTour: { url: "https://example.com/virtualtour" },
      propertyHistory: {
        previousOwners: [
          { name: "Previous Owner", contact: "previous@example.com" },
        ],
        saleHistory: [
          {
            soldPrice: 250000,
            soldDate: new Date("2023-01-15"),
            buyer: "Buyer1",
          },
        ],
        rentalHistory: [],
      },
      nearbyAmenities: ["Park", "School", "Supermarket"],
      availability: true,
    },
  ];

  const scrollToTop = (() => {
    window.scrollTo(0, 0);
  })();

  const house = Houses.find((house, index) => index == parseInt(propertyid));
  // console.log("house found:", house);
  if (!house) {
    return <div>no Property Found</div>;
  }

  const { image, title, details, features, price, id } = house;
  // console.log("details: ",{ image, title, details, features, price, id})
  const handleAddToCart = () => {
    addToCart(id, price, details, image, title);
    toggleCart();
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
      <Property2 />
    </>
  );
};

export default Property;
