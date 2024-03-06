import React, { useState, useContext, useReducer } from "react";
import { PropertyContext } from "../context/PropertyContext"; // assuming you have a PropertyContext defined
import { styles } from "../styles/styles";

const AddProperty = () => {
  const { addProperty } = useContext(PropertyContext); // assuming you have an addProperty action in your PropertyContext

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    size: 0,
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    amenities: {
      swimmingPool: false,
      garden: false,
      garage: false,
      gym: false,
      securitySystem: false,
      balcony: false,
      centralHeating: false,
      airConditioning: false,
    },
    additionalFeatures: [],
    rating: [],
    images: [],
    propertyType: "",
    agent: { id: "", ref: "" },
    tags: [],
    status: "",
    virtualTour: { url: "" },
    propertyHistory: {
      previousOwners: [],
      saleHistory: [],
      rentalHistory: [],
    },
    nearbyAmenities: [],
    availability: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      amenities: { ...formData.amenities, [name]: checked },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty(formData);
    // Reset form data after submission if needed
    setFormData({ ...initialFormData });
  };

  const addAdditionalFeature = () => {
    setFormData({
      ...formData,
      additionalFeatures: [
        ...formData.additionalFeatures,
        { name: "", description: "" },
      ],
    });
  };

  const addImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, { url: "" }],
    });
  };

  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(",").map((tag) => tag.trim());
    setFormData({ ...formData, tags: tagsArray });
  };

  return (
    <div className=" mt-[150px] p-[10px]">
      <h2 className="text-[25px] text-center">Add New Property</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Price:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <label>Bedrooms:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="number"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        />

        <label>Bathrooms:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
        />

        <label>Size:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="number"
          name="size"
          value={formData.size}
          onChange={handleChange}
        />

        <label>Street:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="street"
          value={formData.address.street}
          onChange={handleChange}
        />

        <label>City:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="city"
          value={formData.address.city}
          onChange={handleChange}
        />

        <label>State:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="state"
          value={formData.address.state}
          onChange={handleChange}
        />

        <label>Zipcode:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="zipcode"
          value={formData.address.zipcode}
          onChange={handleChange}
        />

        {/* Amenities */}
        <div className="flex flex-wrap items-center gap-[10px] border border-solid border-Grey-60 my-[10px] p-[5px]">
          <label>Swimming Pool:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="swimmingPool"
            checked={formData.amenities.swimmingPool}
            onChange={handleChange}
          />

          <label>Garden:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="garden"
            checked={formData.amenities.garden}
            onChange={handleChange}
          />

          <label>Garage:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="garage"
            checked={formData.amenities.garage}
            onChange={handleChange}
          />

          <label>Gym:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="gym"
            checked={formData.amenities.gym}
            onChange={handleChange}
          />

          <label>securitySystem:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="securitySystem"
            checked={formData.amenities.securitySystem}
            onChange={handleChange}
          />

          <label>balcony:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="balcony"
            checked={formData.amenities.balcony}
            onChange={handleChange}
          />

          <label>centralHeating:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="centralHeating"
            checked={formData.amenities.centralHeating}
            onChange={handleChange}
          />

          <label>airConditioning:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="airConditioning"
            checked={formData.amenities.airConditioning}
            onChange={handleChange}
          />
        </div>

        {/* Additional Features */}
        <div className="flex flex-col justify-center items-center flex-wrap gap-[10px]">
          <label>Additional Features:</label>
          {formData.additionalFeatures.map((feature, index) => (
            <div key={index} className="flex justify-center flex-wrap w-[100]">
              <input
                className="p-[5px] border border-solid border-Grey-60 h-[50px]"
                type="text"
                value={feature.name}
                onChange={(e) => handleFeatureChange(e, index)}
                placeholder="Name"
              />
              <input
                className="p-[5px] border border-solid border-Grey-60 h-[50px]"
                type="text"
                value={feature.description}
                onChange={(e) => handleFeatureDescriptionChange(e, index)}
                placeholder="Description"
              />
            </div>
          ))}
          <button
            className={`${styles.buttonPadding} bg-Purple-60`}
            type="button"
            onClick={addAdditionalFeature}
          >
            Add Feature
          </button>
        </div>

        {/* Images */}
        <div className="flex flex-col justify-center items-center flex-wrap gap-[10px]">
          <label>Images:</label>
          {formData.images.map((image, index) => (
            <div key={index} className="flex justify-center flex-wrap w-[100]">
              <input
                className="p-[5px] border border-solid border-Grey-60 h-[50px]"
                type="text"
                value={image.url}
                onChange={(e) => handleImageChange(e, index)}
                placeholder="Image URL"
              />
            </div>
          ))}
          <button
            className={`${styles.buttonPadding} bg-Purple-60`}
            type="button"
            onClick={addImage}
          >
            Add Image
          </button>
        </div>

        {/* Add input className="p-[5px] border border-solid border-Grey-60 h-[50px]" fields for other properties */}
        <label>Property Type:</label>
        <select
          className="bg-Grey-10 text-[white]"
          name="propertyType"
          id="propertyType"
        >
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="Land">Land</option>
          <option value="Commercial">Commercial</option>
          <option value="Villa">Villa</option>
        </select>

        <label>Agent ID:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="agentId"
          value={formData.agent.id}
          onChange={handleChange}
        />

        <label>Agent Reference:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="agentRef"
          value={formData.agent.ref}
          onChange={handleChange}
        />

        <label>Tags:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="tags"
          value={formData.tags.join(", ")}
          onChange={handleTagsChange}
          placeholder="Separate tags with comma"
        />

        <label>Status:</label>
        <select
          className="bg-Grey-10 text-[white]"
          name="propertyType"
          id="propertyType"
        >
          <option value="status">status</option>
          <option value="For Sale">For Sale</option>
          <option value="For Sale">For Sale</option>
          <option value="Sold">Sold</option>
          <option value="Rented">Rented</option>
        </select>

        {/* Add more input className="p-[5px] border border-solid border-Grey-60 h-[50px]" fields for other properties */}
        {/* <div className="flex tetx-center items-center justify-center"> */}
        <button
          className=" px-[10px] my-[20px] py-[15px] bg-Purple-60"
          type="submit"
        >
          Submit
        </button>
        {/* </div> */}
      </form>
    </div>
  );
};

export default AddProperty;
