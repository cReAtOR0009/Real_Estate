import { useContext, createContext, useState, useEffect } from "react";

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState("home");
  
  const setNavActive = (nav) => {
    setActiveNav(nav);
  };

  return (
    <NavigationContext.Provider
      value={{ setNavActive, activeNav, setActiveNav }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
