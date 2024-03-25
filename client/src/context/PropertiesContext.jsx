import React, { useEffect, createContext, useContext, useReducer } from "react";
import { useFetchPropertiesQuery } from "../features/auth/authApiSlice";

export const initialState = {
  //   properties: JSON.parse(localStorage.getItem("properties"))?.properties || [],
  properties: [],
  error: false,
  errorValue: [],
  isLoading: undefined,
};

export const PropertyReducer = (state, action) => {
  console.log("state updated: ", state);
  switch (action.type) {
    case "FETCH_PROPERTIES":
      console.log(state.properties);
      return state;
    case "SET_PROPERTIES":
      const { properties } = action.payload;
      return {
        ...state,
        properties: [...properties],
      };
    case "SET_ERROR_STATE":
      const { error } = action.payload;
      return {
        ...state,
        error: error,
      };
    case "SET_ERROR_VALUE":
      const { errorValue } = action.payload;
      console.log("errror vale from action", errorValue);
      return {
        ...state,
        errorValue: [...state.errorValue, errorValue],
      };

    case "SET_LOADING":
      const { isLoading } = action.payload;
      return { ...state, isLoading: isLoading };
    default:
      return state;
  }
};

export const PropertyContext = createContext();

export const PropertyContextProvider = ({ children }) => {
  const [properties, dispatch] = useReducer(PropertyReducer, initialState);

  const {
    currentData,
    data: data,
    isLoading,
    isError,
    error,
    isFetching,
    status,
    isSuccess,
    isUninitialized,
    refetch,
  } = useFetchPropertiesQuery();

  const getProperties = () => {
    dispatch({ type: "FETCH_PROPERTIES" });
  };
  const setProperties = (properties) => {
    dispatch({ type: "SET_PROPERTIES", payload: { properties } });
  };
  const setPropertiesError = ({ error }) => {
    dispatch({ type: "SET_ERROR_STATE", payload: { error } });
  };

  const setPropertiesLoading = ({ isLoading }) => {
    dispatch({ type: "SET_LOADING", payload: { isLoading } });
  };

  const setErrorValue = (error) => {
    dispatch({ type: "SET_ERROR_VALUE", payload: { errorValue: error } });
  };

  const setPropertiesFetchState = async (data) => {
    console.log("fectching Properties.....");
    if (isLoading) {
      console.log("isLoading: ", isLoading);
      setPropertiesLoading({ isLoading: isLoading });
    } else if (isError) {
      console.log("isError: ", isError);
      setPropertiesError({ error: isError });
      setErrorValue(error.error);
    } else if (isSuccess && data) {
      console.log("is loading after success:", isLoading);
      setPropertiesLoading({ isLoading: isLoading });
      // If no error, set houses data from the fetched data
      setProperties([...data.data]);
      //   setErrorValue(null)
    }
  };

  useEffect(() => {
    getProperties();
    setPropertiesFetchState();

    // return async () => {
    setPropertiesFetchState(data);
    // };
    // localStorage.setItem("properties", JSON.stringify(data));
  }, [data, isLoading, isSuccess, error]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        getProperties,
        // setPropertiesFetchState,
        setProperties,
        setPropertiesError,
        setErrorValue,
        setPropertiesLoading,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
