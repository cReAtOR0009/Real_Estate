import React from "react";
import { styles } from "../../styles/styles";

const Fee = ({ type, price, description, index }) => {
  return (
    <div
      className={`${
        index % 2 !== 0
          ? "sm:border-l-2 border-solid border-Grey-15 sm:"
          : "border-Grey-15"
      } grow sm:w-[50%] pl-[10px] my-[10px] border-b-2 border-solid py-[15px]`}
    >
      <div className="py-[10px]">{type}</div>
      <div className="flex justify-start items-center gap-[10px]">
        <span className="font-bold text-[17px]">${price}</span>{" "}
        <span
          className={`${styles.paragraph} rounded-[10px] sm:rounded-full border borser-solid border-Grey-40 p-[8px] `}
        >
          {description}
        </span>
      </div>
    </div>
  );
};

export default Fee;
