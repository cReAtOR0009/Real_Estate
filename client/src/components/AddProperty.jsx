import React, { useState, useContext, useReducer } from "react";
import { styles } from "../styles/styles";
import { formReducer, initialFormData } from "../context/PropertyContext";

const AddProperty = () => {
  const [formData, dispatch] = useReducer(formReducer, initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(checked, name, type, value, checked);
    // const newValue = type === "checkbox" ? checked : value;
    if (name === "tags") {
      dispatch({
        type: "ADD_TAGS",
        payload: { name, value },
      });
    }

    if (name === "nearbyAmenities") {
      dispatch({
        type: "ADD_NEARBY_AMENIIES",
        payload: { name, value },
      });
    }

    if (name.startsWith("address.")) {
      // Check if the field is in the address object
      const detailName = name.split(".")[1]; // Extract the detail name
      dispatch({
        type: "ADD_LOCATION",
        payload: { name: detailName, value },
      }); // Dispatch action to update address
    } else if (name.startsWith("amenities.")) {
      const detailName = name.split(".")[1];
      // let name = detailName;
      dispatch({
        type: "ADD_AMENITIES",
        payload: { name: detailName, value: checked },
      });
    } else {
      dispatch({ type: "ADD_TO_FORM", payload: { name, value } }); // Dispatch action to update other fields
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log("files :", files)
    // let value = files
    const imageFiles = files.map((file) => {
      const imageUrl = URL.createObjectURL(file);
      console.log("imageUrl:", imageUrl)
      return imageUrl;
    });

    console.log("imageFiles:", imageFiles)
    dispatch({ type: "ADD_IMAGES", payload: {value:files} });
  };

  const handleFeatureDescriptionChange = (e, index) => {
    const { value, name } = e.target;
    dispatch({
      type: "ADD_CONTENT_TO_FEATURES",
      payload: { index, name, value },
    });
  };

  const [errors, setErrors] = useState({});

  console.log("errors", errors);

  const validateForm = () => {
    let isValid = true;
    for (const [key, value] of Object.entries(formData)) {
      if (value === "" && key !== "availability") {
        setErrors({
          ...errors,
          [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
        });
        isValid = false;
      }
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData,", formData);
    const formIsValid = validateForm();
    if (formIsValid) {
      alert("form submitted successfuly");
      //   setFormData({ ...initialFormData });
    } else {
      alert(errors.status);
    }
    // Reset form data after submission if needed
  };

  const addAdditionalFeature = () => {
    dispatch({ type: "ADD_ADDITIONAL_FEATURES_FIELD" });
  };

  return (
    <div className=" mt-[150px] p-[10px]">
      <h2 className="text-[25px] text-center">Add New Property</h2>
      {errors.title && <span className="text-[20px]">{errors.title}</span>}
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
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
        />

        <label>City:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
        />

        <label>State:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="address.state"
          value={formData.address.state}
          onChange={handleChange}
        />

        <label>Zipcode:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="address.zipcode"
          value={formData.address.zipcode}
          onChange={handleChange}
        />

        {/* Amenities */}
        <div className="flex flex-wrap items-center gap-[10px] border border-solid border-Grey-60 my-[10px] p-[5px]">
          <label>Swimming Pool:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.swimmingPool"
            checked={formData.amenities.swimmingPool}
            onChange={handleChange}
          />

          <label>Garden:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.garden"
            checked={formData.amenities.garden}
            onChange={handleChange}
          />

          <label>Garage:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.garage"
            checked={formData.amenities.garage}
            onChange={handleChange}
          />

          <label>Gym:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.gym"
            checked={formData.amenities.gym}
            onChange={handleChange}
          />

          <label>securitySystem:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.securitySystem"
            checked={formData.amenities.securitySystem}
            onChange={handleChange}
          />

          <label>balcony:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.balcony"
            checked={formData.amenities.balcony}
            onChange={handleChange}
          />

          <label>centralHeating:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.centralHeating"
            checked={formData.amenities.centralHeating}
            onChange={handleChange}
          />

          <label>airConditioning:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.airConditioning"
            checked={formData.amenities.airConditioning}
            onChange={handleChange}
          />
        </div>

        {/* nearby amenities */}

        <label>Nearby Amenities:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          value={formData.nearbyAmenities}
          type="text"
          name="nearbyAmenities"
          onChange={handleChange}
        />

        {/* Additional Features */}
        <div className="flex flex-col justify-center items-center flex-wrap gap-[10px]">
          <label>Additional Features:</label>
          {formData.additionalFeatures.map((feature, index) => (
            <div key={index} className="flex justify-center flex-wrap w-[100]">
              <input
                className="p-[5px] border border-solid border-Grey-60 h-[50px]"
                type="text"
                name="name"
                value={feature.name}
                onChange={(e) => handleFeatureDescriptionChange(e, index)}
                placeholder="Name"
              />
              <input
                className="p-[5px] border border-solid border-Grey-60 h-[50px]"
                type="text"
                name="description"
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
          <input type="file" multiple onChange={handleImageUpload} />
          {formData.images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index}`} />
          ))}
        </div>

        {/* Add input className="p-[5px] border border-solid border-Grey-60 h-[50px]" fields for other properties */}
        <label>Property Type:</label>
        <select
          className="bg-Grey-10 text-[white]"
          name="propertyType"
          id="propertyType"
          onChange={handleChange}
        >
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="Land">Land</option>
          <option value="Commercial">Commercial</option>
          <option value="Villa">Villa</option>
        </select>

        <label>Tags:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Separate tags with comma"
        />

        <label>Status:</label>
        <select
          className="bg-Grey-10 text-[white]"
          name="propertyType"
          id="propertyType"
          onChange={handleChange}
        >
          <option value="status">status</option>
          <option value="For Sale">For Sale</option>
          <option value="For Sale">For Sale</option>
          <option value="Sold">Sold</option>
          <option value="Rented">Rented</option>
        </select>

        <label>Virtual Tour:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="virtualTour"
          value={formData.virtualTour}
          onChange={handleChange}
        />

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
