import React, { useEffect, createContext, useContext, useReducer } from "react";

// Define the initial state for the cart
const initialState = {
  cartstate: false,
  user: "",
  properties: JSON.parse(localStorage.getItem("carted_Properties"))?.properties || [],
  total: 0,
};
// {id, price, quantity}

// Define the reducer function to handle actions
const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const { id, price } = action.payload;
        // Check if property exists in cart already
        const alreadyExistInCart = state.properties.find(
          (property) => property.id === id
        );
        if (alreadyExistInCart) {
          return {
            ...state,
            
          };
        } else {
          return {
            ...state,
            properties: [...state.properties, { id, quantity: 1, price }],
          };
        }
      default:
        return state;
    }
    
  };
  

// Create the cart context
export const CartContext = createContext();

// Create the provider component
export const CartContextProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Function to add an item to the cart
  const addToCart = (id, price) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, price } });
    console.log('cart state:', cart)
  };

  useEffect(() => {
    localStorage.setItem("carted_Properties", JSON.stringify(cart));
  }, [cart.properties]);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
