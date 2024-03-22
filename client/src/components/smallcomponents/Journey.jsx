import React from "react";
import { styles } from "../../styles/styles";

const Journey = ({ paragraphText, HeaderText, buttonText }) => {
  return (
    <div
      className={`px-[16px] py-[50px]  md:p-[80px] md:py-[10px] md:pb-[130px] lg:py-[80px] lg:px-[80px]  xl:px-[400px] xl:py-[150px]  flex flex-wrap md:flex-nowrap justify-between gap-[20px] md:gap-[auto] items-center propertyJourneybg`}
    >
      <div className=" ">
        <h1 className={styles.heading}>{HeaderText}</h1>
        <p className={styles.paragraph}>{paragraphText}</p>
      </div>
      <button
        className={`${styles.buttonPadding}  flex-1 grow whitespace-nowrap bg-Purple-60`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Journey;
