import { useMemo, useState } from "react";
import * as d3 from "d3";
import AxisBottom from "../AxisBottom";
import AxisLeft from "../AxisLeft";

const MARGIN = { top: 30, right: 30, bottom: 40, left: 30 };

let COLORS = ["#f36d3d", "#3c568c"];

type DensityProps = {
  width: number;
  height: number;
  data: { name: string; values: number[] }[];
  threshold: number;
  title: string;
};
type DensityData = [number, number];
type GroupType = {
  key: string;
  density: DensityData[];
};

const kernerDensityEstimator = (kernel: any, X: any) => {
  // console.log("kernal&X", kernel, X);

  return function (V: any) {
    // console.log("V", V);

    return X.map(function (x: any) {
      return [
        x,
        d3.mean(V, function (v: any) {
          // console.log("xv", x - v);

          return kernel(x - v);
        }),
      ];
    });
  };
};

const kernerEpachinov = (k: any) => {
  return function (v: any) {
    return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
  };
};

const bandWidth = (arr: any) => {
  kernerEpachinov;
  const n = arr.length;
  const mean = arr.reduce((a: any, b: any) => a + b, 0) / n;
  const squaredDiffs = arr.map((x: any) => Math.pow(x - mean, 2));
  const variance = squaredDiffs.reduce((a: any, b: any) => a + b, 0) / n;
  const standardDeviation = Math.sqrt(variance);
  const h = 1.06 * standardDeviation * Math.pow(n, -1 / 5);
  // console.log("h", h);

  return h;
};

