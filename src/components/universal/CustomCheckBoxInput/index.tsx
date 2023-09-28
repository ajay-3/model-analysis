import React, { useState } from "react";
import styles from "./CustomCheckboxInput.module.scss";

interface CustomCheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CustomCheckboxInput: React.FC<CustomCheckboxInputProps> = ({
  label,
  checked,
  onChange,
}) => {
  const handleCheckboxChange = () => {
    onChange(!checked);
  };

  return (
    <div className={styles.customCheckboxInput}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        {label}
      </label>
    </div>
  );
};

export default CustomCheckboxInput;
