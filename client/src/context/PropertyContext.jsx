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
  virtualTour:"",
  propertyHistory: {
    previousOwners: [],
    saleHistory: [],
    rentalHistory: [],
  },
  nearbyAmenities: [],
  availability: false,
};

export const formReducer = (state, action) => {
  console.log("state", state)
  switch (action.type) {
    case "ADD_TO_FORM":
      const { name, value } = action.payload;
      // console.log("payload value here", action.payload);
      return {
        ...state,
        [name]: value,
      };
    case "ADD_AMENITIES":
      const { name: amenityName, checked } = action.payload;
      return {
        ...state,
        amenities: {  [amenityName]: checked },
      };

    case "ADD_LOCATION":
      const { name: detailName, newValue } = action.payload;
      return {
        ...state,
        address: {
          ...state.address,
          [detailName]: newValue,
        },
      };
    case "ADD_TAGS":
      const { name: tagName, value: tagValue } = action.payload;
      return {
        ...state,
        [tagName]: [...state.tags, tagValue].join(", "),
      };

    default:
      return state;
  }
};

// const [formData, dispatch] = useReducer(formReducer, initialFormData);

// export const handleChange = (e) => {
//   dispatch({type:"ADD_TO_FORM", payload: e.target});
// };
