import React from "react";
import { styles } from "../styles/styles";
// import specif

const AdditionalFeatures = ({ name, description }) => {
  return (
    <div className="flex flex-col px-[5px] py-[5px] sm:p-[10px] gap-[2px]  border-l-2 border-Purple-60 bg-Grey-20">
      <h2 className={`text-[20px]`}>{name}</h2>
      <p className={`${styles.paragraph}`}>{description}</p>
    </div>
  );
};

export default AdditionalFeatures;
