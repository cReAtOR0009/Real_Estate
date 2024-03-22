import React from 'react'

const InputField = ({ placeholder, name, label, type, onChange, styles }) => (
    <div className="flex flex-col flex-1  gap-[12px] md:gap-[16px]">
      <label htmlFor={label} className="text-[16px] text-White-99">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className={styles}
      />
    </div>
  );
export default InputField