import React from "react";
import { styles } from "../../styles/styles";

const ServiceCard = ({ icon, offer, description }) => {
  return (
    <div className=" flex flex-wrap md:flex-nowrap md:flex-col flex-1 min-w-[320px] w-[100%] p-[25px] gap-[10px] border border-solid border-Grey-15 rounded-[10px] md:max-w-[413px] bg-Grey-08">
      <div className="flex justify-start items-center gap-[10px]">
        <img className="w-[40px] md:w-[50px]" src={icon} alt="" />
        <p className={`${styles.paragraph} text-White-99`}>{offer}</p>
      </div>
      <p className={`${styles.paragraph}`}>{description}</p>
    </div>
  );
};

export default ServiceCard;
