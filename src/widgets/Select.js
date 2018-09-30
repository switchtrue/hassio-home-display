import React from "react";
import Dropdown from "react-dropdown";
import styles from "./Select.module.css";

function Select({label, options, onChange, value, placeholder}) {
  return (
    <div className={styles.Select}>
      <div className={styles.Label}>{label}</div>
      <Dropdown
        options={options}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Select;