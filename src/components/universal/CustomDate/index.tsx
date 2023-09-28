import React, { ChangeEvent } from "react";
import styles from "./index.module.scss";

interface InputDateProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomDate: React.FC<InputDateProps> = ({ value, onChange }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="date"
      // placeholder="From"
      className={styles.inputDate}
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default CustomDate;
