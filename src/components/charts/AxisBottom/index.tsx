// AxisBottom component
import { useMemo } from "react";
import { ScaleLinear } from "d3";

type AxisBottomProps = {
  xScale: ScaleLinear<number, number>;
  pixelsPerTick: number;
  threshold: number;
};

const TICK_LENGTH = 6;

const AxisBottom = ({ xScale, pixelsPerTick, threshold }: AxisBottomProps) => {
  const range = xScale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

    const allTicks = xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));

    // Check if the specific value (threshold) is already present in the ticks
    const specificValue = threshold;
    const isSpecificValuePresent = allTicks.some(
      (tick) => tick.value === specificValue
    );

    // If the specific value is not present, manually add it to the ticks
    if (!isSpecificValuePresent) {
      const specificTickXOffset = xScale(specificValue);
      allTicks.push({ value: specificValue, xOffset: specificTickXOffset });
    }

    // Sort the ticks based on their value
    allTicks.sort((a, b) => a.value - b.value);

    return allTicks;
  }, [xScale, pixelsPerTick, threshold]);

  return (
    <>
      {/* Main horizontal line */}
      <path
        d={["M", range[0], 0, "L", range[1], 0].join(" ")}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y2={TICK_LENGTH} stroke="currentColor" />
          {value === threshold && (
            <rect
              x={-25} // half of assumed text width for centering
              y={-315} // position above the tick
              width={50} // assumed text width
              height={20} // assumed text height
              fill="#F2F3F7" // background color
            />
          )}
          <text
            style={{
              fontSize: value === threshold ? "15px" : "10px",
              textAnchor: "middle",
              transform: `translateY(${value === threshold ? -300 : 20}px)`,
              fontWeight: value === threshold ? "bold" : "normal",
              fill: value === threshold ? "#211F9F" : "black",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

export default AxisBottom;
