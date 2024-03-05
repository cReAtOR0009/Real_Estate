// const {title, description, price, bedrooms, bathrooms, size, address, ammenities, additionalFeatures, rating, images, propertyType, salesHistory, nearbyAmenities, availability} = house
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { Houses } from "../assets/textAssets";
import { styles } from "../styles/styles";
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
const Property2 = () => {
  const { propertyid } = useParams();
  const { addToCart, toggleCart } = useContext(CartContext);

  const dummyData = [
    {
      title: "Cozy Family Home",
      description:
        "A beautiful family home with stunning views,  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque harum totam odit fugiat illo esse, velit, magni necessitatibus reprehenderit, vero impedit ex amet porro assumenda? At voluptatum impedit veniam laudantium nulla eligendi expedita quam deserunt, quaerat recusandae rerum vel quos, id cum fugit maiores harum ipsum ipsa? Nemo in eos, suscipit hic ipsam natus cupiditate est placeat exercitationem laboriosam minima dolorum eaque quam, voluptatem id provident culpa consequatur ratione fuga officia repudiandae numquam. Consequatur asperiores, quod voluptates eum odio aliquam quia vitae voluptatum eveniet beatae veritatis at architecto, quam doloremque quae! Natus, minus quibusdam hic nostrum reprehenderit iste nisi dicta vitae facilis nulla ex laborum rem adipisci mollitia! Aut soluta placeat explicabo dolore consequatur iure molestias doloremque nihil reprehenderit cum eum velit quae, ipsum minus ullam, nostrum mollitia recusandae repellat! Molestiae eius vel quod perspiciatis, neque dignissimos optio mollitia? Eaque pariatur qui ullam! Expedita optio molestias excepturi quaerat praesentium perspiciatis error at officiis earum laboriosam, qui recusandae impedit modi sed labore iste nobis. Vel fugiat veniam laborum architecto modi odit dicta ipsum inventore mollitia incidunt. Nesciunt nostrum provident accusamus blanditiis perspiciatis, quasi cum neque doloremque excepturi in enim? Quae debitis tempora sit beatae molestiae? Repudiandae eum ratione voluptates maxime doloribus.",
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
        {
          value: 5,
          review: "Great property, loved the neighborhood!",
          createdAt: new Date(),
          createdBy: "user123",
        },
        {
          value: 5,
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
  // console.log("images", images);

  const handleAddToCart = () => {
    let image = images[0];
    addToCart(id, price, details, image, title);
    toggleCart();
    // console.log("add to cart handler console: ", { image, title, details, features, price, id})
  };
  return (
    <>
      <div
        className={`${styles.houseCardForProperty} flex flex-col text-[15px] p-[20px] border border-Grey-15 rounded-[12px]`}
      >
        <div className="imageContainer w-[auto]">
          <img className="object-cover w-[100%]" src={images[0].url} alt="" />
        </div>
        <div>
          <h2 className={`${styles.cardHeading} text-center`}>{title}</h2>
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
            {address.street},{address.city},{address.state},{address.zipcode}
          </p>
        </div>
        <div className="flex justify-between mt-[20px] border-Purple-60 py-[10px] border-y-2">
          <div>
            <p className="text-[20px] lg:text-[22px] text-Grey-60">Price</p>
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
          <p className="flex px-[14px] py-[10px] items-center m-[0px] gap-[2px] rounded-[28px] border border-solid border-Grey-40 bg-Grey-10">
            <MdBedroomChild size={22} />
            BedRooms-{bedrooms}
          </p>
          <p className="flex px-[14px] py-[10px] items-center m-[0px] gap-[2px] rounded-[28px] border border-solid border-Grey-40 bg-Grey-10">
            <MdBathroom size={22} />
            Bathrooms-{bathrooms}
          </p>
          <p className="flex px-[14px] py-[10px] items-center m-[0px] gap-[2px] rounded-[28px] border border-solid border-Grey-40 bg-Grey-10">
            <BsRulers size={22} /> Size-{size}squareMeter
          </p>
        </div>

        <div>
          <h2 className="text-[20px] ">Features: </h2>
          <div className="flex flex-wrap border border-y-[2px] border-Grey-15 p-[10px] gap-[0px]">
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
              return <AdditionalFeatures key={index} {...additionalFeature} />;
            })}
          </div>
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
    </>
  );
};

export default Property2;
