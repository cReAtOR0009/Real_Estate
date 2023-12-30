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

import "./App.css";
// import { NavBar } from "./components/NavBar";
// import Hero from "./components/Hero";
// import { FeaturedProperties } from "./components/FeaturedProperties";
// import { Testimonials } from "./components/Testimonials";
// import Faq from "./components/Faq";
// import StartJourney from "./components/StartJourney";
// import Footer from "./components/Footer";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="about us" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="properties" element={<Properties />} />
        <Route path="Contact us" element={<Contact />} />
      </Route>
      // </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default App;
