"use client";
import Header from "@/src/components/generic/Header";
import StageNavigation from "@/src/components/generic/StageNavigation";
import Ring from "@/src/components/universal/Ring";
import Slider from "@/src/components/universal/Slider";
import { baseUrl, currentExperimentId } from "@/src/store/atoms/AllExperiments";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const ModelTracking = () => {
  const curExperimentId = useRecoilValue(currentExperimentId);
  const url = useRecoilValue(baseUrl);

  return (
    <div>
      <Header />
      <div>Experiment ID:{curExperimentId}</div>
      <StageNavigation />
      {/* <Ring percentage={90} colour={"#0A7AFF"} title={"Real Accuracy"} />
      <Slider min={0} max={1} step={0.01} title="Tweak Threshold" /> */}
    </div>
  );
};

export default ModelTracking;
