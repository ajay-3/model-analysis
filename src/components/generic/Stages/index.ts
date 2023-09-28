export const parentStages = ["DD", "MT", "GDSA", "PDSA", "RDA", "PRDA"];

export const Stages: any = {
  DD: {
    id: "DD",
    step: "01",
    status: "not_yet_started",
    title: "Dataset Download",
    parent: null,
    children: null,
    route: "/all-experiments/model-tracking/dataset-download",
  },
  MT: {
    id: "MT",
    step: "02",
    status: "not_yet_started",
    title: "Model Training",
    parent: null,
    children: ["MT"],
    route: "/all-experiments/model-tracking/model-training",
  },
  MU: {
    id: "MU",
    step: "02",
    status: "not_yet_started",
    title: "Model Training",
    parent: "MT",
    children: null,
    route: "/all-experiments/model-tracking/model-training",
  },
  GDSA: {
    id: "GDSA",
    step: "03",
    status: "not_yet_started",
    title: "Golden Analysis",
    parent: null,
    children: ["GDS", "GDA"],
    route: "/all-experiments/model-tracking/golden-analysis",
  },
  GDS: {
    id: "GDS",
    step: "03",
    status: "not_yet_started",
    title: "Golden Analysis",
    parent: "GDSA",
    children: null,
    route: "/all-experiments/model-tracking/golden-analysis/model-analysis",
  },
  GDA: {
    id: "GDA",
    step: "03",
    status: "not_yet_started",
    title: "Golden Analysis",
    parent: "GDSA",
    children: null,
    route: "/all-experiments/model-tracking/golden-analysis/model-analysis",
  },
  PDSA: {
    id: "PDSA",
    step: "04",
    status: "not_yet_started",
    title: "Platinum Analysis",
    parent: null,
    children: ["PDS", "PDA"],
    route: "/all-experiments/model-tracking/platinum-analysis",
  },
  PDS: {
    id: "PDS",
    step: "04",
    status: "not_yet_started",
    title: "Platinum Analysis",
    parent: "PDSA",
    children: null,
    route: "/all-experiments/model-tracking/platinum-analysis/model-analysis",
  },
  PDA: {
    id: "PDA",
    step: "04",
    status: "not_yet_started",
    title: "Platinum Analysis",
    parent: "PDSA",
    children: null,
    route: "/all-experiments/model-tracking/platinum-analysis/model-analysis",
  },
  RDA: {
    id: "RDA",
    step: "05",
    status: "not_yet_started",
    title: "Replica Deployment",
    parent: null,
    children: ["RD"],
    route: "/all-experiments/model-tracking/replica-deployment",
  },
  RD: {
    id: "RD",
    step: "05",
    status: "not_yet_started",
    title: "Replica Deployment",
    parent: "RDA",
    children: null,
    route: "/all-experiments/model-tracking/replica-deployment",
  },
  PRDA: {
    id: "PRDA",
    step: "06",
    status: "not_yet_started",
    title: "Production Deployment",
    parent: null,
    children: ["PRD"],
    route: "/all-experiments/model-tracking/production-deployment",
  },
  PRD: {
    id: "PRD",
    step: "06",
    status: "not_yet_started",
    title: "Production Deployment",
    parent: "PRDA",
    children: null,
    route: "/all-experiments/model-tracking/production-deployment",
  },
};