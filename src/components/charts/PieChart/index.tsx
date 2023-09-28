import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface LegionData {
  legion: string;
  value: number;
}

interface PieChartProps {
  data: LegionData[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<LegionData>().value((d) => d.value);
    const pieData = pie(data);

    const arc: any = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = svg
      .selectAll(".arc")
      .data(pieData)
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i: any) => color(i))
      .on("mouseover", (event, d) => {
        // Handle mouseover event, e.g., highlight the slice
        d3.select(event.currentTarget).attr("fill", "orange");
      })
      .on("mouseout", (event, d) => {
        // Handle mouseout event, e.g., reset the slice color
        d3.select(event.currentTarget).attr("fill", "blue");
      });
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default PieChart;
