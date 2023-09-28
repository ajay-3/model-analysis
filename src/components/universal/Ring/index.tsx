import styles from "./index.module.scss";
const CleanPercentage = (percentage: any) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({ colour, percentage, cx, cy }: any) => {
  const r = cx * 0.7;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage + 3) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
  return (
    <circle
      r={r}
      cx={cx}
      cy={cy}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={`${cx / 75}rem`}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round"
      style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
    ></circle>
  );
};

const Text = ({ percentage }: any) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fill="#16161d"
      className={styles["text"]}
      style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
    >
      {percentage.toFixed(2)}%
    </text>
  );
};

const Ring = ({ percentage, colour, title, className }: any) => {
  const pct = CleanPercentage(percentage);
  const width = 90;
  const height = 90;
  return (
    <div className={styles["ring"]}>
      <svg width={width} height={height}>
        <g transform={`rotate(-90 ${width / 2} ${height / 2})`}>
          <Circle colour="white" cx={width / 2} cy={height / 2} />
          <Circle
            colour={colour}
            percentage={pct}
            cx={width / 2}
            cy={height / 2}
          />
        </g>
        <Text percentage={pct} />
      </svg>
      <div className={styles["title"]}>{title}</div>
    </div>
  );
};

export default Ring;
