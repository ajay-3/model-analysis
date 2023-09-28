"use client";

import { atom } from "recoil";

const isBrowser: boolean = ((): boolean => typeof window !== "undefined")();

// export const experimentsListState = atom<Session[]>({
//   key: "ExperimentsListState",
//   default: [],
// });

export const baseUrl = atom<string>({
  key: "BaseUrl",
  default: isBrowser
    ? window.location.hostname === "localhost"
      ? "https://ma.vishwamcorp.com"
      : "https://ma.vishwamcorp.com"
    : "https://ma.vishwamcorp.com",
});

export const selectedApplicationState = atom<option | null>({
  key: "SelectedApplicationState",
  default: null,
});

export const selectedProjectState = atom<option | null>({
  key: "SelectedProjectState",
  default: null,
});

export const selectedStatusState = atom<option | null>({
  key: "SelectedStatusState",
  default: null,
});

export const masterUserProjectState = atom({
  key: "MasterUserProjectState",
  default: null,
});

export const currentExperimentId = atom<string | null>({
  key: "CurExperimentIdState",
  default: null,
});

export const masterTrainingSessionState = atom({
  key: "MasterTrainingSessionState",
  default: null,
});

// export const masterSessionDetailsState = atom({
//   key: "MasterSessionDetailsState",
//   default: null,
// });

// export const masterUserProjectState = atom({
//   key: "MasterUserProjectState",
//   default: null,
// });
