import {logo} from "./imageImporter"
import { iconContainer, iconContainer1, iconContainer2, iconContainer3, arrowIcon, bedroomicon, bathroomicon, villaicon,house1, house2, house3 } from "./imageImporter";

export const navLinks = [
  { title: "Home", id: "home" },
  { title: "About us", id: "about-us" },
  { title: "Properties", id: "properties" },
  { title: "Services", id: "services" },
];

export const companydetails = {
    title:"Real Estate"
}

export const achievement1 = [
    {numbers:200, title:"Happy Customers"},
    {numbers:10000, title:"Properties For Clients"},
    {numbers:16, title:"Years of Experience"},
]

export const offers = [
    {offer:"Find Your Dream Home", icon:iconContainer, icon2:arrowIcon},
    {offer:"Unlock Property Value", icon:iconContainer1, icon2:arrowIcon},
    {offer:"Effortless Property Management", icon:iconContainer2, icon2:arrowIcon},
    {offer:"Smart Investments, Informed Decisions", icon:iconContainer3, icon2:arrowIcon},
]

export const featuredProducts = [
    {
        title:"Seaside Serenity Villa",
        details:"A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood... Read More",
        image:house1,
        features:[{icon:bedroomicon, featureText:"4-Bedroom"},{icon:bathroomicon, featureText:"3-Bathroom"},{icon:villaicon, featureText:"villa"}],
        price:550000,
    },
    {
        title:"Metropolitan Haven",
        details:"A chic and fully-furnished 2-bedroom apartment with panoramic city views... Read More",
        image:house2,
        features:[{icon:bedroomicon, featureText:"4-Bedroom"},{icon:bathroomicon, featureText:"3-Bathroom"},{icon:villaicon, featureText:"villa"}],
        price:550000,
    },
    {
        title:"Rustic Retreat Cottage",
        details:"An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community... Read More",
        image:house3,
        features:[{icon:bedroomicon, featureText:"4-Bedroom"},{icon:bathroomicon, featureText:"3-Bathroom"},{icon:villaicon, featureText:"villa"}],
        price:550000,
    }
]
