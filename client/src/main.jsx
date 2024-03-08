import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NavigationProvider } from "./context/navigationContext.jsx";
import { CartContextProvider } from "./context/cartContext.jsx";
// import { PropertyProvider } from "./context/PropertyContext.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CartContextProvider>
      <NavigationProvider>
        {/* <PropertyProvider> */}
        <React.StrictMode>
          <App />
        </React.StrictMode>
        {/* </PropertyProvider> */}
      </NavigationProvider>
    </CartContextProvider>
  </Provider>
);
