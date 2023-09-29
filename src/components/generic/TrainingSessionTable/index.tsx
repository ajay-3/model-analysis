import { useEffect, useState } from "react";
import styles from "./trainingSession.module.scss";


const TrainingSession = ({header,keyValueTableData}:any) =>{
    return (
        <div className={styles["keyValueTableContainer"]}>
          <div>
             <h4>{header}</h4>
          </div>
          {
            <div className={styles["keyValueTable"]}>
               <div className={styles["keyValueTableHeader"]}>
                    <div className={styles["keyValueTableHeaderKey"]}> 
                      <h5>Key</h5>
                    </div>
                    <div className={styles["keyValueTableHeaderValue"]}>  
                      <h5>Value</h5>
                    </div>
               </div>
               {/* {Object.entries(curMasterProject[curExperimentId])} */}
               {keyValueTableData.map((item:any,index: number) =>{
                return <div key={index} className={styles["keyValueTableView"]}>
                    <div className={styles["keyValueTableHeaderKey"]}>
                      <h5>{item[0]}</h5>
                    </div>
                    <div className={styles["keyValueTableHeaderValue"]}>
                      <h5>{typeof item[1] == 'object' ? JSON.stringify(item[1]) : item[1]}</h5>
                    </div>
                </div>
               }) }
            </div>
          }
        </div>
    )

}

export default TrainingSession;