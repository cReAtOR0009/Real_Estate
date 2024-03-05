// const {title, description, price, bedrooms, bathrooms, size, address, ammenities, additionalFeatures, rating, images, propertyType, salesHistory, nearbyAmenities, availability} = house
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { Houses } from "../assets/textAssets";
import { styles } from "../styles/styles";

import { MdBathroom } from "react-icons/md";
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

const AmenitiesCard = ({ icon, name }) => {
  return (
    <p
      className={`${styles.paragraph} w-[auto] inline-block px-[12px] py-[6px] lg:px-[14px] lg:py-[8px] text-[14px] rounded-[28px] border border-Grey-15 text-white-90`}
    ></p>
  );
};

const Property2 = () => {
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

  const {
    title,
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
    propertyType,
    salesHistory,
    nearbyAmenities,
    availability,
  } = dummyData[0];
  console.log("images", images);

  const handleAddToCart = () => {
    let image = images[0];
    addToCart(id, price, details, image, title);
    toggleCart();
    // console.log("add to cart handler console: ", { image, title, details, features, price, id})
  };
  return (
    <>
      <div
        className={`${styles.houseCardForProperty} flex flex-col text-[20px] border border-Grey-15 rounded-[12px]`}
      >
        <div className="imageContainer w-[auto]">
          <img className="object-cover w-[100%]" src={images[0].url} alt="" />
        </div>
        <h2 className={`${styles.cardHeading} text-center`}>{title}</h2>
        <div className="pt-[24px] md:[30px] lg:[40px]">
          <p className={`${styles.paragraph}`}>{description}</p>
        </div>
        <div className="pt-[24px] md:[30px] lg:[40px]">
          <p className={`${styles.paragraph}`}>
            <MdBedroomChild size={50} />
            {bedrooms}
            <MdBathroom size={50} />
            {bathrooms}
          </p>
          <BsRulers size={50} /> {size}
        </div>

        <div>
          <div className="flex justify-between pt-[24px] md:[30px] lg:[40px]">
            <p className={`${styles.paragraph}`}>
              {" "}
              {amenities.swimmingPool == true ? (
                <FaSwimmingPool size={50} />
              ) : (
                " no pool"
              )}
            </p>
            <p className={`${styles.paragraph}`}>
              {" "}
              {amenities.garden == true ? (
                <FaPlantWilt size={50} />
              ) : (
                "no garden"
              )}
            </p>
            <p className={`${styles.paragraph}`}>
              {" "}
              {amenities.garage == true ? (
                <GiHomeGarage size={50} />
              ) : (
                "no garage"
              )}
            </p>
            <p className={`${styles.paragraph}`}>
              {" "}
              {amenities.gym === true ? <CgGym size={50} /> : "no gym"}
            </p>
            <p className={`${styles.paragraph}`}>
              {" "}
              {amenities.securitySystem ? (
                <GrShieldSecurity size={50} />
              ) : (
                "no security system"
              )}
            </p>
            <p className={`${styles.paragraph}`}>
              {" "}
              {amenities.balcony === true ? (
                <MdBalcony size={50} />
              ) : (
                "no balcony"
              )}
            </p>
            <p className={`${styles.paragraph}`}>
              {" "}
              {amenities.centralHeating === true ? (
                <GiHotSpices size={50} />
              ) : (
                "no central heating"
              )}
            </p>
            <p className={`${styles.paragraph}`}>
              {" "}
              {amenities.airConditioning ? (
                <TbAirConditioning size={50} />
              ) : (
                "no aAir Conditioning system"
              )}
            </p>
          </div>
          <div>
            <p>
              {address.street},{address.city},{address.state},{address.zipcode}
            </p>
          </div>
          <div>{propertyType}</div>
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

export default Property2;
