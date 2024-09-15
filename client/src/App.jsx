import { useState } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromChildren,
} from "react-router-dom";
import PageLayout from "./layouts/pageLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Properties from "./pages/Properties";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Property from "./pages/propertyDetails/PropertyDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddProperty from "./components/AddProperty";
import RequireAuth from "./features/auth/RequireAuth";
import "./App.css";
import Welcome from "./features/auth/Welcome";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="about us" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="properties" element={<Properties />} />
        <Route path="Contact us" element={<Contact />} />
        <Route path="Login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<RequireAuth />}>
          <Route path="AddProperties" element={<AddProperty />} />
          <Route path="welcome" element={<Welcome />} />
        </Route>
        <Route path="properties/:propertyid" element={<Property />} />
      </Route>
      // </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default App;
