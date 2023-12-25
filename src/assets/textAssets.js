import { logo } from "./imageImporter";
import {
  iconContainer,
  iconContainer1,
  iconContainer2,
  iconContainer3,
  arrowIcon,
  bedroomicon,
  bathroomicon,
  villaicon,
  house1,
  house2,
  house3,
  leftarrow,
  rightarrow,
  biggeststar,
  biggerstar,
  bigstar,
  ratingicon,
  profile1,
  profile2,
  profile3,
  profile4,
} from "./imageImporter";
export { leftarrow, rightarrow, biggeststar, biggerstar, bigstar, ratingicon };

export const navLinks = [
  { title: "Home", id: "home" },
  { title: "About us", id: "about-us" },
  { title: "Properties", id: "properties" },
  { title: "Services", id: "services" },
];

export const companydetails = {
  title: "Real Estate",
};

export const achievement1 = [
  { numbers: 200, title: "Happy Customers" },
  { numbers: 10000, title: "Properties For Clients" },
  { numbers: 16, title: "Years of Experience" },
];

export const offers = [
  { offer: "Find Your Dream Home", icon: iconContainer, icon2: arrowIcon },
  { offer: "Unlock Property Value", icon: iconContainer1, icon2: arrowIcon },
  {
    offer: "Effortless Property Management",
    icon: iconContainer2,
    icon2: arrowIcon,
  },
  {
    offer: "Smart Investments, Informed Decisions",
    icon: iconContainer3,
    icon2: arrowIcon,
  },
];

export const featuredProducts = [
  {
    title: "Seaside Serenity Villa",
    details:
      "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood... Read More",
    image: house1,
    features: [
      { icon: bedroomicon, featureText: "4-Bedroom" },
      { icon: bathroomicon, featureText: "3-Bathroom" },
      { icon: villaicon, featureText: "villa" },
    ],
    price: 550000,
  },
  {
    title: "Metropolitan Haven",
    details:
      "A chic and fully-furnished 2-bedroom apartment with panoramic city... Read More",
    image: house2,
    features: [
      { icon: bedroomicon, featureText: "4-Bedroom" },
      { icon: bathroomicon, featureText: "3-Bathroom" },
      { icon: villaicon, featureText: "villa" },
    ],
    price: 550000,
  },
  {
    title: "Rustic Retreat Cottage",
    details:
      "An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community... Read More",
    image: house3,
    features: [
      { icon: bedroomicon, featureText: "4-Bedroom" },
      { icon: bathroomicon, featureText: "3-Bathroom" },
      { icon: villaicon, featureText: "villa" },
    ],
    price: 550000,
  },
];

export const testimonials = [
  {
    rating: 5,
    title: "Exceptional Service!",
    content:
      "I am incredibly impressed with the level of service I received. The team went above and beyond to meet my needs. Highly recommended!",
    profile: profile1,
    name: "John Doe",
    address: "123 Main Street, Cityville, USA",
  },
  {
    rating: 5,
    title: "Great Product Quality",
    content: `The product exceeded my expectations in terms of quality. I've been a satisfied customer for years and will continue to be one.`,
    profile: profile2,
    name: "Jane Smith",
    address: "456 Oak Avenue, Townsville, Canada",
  },
  {
    rating: 5,
    title: "Good Customer Support",
    content:
      "Had a small issue, but the customer support team was quick to resolve it. Appreciate the prompt and effective assistance.",
    profile: profile3,
    name: "Alex Johnson",
    address: "789 Pine Lane, Villagetown, Australia",
  },
  //   {
  //     rating: 5,
  //     title: "Impressive Turnaround Time",
  //     content:
  //       "I needed a quick turnaround, and they delivered! The efficiency and speed of their service are truly commendable.",
  //     profile: profile4,
  //     name: "Emily Brown",
  //     address: "101 Cedar Street, Hamletville, UK",
  //   },
  //   {
  //     rating: 4,
  //     title: "Reliable and Trustworthy",
  //     content:
  //       "Reliability is crucial for me, and this company has consistently proven to be trustworthy. I trust them with all my needs.",
  //     profile: profile1,
  //     name: "Robert Taylor",
  //     address: "202 Birch Road, Suburbia, Germany",
  //   },
  //   {
  //     rating: 2,
  //     title: "Room for Improvement",
  //     content:
  //       "While the product was okay, I believe there is room for improvement in certain aspects. Hope to see positive changes in the future.",
  //     profile: profile3,
  //     name: "Lisa Davis",
  //     address: "303 Elm Street, Downtown, France",
  //   },
  //   {
  //     rating: 5,
  //     title: "Excellent Communication",
  //     content:
  //       "Communication was excellent throughout the entire process. They kept me informed and ensured I was satisfied every step of the way.",
  //     profile: profile2,
  //     name: "Michael Wilson",
  //     address: "404 Maple Lane, Uptown, Spain",
  //   },
];

