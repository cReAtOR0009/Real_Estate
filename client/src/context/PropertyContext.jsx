import React, { createContext, useReducer } from 'react';

// Define initial state
const initialState = {
  properties: []
};

// Define reducer function
const propertyReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PROPERTY':
      return {
        ...state,
        properties: [...state.properties, action.payload]
      };
    // Add cases for other actions if needed
    default:
      return state;
  }
};

// Create the PropertyContext
export const PropertyContext = createContext();

// Create a PropertyProvider component
export const PropertyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(propertyReducer, initialState);

  // Action creator for adding a property
  const addProperty = (property) => {
    dispatch({ type: 'ADD_PROPERTY', payload: property });
  };

  // You can add more action creators here for other operations

  return (
    <PropertyContext.Provider value={{ state, addProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};

