"use client";
import {
  baseUrl,
  currentExperimentId,
  masterTrainingSessionState,
} from "@/src/store/atoms/AllExperiments";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Stages, parentStagesStatus } from "../Stages";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
import TrainingSession from "@/src/components/generic/TrainingSessionTable";
import Simulation from "@/src/components/generic/Simulation";

const StageNavigation = () => {
  const curExperimentId: any = useRecoilValue(currentExperimentId);
  const curMasterProject: any = useRecoilValue(masterTrainingSessionState);
  // console.log(curMasterProject[curExperimentId]);
  const keyValueTableData: any = Object.entries(
    curMasterProject[curExperimentId]["training_session_details"]
  );
  // console.log(keyValueTableData);
  const url = useRecoilValue(baseUrl);

  const router = useRouter();

  const [sessionDetails, setSessionDetails] = useState();
  const [curStages, setCurStages] = useState(Stages);
  const [curParentState, setCurParentState] = useState(parentStagesStatus);
  const [curSelectedState,setCurSelectedState] = useState('');

  const modelDetails = ['jhnsrda_model_1','jhnsrda_model_2','jhnsrda_model_3','jhnsrda_model_4']

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

          const tempParentStages: any = curParentState;
          Object.keys(parentStagesStatus).forEach((key: any) => {
            tempParentStages[key] = "complete";
            for (let i = 0; i < tempStages[key]["children"].length; i++) {
              if (
                tempStages[tempStages[key]["children"][i]]["status"] ==
                "not_yet_started"
              ) {
                tempParentStages[key] = "not_yet_started";
                break;
              } else if (
                tempStages[tempStages[key]["children"][i]]["status"] ==
                "in-progress"
              ) {
                tempParentStages[key] = "in-progress";
                break;
              }
            }
          });
          setCurStages(tempStages);
          setCurParentState(tempParentStages);
          setSessionDetails(res);

          console.log(curParentState)
        } else {
          router.push("/all-experiments");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTrainingSessionStatus();
  }, [curExperimentId]);


  let returnCurState = (id:string)=>{
    return curParentState[id] == "complete" ? styles['completed'] : curParentState[id] == "in-progress" ? styles['inProgress'] : ''  ;
  }

  let fetchStateData = (id:string)=>{
    setCurSelectedState(id)
  }

  return (
    <div>
      <div className={styles["nav-container"]}>
        {Object.keys(parentStagesStatus).map((stage_id: string) => (
          <div key={stage_id} className={`${styles["container"]} ${returnCurState(stage_id)}`} onClick={()=>fetchStateData(stage_id)}> 
            <p>Step {Stages[stage_id].step}</p>
            <p>{Stages[stage_id].title}</p>
          </div>
        ))}
      </div>


      {/* <TrainingSession
        type={curSelectedState}
        header="Training Session Details"
        keyValueTableData={keyValueTableData}
      /> */}

      <Simulation type={curSelectedState} modelDetails={modelDetails}/>

    </div>
  );
};

export default StageNavigation;
