"use client";
import Header from "@/src/components/generic/Header";
import StageNavigation from "@/src/components/generic/StageNavigation";
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
    </div>
  );
};

export default ModelTracking;
