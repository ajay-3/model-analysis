import * as d3 from "d3";
import { useEffect, useState } from "react";
import { MultipleDensityCharts } from "@/src/components/charts/DensityGraph";
import Button from "@/src/components/universal/Button";
import Matrix from "@/src/components/generic/ConfusionMatrix";
import Ring from "@/src/components/universal/Ring";
import Slider from "@/src/components/universal/Slider";
// import styles from "./index.module.css";
import CustomSelect from "@/src/components/universal/CustomSelect";
import {
  DropdownProvider,
  useDropdownContext,
} from "@/src/components/generic/DropDownStore";
import styles from "./Spinner.module.css";
const ThresholdAnalysis = (props: any) => {
  const [jsonData, setJsonData] = useState<any>();
  // const [curModel, setCurModel] = useState<any>()
  const [threshold, setThreshold] = useState<any>(0.5);

  const [tempThreshold, setTempThreshold] = useState<any>(0.5);
  const [predScoreData, setPredScoreData] = useState<any[]>([]);

  const [realAndFakeScores, setRealAndFakeScores] = useState<any[]>([]);

  const [truePositives, setTruePositives] = useState<any>();
  const [trueNegatives, setTrueNegatives] = useState<any>();
  const [falsePositives, setFalsePositives] = useState<any>();
  const [falseNegatives, setFalseNegatives] = useState<any>();
  const [totalResults, setTotalResults] = useState<any>();
  const [truePositivesArray, setTruePositivesArray] = useState<any[]>([]);
  const [trueNegativesArray, setTrueNegativesArray] = useState<any[]>([]);
  const [falsePositivesArray, setFalsePositivesArray] = useState<any[]>([]);
  const [falseNegativesArray, setFalseNegativesArray] = useState<any[]>([]);
  const [accuracy, setAccuracy] = useState<any>();
  const [realAccuracy, setRealAccuracy] = useState<any>();
  const [fakeAccuracy, setFakeAccuracy] = useState<any>();

  const [realAccValues, setRealAccValues] = useState<any>();
  const [FakeAccValues, setFakeAccValues] = useState<any>();
  const [forTwoGraphs, setForTwoGraphs] = useState<any>();
  const [showGraphsForData, setShowGraphsForData] = useState<any>(false);
  const [loading, setLoading] = useState(true);

  const spinnerStyle: React.CSSProperties = {
    border: "16px solid #f3f3f3", // Light grey
    borderTop: "16px solid #3498db", // Blue
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 2s linear infinite",
  };

  // const handleThresholdSubmit = () => {
  //   setThreshold(tempThreshold);
  // };

  const { openDropdown, handleDropdownToggle } = useDropdownContext();
  const fetchModelDetails = (model: any) => {
    const getDetails = async () => {
      setLoading(true);
      let formData = new FormData();
      console.log("model", model);

      formData.append("model_id", model);

      formData.append("analysis_type", "golden");

      try {
        const res = await fetch(
          `https://ma.vishwamcorp.com/v1/get_training_model`,
          {
            method: "POST",
            body: formData,
            redirect: "follow",
          }
        );
        console.log("res", res);
        if (res.ok === false) {
          setShowGraphsForData(false);
          setLoading(false);
        } else {
          const jsonTempData = await res.json();
          console.log("jsonTempData", jsonTempData);

          const jsonResData = jsonTempData["golden_data"];

          console.log(
            "jsonResData",
            jsonTempData["model_details"]["Threshold"]
          );
          setTempThreshold(jsonTempData["model_details"]["Threshold"]);
          setThreshold(jsonTempData["model_details"]["Threshold"]);
          const realPredScore = jsonResData
            .filter((eachDataPoint: any) => {
              return (
                eachDataPoint["GT"] === "real" && +eachDataPoint["ModelScore"]
              );
            })
            .map((eachDataPoint: any) => +eachDataPoint["ModelScore"]);

          const fakePredScore = jsonResData
            .filter((eachDataPoint: any) => {
              return (
                eachDataPoint["GT"] === "fake" && +eachDataPoint["ModelScore"]
              );
            })
            .map((eachDataPoint: any) => +eachDataPoint["ModelScore"]);
          const curPredScoreData = jsonResData.map(
            (eachDataPoint: any) => +eachDataPoint["ModelScore"]
          );
          // console.log("curPredScoreData", curPredScoreData);

          let tempScores = [];
          tempScores.push({
            name: "realScore",
            values: realPredScore,
            use: "ForTwoGraphs",
          });
          tempScores.push({
            name: "fakeScore",
            values: fakePredScore,
            use: "ForTwoGraphs",
          });
          // console.log("realScore", realPredScore);
          // console.log("fakeScore", fakePredScore);
          // console.log("curPredScoreData", curPredScoreData);
          let tempRealScores = [];
          tempRealScores.push({
            name: "realScore",
            values: realPredScore,
            use: "notForTwoGraphs",
          });
          setRealAccValues(tempRealScores);
          let tempFakeScores = [];
          tempFakeScores.push({
            name: "fakeScore",
            values: fakePredScore,
            use: "notForTwoGraphs",
          });
          setFakeAccValues(tempFakeScores);

          setRealAndFakeScores(tempScores);
          setForTwoGraphs(tempScores);
          setJsonData(jsonResData);

          setPredScoreData(curPredScoreData);
          setShowGraphsForData(true);
          setLoading(false);
        }
      } catch (err) {
        console.log("err", err);
        setShowGraphsForData(false);
        setLoading(false);
      }
    };

    getDetails();
  };

  useEffect(() => {
    fetchModelDetails(props.Model);
    // console.log(threshold, tempThreshold);
  }, [props.Model]);

  useEffect(() => {
    const confusionMatrixCalculaitons = () => {
      let curTruePositives = 0,
        curTrueNegatives = 0,
        curFalsePositives = 0,
        curFalseNegatives = 0;

      jsonData.map((eachResponse: any) => {
        if (
          eachResponse["ModelScore"] >= threshold &&
          eachResponse["GT"] === "real"
        ) {
          curTruePositives += 1;
          setTruePositivesArray([
            ...truePositivesArray,
            eachResponse["ModelScore"],
          ]);
        } else if (
          eachResponse["ModelScore"] >= threshold &&
          eachResponse["GT"] === "fake"
        ) {
          curFalsePositives += 1;
          setFalsePositivesArray([
            ...falsePositivesArray,
            eachResponse["ModelScore"],
          ]);
        } else if (
          eachResponse["ModelScore"] < threshold &&
          eachResponse["GT"] === "fake"
        ) {
          curTrueNegatives += 1;
          setTrueNegativesArray([
            ...trueNegativesArray,
            eachResponse["ModelScore"],
          ]);
        } else if (
          eachResponse["ModelScore"] < threshold &&
          eachResponse["GT"] === "real"
        ) {
          curFalseNegatives += 1;
          setFalseNegativesArray([
            ...falseNegativesArray,
            eachResponse["ModelScore"],
          ]);
        }
      });
      // console.log(curTruePositives);
      // console.log(curTrueNegatives);
      // console.log(curFalseNegatives);
      // console.log(curFalsePositives);
      // console.log("truePositivesArray", truePositivesArray);
      // console.log("falsePositivesArray", falsePositivesArray);
      // console.log("trueNegativesArray", trueNegativesArray);
      // console.log("falseNegativesArray", falseNegativesArray);

      setTruePositives(curTruePositives);
      setTrueNegatives(curTrueNegatives);
      setFalseNegatives(curFalseNegatives);
      setFalsePositives(curFalsePositives);
      setTotalResults(jsonData.length);

      setAccuracy(
        (curTruePositives + curTrueNegatives) /
          (curFalseNegatives +
            curFalsePositives +
            curTrueNegatives +
            curTruePositives)
      );
      setRealAccuracy(
        curTruePositives / (curTruePositives + curFalseNegatives)
      );
      // console.log(curTruePositives / (curTruePositives + curFalseNegatives));

      setFakeAccuracy(
        curTrueNegatives / (curTrueNegatives + curFalsePositives)
      );
      // console.log(curTrueNegatives / (curTrueNegatives + curFalsePositives));
    };

    if (jsonData) {
      confusionMatrixCalculaitons();
    } else {
      // console.log("Getting the Data");
    }
  }, [jsonData, threshold]);

  const handleThresholdChange = (thresholdValue: number) => {
    // console.log("hello");

    setTempThreshold(thresholdValue);
    setThreshold(thresholdValue);
  };

  const handleAnalysisSubmit = () => {
    const updateModel = async () => {
      let formdata = new FormData();
      formdata.append("model_id", props.Model);
      formdata.append("accuracy", accuracy);
      formdata.append("threshold", threshold);
      formdata.append("tp", truePositives);
      formdata.append("tn", trueNegatives);
      formdata.append("fp", falsePositives);
      formdata.append("fn", falseNegatives);
      formdata.append("real_accuracy", realAccuracy);
      formdata.append("fake_accuracy", fakeAccuracy);

      const res = await fetch(
        "https://ma.vishwamcorp.com/v1/update_training_model",
        {
          method: "POST",
          body: formdata,
          redirect: "follow",
        }
      );

      const res_json = await res.json();

      if (res_json["status"] === "success") {
        alert("Analysis Submitted Successfully");
      } else {
        alert("Unable to Submit");
      }
    };

    updateModel();
  };
  const applicationData = [
    {
      label: "Real",
      value: "Real",
    },
    {
      label: "Fake",
      value: "Fake",
    },
    {
      label: "OverLap",
      value: "OverLap",
    },
  ];
  const handleChart = (model: string) => {
    // console.log("model", model);
    // console.log("applicationData", applicationData);

    if (model === "Real") {
      setRealAndFakeScores([...realAccValues]);
    } else if (model === "Fake") {
      setRealAndFakeScores([...FakeAccValues]);
    } else {
      setRealAndFakeScores([...forTwoGraphs]);
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full h-[60vh] bg-custom-white mt-[60px]">
          <div className={styles.spinner}></div>
        </div>
      ) : showGraphsForData ? (
        <div className="flex flex-row w-full justify-center items-center pt-32 bg-custom-white rounded">
          <div className="w-[50%] ">
            <div className="-ml-8">
              {/* <CustomSelect
                // className=" -mt-28 h-full   mb-2 ml-[13px]"
                label="OverLap"
                Options={applicationData}
                // options=
                handleSubmit={handleChart}
                isOpen={openDropdown === "OverLap"}
                toggleOpen={() => handleDropdownToggle("OverLap")}
                selectedValue={null}
              /> */}
            </div>
            <div className="flex -ml-4">
              <div className=" text-center absolute py-1 pt-3 w-[440px] mt-52 -ml-[205px]   bg-[#F2F3F7]  -rotate-90">
                Kernel Density
              </div>
              {realAndFakeScores && (
                <div className="">
                  <MultipleDensityCharts
                    title="Model Accuracy Distribution"
                    width={460}
                    height={400}
                    data={realAndFakeScores}
                    threshold={threshold}
                  />
                  <div className="text-center bg-[#F2F3F7] py-2 w-[480px]  -mt-2 ml-8">
                    Model Scores
                  </div>
                </div>
              )}
              <div className="flex flex-col w-20 h-[438px] text-center -ml-8  mt-2 bg-[#F2F3F7] ">
                <div className="mt-2 w-full flex flex-wrap items-center -ml-[12px] z-[1]">
                  <div className="bg-[#FC3131] w-5 h-4  "></div>
                  <p className="ml-1">TP</p>
                </div>
                <div className="mt-2 w-full flex flex-wrap items-center -ml-[12px] z-[1]">
                  <span className="bg-[#6E89C1] w-5 h-4"></span>
                  <p className="ml-1">TN</p>
                </div>
                <div className="mt-2 w-full flex flex-wrap items-center -ml-[12px] z-[1]">
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <pattern
                      id="pattern-circles"
                      width="11"
                      height="11"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle
                        cx="4"
                        cy="4"
                        r="3"
                        fill="none"
                        stroke="#BA4F58"
                        strokeWidth="2"
                      />
                    </pattern>

                    <rect
                      width="200"
                      height="200"
                      fill="url(#pattern-circles)"
                    />
                  </svg>

                  <p className="ml-1">FP</p>
                </div>
                <div className="mt-2 w-full flex flex-wrap items-center -ml-[12px] z-[1]">
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <pattern
                      id="angled-lines"
                      width="8"
                      height="8"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M-1,9 L9,-1"
                        stroke="#4D6EB3"
                        strokeWidth="1.8"
                      />
                    </pattern>
                    <rect width="200" height="200" fill="url(#angled-lines)" />
                  </svg>

                  <p className="ml-1">FN</p>
                </div>
                {/* <div className="mt-2 w-full flex flex-wrap items-center">
              <span className="bg-[#EAA284] w-5 h-4"></span>
              <p className="ml-1">Overlap</p>
            </div> */}
              </div>
            </div>
            <Button
              className="mx-8 my-2 px-4"
              variant="primary"
              onClick={handleAnalysisSubmit}
            >
              Submit
            </Button>
          </div>
          <div className="w-2/5 -mt-24 ml-11">
            <Slider
              className="bg-cool-gray rounded py-2"
              initialValue={tempThreshold}
              min={0}
              max={1}
              step={0.01}
              title="Tweak Threshold"
              onChange={handleThresholdChange}
              // onSubmit={handleThresholdSubmit}
            />
            <div className="flex flex-row bg-cool-gray my-4 py-4 rounded">
              <Ring
                className="w-40"
                title="Accuracy"
                percentage={(accuracy * 100).toFixed(2)}
                colour={"#211F9F"}
              />
              <Ring
                className="w-40"
                title="Real Accuracy"
                percentage={(realAccuracy * 100).toFixed(2)}
                colour={"#211F9F"}
              />
              <Ring
                className="w-40"
                title="Fake Accuracy"
                percentage={(fakeAccuracy * 100).toFixed(2)}
                colour={"#211F9F"}
              />
            </div>

            <Matrix
              className="bg-cool-gray pt-2"
              matrix={[
                { TP: truePositives, FN: falseNegatives },
                { FP: falsePositives, TN: trueNegatives },
              ]}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-[60vh] bg-custom-white mt-[60px] font-poppins text-4xl">
          No Data Found
        </div>
      )}
    </>
  );
};

export default ThresholdAnalysis;
