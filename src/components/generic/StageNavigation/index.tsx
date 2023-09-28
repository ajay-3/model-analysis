"use client";
import { baseUrl, currentExperimentId } from "@/src/store/atoms/AllExperiments";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Stages, parentStagesStatus } from "../Stages";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";

const StageNavigation = () => {
  const curExperimentId = useRecoilValue(currentExperimentId);
  const url = useRecoilValue(baseUrl);

  const router = useRouter();

  const [sessionDetails, setSessionDetails] = useState();
  const [curStages, setCurStages] = useState(Stages);
  const [curParentState, setCurParentState] = useState(parentStagesStatus);

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
            if (element["Stage"] in tempStages) {
              tempStages[element["Stage"]]["status"] = element["Status"];
            }
          });

          const tempParentStages: any = curStages;
          Object.keys(parentStagesStatus).forEach((key: any) => {
            tempParentStages[key] = "complete";
            for (let i = 0; i < tempStages[key]["children"].length; i++) {
              console.log(tempStages[key]["children"][i]);
              if (tempStages[key]["children"][i] == "not-yet-started") {
                tempParentStages[key] = "not-yet-started";
                break;
              } else if (tempStages[key]["children"][i] == "in-progress") {
                tempParentStages[key] = "in-progress";
                break;
              }
            }
          });
          console.log(tempParentStages);
          console.log(tempStages);
          setCurStages(tempStages);
          setSessionDetails(res);
        } else {
          console.log("Session Id Unavailable");
          router.push("/all-experiments");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTrainingSessionStatus();
  }, [curExperimentId]);

  return (
    <div className={styles["nav-container"]}>
      {Object.keys(parentStagesStatus).map((stage_id: string) => (
        <div key={stage_id} className={styles["container"]}>
          <span>Step {Stages[stage_id].step}</span>
          <span>{Stages[stage_id].title}</span>
        </div>
      ))}
    </div>
  );
};

export default StageNavigation;
