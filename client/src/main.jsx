import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NavigationProvider } from "./context/navigationContext.jsx";
import { CartContextProvider } from "./context/cartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartContextProvider>
    <NavigationProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </NavigationProvider>
  </CartContextProvider>
);
