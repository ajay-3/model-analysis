"use client";

import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { currentExperimentId } from "@/src/store/atoms/AllExperiments";

interface TableColumn {
  header: string;
  field: string;
}

interface GenericTableProps {
  data: any[];
  columns: option[];
  className: any;
}

const Table: React.FC<GenericTableProps> = ({ data, columns, className }) => {
  const setCurExperimentId = useSetRecoilState(currentExperimentId);
  return (
    <table className={`${styles.table} ${className}`}>
      <thead>
        <tr className={`${styles.Columnsheaders}`}>
          <th key="number">#</th>
          {columns.map((column, index) => (
            <th key={index}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => {
          return (
            <tr key={rowIndex} className={`${styles.Columnsheaders}`}>
              <td>{rowIndex + 1}</td>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.value == "SessionID" ? (
                    <Link
                      onClick={() => {
                        setCurExperimentId(item[column.value]);
                      }}
                      href={"/all-experiments/model-tracking"}
                    >
                      <span>{item[column.value]}</span>
                    </Link>
                  ) : column.value == "Start" || column.value == "End" ? (
                    <span>
                      {new Date(item[column.value]).toLocaleString(undefined, {
                        timeZone: "Asia/Kolkata",
                      })}
                    </span>
                  ) : (
                    <span>{item[column.value]}</span>
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
