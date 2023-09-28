import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface LegionData {
  legion: string;
  count: number;
}

interface BarChartProps {
  data: LegionData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales and axes
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.legion))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) || 0])
      .nice()
      .range([height, 0]);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));

    // Create bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.legion) || 0)
      .attr("y", (d) => yScale(d.count))
      .attr("width", xScale.bandwidth() || 0)
      .attr("height", (d) => height - yScale(d.count))
      .on("mouseover", (event, d) => {
        // Handle mouseover event, e.g., highlight the bar
        d3.select(event.target).attr("fill", "orange");
      })
      .on("mouseout", (event, d) => {
        // Handle mouseout event, e.g., reset the bar color
        d3.select(event.target).attr("fill", "steelblue");
      });
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;
