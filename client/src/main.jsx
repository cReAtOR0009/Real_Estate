import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NavigationProvider } from "./context/navigationContext.jsx";
import { CartContextProvider } from "./context/cartContext.jsx";
// import { PropertyProvider } from "./context/PropertyContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartContextProvider>
    <NavigationProvider>
      {/* <PropertyProvider> */}
        <React.StrictMode>
          <App />
        </React.StrictMode>
      {/* </PropertyProvider> */}
    </NavigationProvider>
  </CartContextProvider>
);
