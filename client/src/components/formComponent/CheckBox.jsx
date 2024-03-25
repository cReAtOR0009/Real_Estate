import React from "react";

const CheckBox = ({ className, type, name, label, checked, onChange }) => {
  return (
    <>
      <label>{label}:</label>
      <input
        className={className}
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
      />
    </>
  );
};

export default CheckBox;
