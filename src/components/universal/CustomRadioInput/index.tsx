import React, { useState } from "react";
import styles from "./CustomRadioInput.module.scss";

interface CustomRadioInputProps {
  options: { label: string; value: string }[];
  onChange: (selectedValue: string) => void;
}

const CustomRadioInput: React.FC<CustomRadioInputProps> = ({
  options,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.customRadioInput}>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleRadioChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CustomRadioInput;
