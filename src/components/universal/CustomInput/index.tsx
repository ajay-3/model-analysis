// components/GenericInput.tsx

import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./index.module.scss";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

interface GenericInputProps {
  type: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (input: string) => void;
  clear?: boolean;
}

const CustomInput: React.FC<GenericInputProps> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  clear,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className={styles["input-container"]}>
      <label className={styles["input-label"]}>{label}</label>
      <div className={styles["input-div"]}>
        <input
          type={isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles["input"]}
        />
        {type === "password" &&
          (isPasswordVisible ? (
            <HiOutlineEye
              className={styles["icon"]}
              onClick={togglePasswordVisibility}
            />
          ) : (
            <HiOutlineEyeOff
              className={styles["icon"]}
              onClick={togglePasswordVisibility}
            />
          ))}
      </div>
    </div>
  );
};

export default CustomInput;
