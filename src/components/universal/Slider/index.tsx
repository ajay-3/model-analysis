import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

const Slider = (props: any) => {
  const [value, setValue] = useState(props.initialValue);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: any) => {
    event.preventDefault();
    setValue(Number(event.target.value));
    props.onChange(Number(event.target.value));
  };
  const handleCheckboxChange = (event: any) => {
    if (event.target.checked) {
      props.onCheckboxChange();
      props.setSelectedModelName(props.title);
    } else {
      props.onCheckboxChange(null); // to uncheck
      props.setSelectedModelName(null);
    }
  };

  useEffect(() => {
    setValue(props.initialValue);
  }, [props.initialValue]);

  return (
    <div className={styles["slider-div"]}>
      <div style={{ fontSize: "15px" }} className={styles["selected-div"]}>
        {props.checkBoxVisible === true ? (
          <div className={`${styles.container} gap-1 `}>
            <label className={styles.container}>
              <input
                type="checkbox"
                checked={props.isChecked}
                onChange={handleCheckboxChange}
              />

              <span className={styles.checkmark}></span>
            </label>
          </div>
        ) : (
          ""
        )}
        {props.title}
      </div>
      <div className={styles["inputs-div"]}>
        <input
          style={{
            background: `linear-gradient(to right, #0a7aff ${
              value * 100
            }%, #ccc ${value * 100}%)`,
            cursor: "pointer",
          }}
          className={styles["slider"]}
          type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          value={value}
          onChange={handleChange}
        />
        <input
          className={styles["input-text"]}
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Slider;
