import React from "react";
import { MdBathroom, MdLocationOn } from "react-icons/md";
import { MdBedroomChild } from "react-icons/md";
import { BsRulers } from "react-icons/bs";
import { FaSwimmingPool } from "react-icons/fa";
import { FaPlantWilt } from "react-icons/fa6";
import { GiHomeGarage } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { GrShieldSecurity } from "react-icons/gr";
import { MdBalcony } from "react-icons/md";
import { GiHotSpices } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";

const Amenity = ({ icon, text, available }) => {
  let useIcon =
    icon === "swimmingPool" ? (
      <FaSwimmingPool size={25} />
    ) : icon === "garden" ? (
      <FaPlantWilt size={25} />
    ) : icon === "garage" ? (
      <GiHomeGarage size={25} />
    ) : icon === "gym" ? (
      <CgGym size={25} />
    ) : icon === "securitySystem" ? (
      <GrShieldSecurity size={25} />
    ) : icon === "balcony" ? (
      <MdBalcony size={25} />
    ) : icon === "centralHeating" ? (
      <GiHotSpices size={25} />
    ) : icon === "airConditioning" ? (
      <TbAirConditioning size={25} />
    ) : (
      ""
    );

  return (
    <p
      className={`hover:scale-[1.2] transition-all flex px-[5px] py-[5px] sm:p-[10px] items-center m-[0px] gap-[2px] rounded-[28px] border border-solid border-Grey-15 bg-Purple-60 ${
        available ? "" : "bg-[#cbbeee]  cursor-not-allowed hidden"
      }`}
    >
      {available ? (
        <>
          {useIcon}
          <span>{text}</span>
        </>
      ) : (
        `no ${text.toLowerCase()}`
      )}
    </p>
  );
};

export default Amenity;