export const faqs = [
  {
    question: "How can I start the process of buying a home?",
    answer:
      "To begin the home-buying process, you can start by getting pre-approved for a mortgage, identifying your budget, and working with a real estate agent to find properties that match your criteria.",
  },
  {
    question: "What factors should I consider when selling my property?",
    answer:
      "When selling your property, consider factors such as setting the right asking price, enhancing curb appeal, staging your home, and working with a real estate professional to market and negotiate the sale.",
  },
  {
    question: "How can I determine the market value of my home?",
    answer:
      "The market value of your home can be determined by conducting a comparative market analysis (CMA), considering recent sales of similar properties in your area, and consulting with a real estate agent.",
  },
  // {
  //   question: 'What is the role of a real estate agent in the home-buying process?',
  //   answer: 'A real estate agent assists buyers by providing property listings, arranging property showings, negotiating offers, and guiding clients through the entire home-buying process, including inspections and closing.'
  // },
  // {
  //   question: 'How long does it typically take to sell a property?',
  //   answer: 'The time it takes to sell a property can vary based on factors such as location, market conditions, and property features. On average, it may take a few weeks to several months to secure a buyer.'
  // },
  // {
  //   question: 'What is a home inspection, and is it necessary?',
  //   answer: `A home inspection is a thorough examination of a property's condition. While not mandatory, it is highly recommended for buyers to identify any potential issues. Sellers may also choose to have a pre-listing inspection.`
  // },
  // {
  //   question: 'How can I improve my credit score to qualify for a mortgage?',
  //   answer: `To improve your credit score, focus on paying bills on time, reducing outstanding debts, and avoiding new credit applications. It's advisable to consult with a financial advisor for personalized guidance.`
  // }
];

export const footerNav = [
    {
        title: "Home",
        navigation: [
          { title: "Hero Section", to: "#" },
          { title: "Features", to: "#" },
          { title: "Properties", to: "#" },
          { title: "Testimonials", to: "#" },
          { title: "FAQ's", to: "#" },
        ],
      }, {
        title: "About Us",
        navigation: [
          { title: "Our Story", to: "#" },
          { title: "Our Works", to: "#" },
          { title: "How it Works", to: "#" },
          { title: "Our Team", to: "#" },
          { title: "Our Clients", to: "#" },
        ],
      }, {
        title: "Properties",
        navigation: [
          { title: "Portfolio", to: "#" },
          { title: "Categories", to: "#" },
        ],
      },
       {
        title: "Services",
        navigation: [
          { title: "Valuation Mastery", to: "#" },
          { title: "Startegic Marketing", to: "#" },
          { title: "Negotiation Wizardry", to: "#" },
          { title: "Closing Success", to: "#" },
          { title: "Property Management", to: "#" },
        ],
      },
      {
        title: "Contact Us",
        navigation: [
          { title: "Contact Form", to: "#" },
          { title: "Our Offices", to: "#" },
        ],
      },
];
