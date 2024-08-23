import React from "react";
import { styles } from "../../../styles/styles";

const Journey = ({ paragraphText, HeaderText, extrastyle="" }) => {
  return (
    <div
      className={`   flex flex-col flex-wrap md:flex-nowrap gap-[20px] md:gap-[auto]   border-y border-solid border-Grey-15 ${extrastyle}`}
    >
        <h1 className={`${styles.heading} whitespace-nowrap`}>{HeaderText}</h1>
        <p className={styles.paragraph}>{paragraphText}</p>
     
    </div>
  );
};

export default Journey;