export const MultipleDensityCharts = ({
  width,
  height,
  data,
  threshold,
  title,
}: DensityProps) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  if (data.length === 1) {
    if (data[0].name === "realScore") {
      COLORS = ["#f36d3d"];
    } else if (data[0].name === "fakeScore") {
      COLORS = ["#3c568c"];
    }
  } else {
    COLORS = ["#f36d3d", "#3c568c"];
  }
  if (tooltip.visible) {
    // console.log("Rendering tooltip with content:", tooltip.content);
    // ... rest of the tooltip rendering logic
  }

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allGroups = data.map((eachGroup) => eachGroup["name"]);
  // console.log("allGroups", allGroups);

  const colorScale = d3.scaleOrdinal<string>().domain(allGroups).range(COLORS);

  const xScale = useMemo(() => {
    const max = Math.max(...data.map((group) => Math.max(...group.values)));
    const min = Math.min(...data.map((group) => Math.min(...group.values)));
    const range = max - min;
    return d3
      .scaleLinear()
      .domain([min - range * 0.2, max + range * 0.2]) // Add 20%: smoothing ends up out of the data bounds when drawing
      .range([10, boundsWidth])
      .nice();
  }, [data, width]);

  const densityGenerator = (data: number[]) => {
    const kde = kernerDensityEstimator(
      kernerEpachinov(bandWidth(data)),
      xScale.ticks(40)
    );
    // console.log("Data", data);

    return kde(data);
  };

  const densityData: any = data.map((group, i) => {
    const density = densityGenerator(group.values);

    return {
      name: group.name,
      density,
    };
  });
  // console.log("densityData", densityData);
  const handleMouseOver = (event: any, group: GroupType) => {
    // Obtain the SVG or container element
    const svg = d3.select(event.currentTarget).node() as SVGSVGElement;

    // Get mouse position relative to the SVG or container
    const [mouseX, mouseY] = d3.pointer(event, svg);

    // Invert to get the data values
    const xValue = xScale.invert(mouseX);
    const yValue = yScale.invert(mouseY);

    // console.log("X Value:", xValue, "Y Value:", yValue);

    setTooltip({
      x: event.clientX,
      y: event.clientY,
      visible: true,
      content: `X: ${xValue.toFixed(2)}, Y: ${yValue.toFixed(2)}`, // rounding to 2 digits
    });
  };

  const handleMouseMove = (event: any) => {
    setTooltip((prev) => ({ ...prev, x: event.clientX, y: event.clientY }));
  };

  const handleMouseOut = () => {
    setTooltip({
      ...tooltip,
      visible: false,
    });
  };

  const allYMax = densityData.map((group: any) =>
    Math.max(...group.density.map((d: any) => d[1]))
  );
  const yMax = Math.max(...allYMax);
  // console.log("allYMax", allYMax);
  // console.log("yMax", yMax);

  const yScale = useMemo(() => {
    return d3.scaleLinear().range([boundsHeight, 0]).domain([0, yMax]);
  }, [data, height]);

  const thresholdData: any = [
    [threshold, 0],
    [threshold, yMax],
  ];

  const thresholdLineGenerator = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));

  const thresholdPath: any = thresholdLineGenerator(thresholdData);
  // console.log("Theshold path", thresholdPath);
  const thresholdLine = (
    <path
      d={thresholdPath}
      stroke="black"
      strokeWidth={1}
      strokeDasharray="5,5"
    />
  );

  const pathGenerator: any = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))
    .curve(d3.curveBasis);

  const allShapes = densityData.map((group: any, i: any) => {
    // console.log("group", group);

    // console.log("groupDensity", group.density);
    // console.log('i', i)

    const path = pathGenerator(group.density);

    const thresholdPathArray = thresholdPath.split(",");
    const thresholdTemp = thresholdPathArray[0].slice(1);
    // console.log("threshodl temp", thresholdTemp);

    const splitX = thresholdTemp;

    // Split the original path data into an array of commands
    const pathCommands = path.split(/(?=[A-Z])/);

    // Initialize two arrays for path segments above and below the split x-coordinate
    const aboveSplit = [];
    const belowSplit = [];

    // Iterate through the path commands
    for (const command of pathCommands) {
      // Check if the command contains x-coordinate values
      if (command.match(/[MLC][\d.,\s]+/)) {
        // Extract the x-coordinate from the command
        const x = parseFloat(command.match(/-?\d+(\.\d+)?/)[0]);

        // Determine whether the command belongs above or below the split x-coordinate
        if (x < splitX) {
          aboveSplit.push(command);
        } else {
          belowSplit.push(command);
        }
      } else {
        // Push non-coordinate commands to both segments
        aboveSplit.push(command);
        belowSplit.push(command);
      }
    }

    const aboveLast = aboveSplit[aboveSplit.length - 1].split(",");
    // console.log("abovesplit", aboveLast);

    // Join the path segments back into strings
    const pathAboveCommands = aboveSplit.join("");
    const pathBelowCommands = belowSplit.join("");

    const pathAbove = `${pathAboveCommands}L${splitX},330`;
    const pathBelow = `M${splitX},330L${aboveLast[aboveLast.length - 2]},${
      aboveLast[aboveLast.length - 1]
    }${pathBelowCommands}`;

    return (
      <g key={i}>
        <path
          key={i}
          d={pathAbove}
          fill={
            group.name === "realScore" ? "url(#pattern-circles)" : "#4D6EB3"
          }
          opacity={0.7}
          stroke={group.name === "realScore" ? "red" : "#3c568c"}
          strokeWidth={2}
          strokeLinejoin="round"
          onMouseOver={(e) => handleMouseOver(e, group)}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
        />

        <path
          key={i + 10}
          d={pathBelow}
          fill={group.name === "realScore" ? "red" : "url(#angled-lines)"}
          opacity={0.7}
          stroke={group.name === "realScore" ? "red" : "#3c568c"}
          strokeWidth={2}
          strokeLinejoin="round"
          onMouseOver={(e) => handleMouseOver(e, group)}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
        />
        {/* <path
          key={i+10}
          d={newSegmentB}
          fill={fillPatternB}
          opacity={0.4}
          stroke= {group.name === 'realScore' ? '#f36d3d': "#3c568c"}
          strokeWidth={2}
          strokeLinejoin="round"
        /> */}
      </g>
    );
  });
  return (
    <div style={{ position: "relative" }}>
      <svg
        width={width}
        height={height}
        className={`m-2 mx-8 p-2 bg-cool-gray rounded`}
      >
        <defs>
          <pattern
            id="angled-lines"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path d="M-1,9 L9,-1" stroke="#4D6EB3" strokeWidth="1.8" />
          </pattern>

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
        </defs>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allShapes}
          {thresholdLine}
          {/* X axis, use an additional translation to appear at the bottom */}

          <g transform={`translate(10, ${0})`}>
            <AxisLeft yScale={yScale} pixelsPerTick={40} />
          </g>
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              threshold={threshold}
            />
          </g>
          <g transform={`translate(0, 0)`} className="flex flex-row">
            <text
              className="font-poppins pb-2 fill-navy-blue"
              x={boundsWidth / 2}
              y={-MARGIN.top / 2}
              textAnchor="middle"
            >
              {title}
            </text>
          </g>
        </g>
      </svg>
      {tooltip.visible && (
        <div
          style={{
            position: "fixed", // changed from absolute to fixed
            top: `${tooltip.y}px`,
            left: `${tooltip.x}px`,
            padding: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            borderRadius: "4px",
            pointerEvents: "none",
            transform: "translate(-50%, -100%)",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};
