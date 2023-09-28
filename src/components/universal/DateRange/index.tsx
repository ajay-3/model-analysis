import React from "react";
import CustomDate from "../CustomDate";
import styles from "./index.module.scss";

interface InputDateRangeProps {
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
}

const DateRange: React.FC<InputDateRangeProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  const handleStartDateChange = (newStartDate: string) => {
    onChange(newStartDate, endDate);
  };

  const handleEndDateChange = (newEndDate: string) => {
    onChange(startDate, newEndDate);
  };
  return (
    <div className={styles["date-range"]}>
      <CustomDate value={startDate} onChange={handleStartDateChange} />
      <span className={styles.separator}> - </span>
      <CustomDate value={endDate} onChange={handleEndDateChange} />
    </div>
  );
};

export default DateRange;
