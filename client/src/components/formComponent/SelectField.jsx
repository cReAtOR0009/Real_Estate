import React from "react";

const SelectField = ({ icon, label, options, styles, onChange }) => (
  <div className="custom-select flex flex-1 items-center relative">
    <label
      htmlFor={label}
      className="absolute left-3 text-[16px] text-White-99"
    >
      <img src={icon} alt="" />
    </label>
    <select
      name={label}
      id={label}
      onChange={onChange}
      className={`${styles} `}
    >
      {/* <option value="">{placeholder}</option> */}
      <option value="">select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
