import { useMemo } from "react";
import { ScaleLinear } from "d3";

type AxisLeftProps = {
  yScale: ScaleLinear<number, number>;
  pixelsPerTick: number;
};

const TICK_LENGTH = 6;

const AxisLeft = ({ yScale, pixelsPerTick }: AxisLeftProps) => {
  const range = yScale.range();

  const ticks = useMemo(() => {
    const height = range[0] - range[1];
    const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  return (
    <>
      {/* Main horizontal line */}
      <path
        d={["M", 0, range[1], "L", 0, range[0]].join(" ")}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          <line x2={-TICK_LENGTH} stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "end",
              transform: "translate(-10px,4px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

export default AxisLeft;
