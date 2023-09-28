import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { HiChevronDown } from "react-icons/hi";

interface CustomSelectProps {
  options: option[];
  label: string;
  isOpen: boolean;
  onToggleClick: () => void;
  handleSelection: (input: option) => void;
  initialValue: option | null;
  clear: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  isOpen,
  label,
  onToggleClick,
  handleSelection,
  initialValue,
  clear,
}) => {
  const [selectiedOption, setSelectedOption] = useState(
    initialValue ? initialValue.label : ""
  );

  useEffect(() => {
    if (clear) {
      setSelectedOption("");
    }
  }, [clear]);

  const handleSelectOption = (option: option) => {
    setSelectedOption(option.label);
    handleSelection(option);
    onToggleClick();
  };

  return (
    <div className={styles["custom-select"]}>
      <label className={`${styles["label"]}`} onClick={onToggleClick}>
        {selectiedOption ? (
          <span className={styles["parent-selected-span"]}>
            <span className={styles["child-label-span"]}>{label}</span>
            <span className={styles["child-option-span"]}>
              {selectiedOption}
            </span>
          </span>
        ) : (
          <span className={`${isOpen ? styles["focused"] : ""}`}>{label}</span>
        )}
        <span>
          <HiChevronDown
            className={`${styles["down-icon"]} ${
              isOpen ? styles["down-icon-focused"] : ""
            }`}
          />
        </span>
      </label>
      <div
        className={`${styles["options-parent"]} ${
          isOpen ? styles["open"] : ""
        }`}
      >
        <ul className={`${styles["options"]} ${isOpen ? styles["open"] : ""}`}>
          {options.map((option) => (
            <li
              className={styles["option"]}
              key={option.value}
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
