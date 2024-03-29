import React from "react";

const Amenity = ({ icon, text, available }) => (
  <p
    className={`hover:scale-[1.2] transition-all flex px-[5px] py-[5px] sm:p-[10px] items-center m-[0px] gap-[2px] rounded-[28px] border border-solid border-Grey-15 bg-Purple-60 ${
      available ? "" : "bg-[#cbbeee]  cursor-not-allowed"
    }`}
  >
    {available ? (
      <>
        {icon} <span>{text}</span>
      </>
    ) : (
      `no ${text.toLowerCase()}`
    )}
  </p>
);

export default Amenity;
