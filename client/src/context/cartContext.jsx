import React, { useEffect, createContext, useContext, useReducer } from "react";

// Define the initial state for the cart
const initialState = {
  cartstate: false,
  user: "",
  properties:
    JSON.parse(localStorage.getItem("carted_Properties"))?.properties || [],
  total: 0,
};
// {id, price, quantity}

// Define the reducer function to handle actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { id, price, description, image, title } = action.payload;
      // console.log("payload data", { id, price, description, image, title });
      // Check if property exists in cart already
      const alreadyExistInCart = state.properties.find(
        (property) => property.id === id
      );
      console.log("alreadyExistInCart: ", alreadyExistInCart);
      if (alreadyExistInCart) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          properties: [
            ...state.properties,
            { id, quantity: 1, price, description, image, title },
          ],
        };
      }
    case "DELETE_ITEM":
      const { id: itemId } = action.payload;
      return {
        ...state,
        properties: [
          ...state.properties.filter((property) => property.id !== itemId),
        ],
      };
    case "TOGGLE_CART":
      return {
        ...state,
        cartstate: !state.cartstate,
      };

    case "SET_CART_TO_FALSE":
      return {
        ...state,
        cartstate: (state.cartstate = false),
      };
    default:
      return state;
  }
};

// Create the cart context
export const CartContext = createContext();

// Create the provider component
export const CartContextProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // console.log("cart :", cart);

  // Function to add an item to the cart
  const addToCart = (id, price, description, image, title) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, price, description, image, title },
    });
    console.log("cart :", cart);
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
    console.log("cart state", cart.cartstate);
  };

  const deleteCartItem = (id) => {
    dispatch({ type: "DELETE_ITEM", payload: { id } });
    console.log("cart Delete Operation Performed: ", cart, "id :", id);
  };

  const setCartToFalse = () => {
    dispatch({ type: "SET_CART_TO_FALSE" });
  };

  useEffect(() => {
    localStorage.setItem("carted_Properties", JSON.stringify(cart));
  }, [cart.properties]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, toggleCart, deleteCartItem, setCartToFalse }}
    >
      {children}
    </CartContext.Provider>
  );
};
