"use client";
import { baseUrl, currentExperimentId } from "@/src/store/atoms/AllExperiments";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Stages, parentStages } from "../Stages";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";

const StageNavigation = () => {
  const curExperimentId = useRecoilValue(currentExperimentId);
  const url = useRecoilValue(baseUrl);

  const router = useRouter();

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
      {parentStages.map((stage_id: string) => (
        <div key={stage_id} className={`${styles["container"]}`}>
          <p>Step {Stages[stage_id].step}</p>
          <p>{Stages[stage_id].title}</p>
        </div>
      ))}
    </div>
  );
};

export default StageNavigation;
