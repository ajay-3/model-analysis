"use client";

import Header from "@/src/components/generic/Header";
import CustomSelect from "@/src/components/universal/CustomSelect";
import {
  baseUrl,
  masterTrainingSessionState,
  // experimentsListState,
  masterUserProjectState,
  selectedApplicationState,
  selectedProjectState,
  selectedStatusState,
} from "@/src/store/atoms/AllExperiments";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import styles from "./page.module.scss";
import DateRange from "@/src/components/universal/DateRange";
import Table from "@/src/components/universal/Table";
import Button from "@/src/components/universal/Button";
import { HiOutlineFilter } from "react-icons/hi";

const DummyOptions: option[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];

// const DummyTableData = [
//   { 'SessionID' : }
// ]

const Columns: option[] = [
  { value: "SessionID", label: "Experiment Id" },
  { value: "Application", label: "Application" },
  { value: "ProjectName", label: "Project" },
  { value: "ModelName", label: "Model Name" },
  { value: "Stage", label: "Status" },
  { value: "Start", label: "Start Date" },
  { value: "End", label: "End Date" },
];
const AllExperiments = () => {
  // const [experiments, setExperiments] = useRecoilState(experimentsListState);
  const [applicationState, setApplicationState] = useRecoilState(
    selectedApplicationState
  );
  const [projectState, setProjectState] = useRecoilState(selectedProjectState);
  const [statusState, setStatusState] = useRecoilState(selectedStatusState);
  const setUserProjectData = useSetRecoilState(masterUserProjectState);
  const setMasterTrainingState = useSetRecoilState(masterTrainingSessionState);
  const url = useRecoilValue(baseUrl);
  // const setAllSessionsDetails = useRecoilState()
  // const [selectGroup, setSelectGroup] = useState();
  const [isAppOpen, setIsAppOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [experimentsTableData, setExperimentsTableData] = useState<any[]>([]);

  const [startDate, setStartDate] = useState(""); // Initialize with your default start date
  const [endDate, setEndDate] = useState(""); // Initialize with your default end date

  const handleDateRangeChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  useEffect(() => {
    const getExperiments = async () => {
      try {
        const sessions_response = await fetch(
          `${url}/v1/get_training_sessions`
        );
        const sessions_res = (await sessions_response.json()) || [];

        const curUserProjectMap: any = {};
        const tempUsers = sessions_res["training_session_ids"].map(
          (sessionDetails: any) => {
            if (sessionDetails["Trainer"] in curUserProjectMap) {
              if (
                sessionDetails["ProjectName"] in
                curUserProjectMap[sessionDetails["Trainer"]]
              ) {
                curUserProjectMap[sessionDetails["Trainer"]][
                  sessionDetails["ProjectName"]
                ].push(sessionDetails);
              } else {
                curUserProjectMap[sessionDetails["Trainer"]][
                  sessionDetails["ProjectName"]
                ] = [sessionDetails];
              }
            } else {
              curUserProjectMap[sessionDetails["Trainer"]] = {};
              curUserProjectMap[sessionDetails["Trainer"]][
                sessionDetails["ProjectName"]
              ] = [sessionDetails];
            }
          }
        );
        setUserProjectData(tempUsers);

        let eachSessionDetails: any = {};
        for (let i = 0; i < sessions_res["training_session_ids"].length; i++) {
          try {
            let formData = new FormData();
            formData.append(
              "training_session_id",
              sessions_res["training_session_ids"][i].SessionID
            );
            const res = await fetch(`${url}/v1/get_training_session`, {
              method: "POST",
              body: formData,
              redirect: "follow",
            });

            const tempTraningDetails = await res.json();
            eachSessionDetails[
              sessions_res["training_session_ids"][i].SessionID
            ] = tempTraningDetails;
          } catch (err) {
            console.log(err);
          }
        }
        setMasterTrainingState(eachSessionDetails);

        const allExperimentsTableData = sessions_res[
          "training_session_ids"
        ].map((element: any) => {
          let tempObject: any = {};
          tempObject["SessionID"] = element["SessionID"];
          tempObject["Application"] =
            eachSessionDetails[element["SessionID"]][
              "training_session_details"
            ]["App"];
          tempObject["ProjectName"] = element["ProjectName"];
          tempObject["ModelName"] =
            eachSessionDetails[element["SessionID"]][
              "training_session_details"
            ]["ModelName"];
          tempObject["Stage"] = element["Stage"];
          tempObject["Start"] = element["Start"];
          tempObject["End"] = element["End"];
          return tempObject;
        });
        setExperimentsTableData(allExperimentsTableData);
      } catch (err) {
        console.log(err);
      }
    };

    getExperiments();
  }, []);

  return (
    <div>
      <Header />
      <div className={styles["selection-header"]}>
        <CustomSelect
          options={DummyOptions}
          label="Select Application"
          isOpen={isAppOpen}
          onToggleClick={() => {
            setIsAppOpen(!isAppOpen);
          }}
          initialValue={applicationState}
          handleSelection={(input: option) => {
            setApplicationState(input);
          }}
          clear={false}
        />
        <CustomSelect
          options={DummyOptions}
          label="Select Project"
          isOpen={isProjectOpen}
          onToggleClick={() => {
            setIsProjectOpen(!isProjectOpen);
          }}
          initialValue={projectState}
          handleSelection={(input: option) => {
            setProjectState(input);
          }}
          clear={false}
        />
        <CustomSelect
          options={DummyOptions}
          label="Select Status"
          isOpen={false}
          onToggleClick={() => {
            setIsStatusOpen(!isProjectOpen);
          }}
          initialValue={statusState}
          handleSelection={(input: option) => {
            setStatusState(input);
          }}
          clear={false}
        />
        <DateRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateRangeChange}
        />
      </div>
      <div className={styles["table-div"]}>
        <div className={styles["table-header"]}>
          <h3>All Experiments</h3>
          <Button variant="secondary" className={styles["button"]}>
            <div>Filter</div>
            <div>
              <HiOutlineFilter />
            </div>
          </Button>
        </div>
        <Table
          className={styles["table"]}
          columns={Columns}
          data={experimentsTableData}
        />
        <div className={styles["table-bottom"]}>
          <Button variant="secondary" className={styles["button"]}>
            <div>Previous</div>
            {/* <div>
              <HiOutlineFilter />
            </div> */}
          </Button>
          <div className={styles["pagination"]}>
             <span>1</span>
          </div>
          <Button variant="secondary" className={styles["button"]}>
            <div>Next</div>
            {/* <div>
              <HiOutlineFilter />
            </div> */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllExperiments;
