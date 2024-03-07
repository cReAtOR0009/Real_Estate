import React, { useEffect, createContext, useContext, useReducer } from "react";

export const initialFormData = {
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
  images: [],
  propertyType: "",
  agent: { id: "", ref: "" },
  tags: [],
  status: "",
  virtualTour: "",
  propertyHistory: {
    previousOwners: [],
    saleHistory: [],
    rentalHistory: [],
  },
  nearbyAmenities: [],
  availability: false,
};

export const formReducer = (state, action) => {
  console.log("state", state);
  switch (action.type) {
    case "ADD_TO_FORM":
      const { name, value } = action.payload;
      console.log("payload value here", action.payload);
      return {
        ...state,
        [name]: value,
      };
    case "ADD_AMENITIES":
      const { name: amenityName, value: checked } = action.payload;
      console.log("amenity name:", amenityName, "checked:", checked);
      return {
        ...state,
        amenities: { ...state.amenities, [amenityName]: checked },
        // amenities: { ...state.amenities[amenityName], [amenityName]: checked },
      };

    case "ADD_LOCATION":
      const { name: detailName, value: newValue } = action.payload;
      return {
        ...state,
        address: {
          ...state.address,
          [detailName]: newValue,
        },
      };
    case "ADD_TAGS":
      const { name: tagName, value: tagValue } = action.payload;
      // let tagValueArray = tagValue.split(",").map((tag) => tag.trim());
      console.log("tagname :", tagName, "tagvalue", tagValue);
      return {
        ...state,
        [tagName]: tagValue,
      };

    case "ADD_NEARBY_AMENIIES":
      const { name: amenity, value: amenityValue } = action.payload;
      let amenityValueValueArray = amenityValue
        .split(",")
        .map((tag) => tag.trim());
      console.log("amenity :", amenity, "amenityValue", amenityValue);
      return {
        ...state,
        [amenity]: {...state.amenities, ...[amenityValueValueArray]},
      };
    case "ADD_ADDITIONAL_FEATURES_FIELD":
      return {
        ...state,
        additionalFeatures: [
          ...state.additionalFeatures,
          { name: "", description: "" },
        ],
      };
    case "ADD_CONTENT_TO_FEATURES":
      const { index, name: featureName, value: featureValue } = action.payload;
      // console.log("name_: ", featureName, "value_ :", featureValue);
      const updatedFeatures = [...state.additionalFeatures];
      updatedFeatures[index] = {
        ...updatedFeatures[index],
        [featureName]: featureValue,
      };
      return {
        ...state,
        additionalFeatures: updatedFeatures,
      };

    case "ADD_IMAGES":
      const { value: imageUrls } = action.payload;
      return {
        ...state,
        images: [...state.images, ...imageUrls],
      };

    default:
      return state;
  }
};

// const [formData, dispatch] = useReducer(formReducer, initialFormData);

// export const handleChange = (e) => {
//   dispatch({type:"ADD_TO_FORM", payload: e.target});
// };
