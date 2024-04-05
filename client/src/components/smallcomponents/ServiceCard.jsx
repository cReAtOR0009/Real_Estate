import React from "react";
import { styles } from "../../styles/styles";

const ServiceCard = ({ icon, offer, description }) => {
  return (
    <div className="">
      {" "}
      <div className=" flex flex-wrap md:flex-nowrap md:flex-col w-[100%] p-[25px] gap-[10px] border border-solid border-Grey-15 rounded-[10px] md:max-w-[400px]">
        <div className="flex justify-start items-center gap-[10px]">
          <img className="w-[40px] md:w-[50px]" src={icon} alt="" />
          <p className={`${styles.paragraph} text-White-99`}>{offer}</p>
        </div>
        <p className={`${styles.paragraph}`}>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
