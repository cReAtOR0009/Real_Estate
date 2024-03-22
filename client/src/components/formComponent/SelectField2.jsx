import React from 'react'

const SelectField2 = ({ label, options, styles, onChange }) => (
    <div className="custom-select custom-selectPatch flex flex-col   flex-1 gap-[12px] md:gap-[16px] ">
      <label for={label} className="text-[16px] text-White-99">
        {label}
      </label>
      <select name={label} id={label} onChange={onChange} className={styles}>
        {/* <option value="">{name}</option> */}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

export default SelectField2