"use client";

import { atom } from "recoil";

export const activeTopHeader = atom<string>({
  key: "ActiveTopHeaderState",
  default: "/all-experiments",
});
