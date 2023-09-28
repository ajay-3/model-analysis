"use client";
import { baseUrl, currentExperimentId } from "@/src/store/atoms/AllExperiments";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Stages, parentStages } from "../Stages";
import styles from "./index.module.scss";

const StageNavigation = () => {
  const curExperimentId = useRecoilValue(currentExperimentId);
  const url = useRecoilValue(baseUrl);

  const [sessionDetails, setSessionDetails] = useState();
  const [curStages, setCurStages] = useState(Stages);
  useEffect(() => {
    const fetchTrainingSessionStatus = async () => {
      try {
        if (curExperimentId) {
          let formData = new FormData();
          formData.append("training_session_id", curExperimentId);
          const result = await fetch(`${url}/v1/get_training_session_status`, {
            method: "POST",
            body: formData,
            redirect: "follow",
          });
          const res = await result.json();
          const tempStages: any = curStages;

          res["stages"].forEach((element: any) => {
            tempStages[element["Stage"]]["status"] = element["Status"];
          });
          console.log(tempStages);
          setCurStages(tempStages);
          setSessionDetails(res);
        } else {
          console.log("Session Id Unavailable");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTrainingSessionStatus();
  }, [curExperimentId]);
  return (
    <div className={styles["nav-container"]}>
      {parentStages.map((stage_id: string) => (
        <div key={stage_id} className={styles["container"]}>
          <span>Step {Stages[stage_id].step}</span>
          <span>{Stages[stage_id].title}</span>
        </div>
      ))}
    </div>
  );
};

export default StageNavigation;
