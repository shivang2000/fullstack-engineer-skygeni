"use client";
// import { IPieChartData } from "@/app/api/pie-chart/route";
import React, { useEffect, useState } from "react";
import { arc, pie } from "d3";

const width = 500;
const height = 500;
// const margin = { top: 20, right: 20, bottom: 20, left: 20 };
// new customer first color , old customer second color
const colors = ["#FF8C27", "#3685BB"];

const CustomPieChart = () => {
  const [data, setData] = useState<
    {
      value: number;
      percentage: number;
      color: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/pie-chart");
      const result = await response.json();
      console.log("result.data", result.data);

      const d = [
        {
          value: result.data.totalForCustTypeNew,
          percentage:
            (result.data.totalForCustTypeNew / result.data.total) * 100,
          color: colors[0],
        },
        {
          value: result.data.totalForCustTypeOld,
          percentage:
            (result.data.totalForCustTypeOld / result.data.total) * 100,
          color: colors[1],
        },
      ];

      setData(d);
    };

    fetchData();
  }, []);

  const pieChart = pie().value((d) => d.value)(data);

  console.log("asdsadfasdf", data, pieChart);

  return data ? (
    <svg width={width + 200} height={height}>
      <text
        x="50%"
        y="50%"
        dy="0"
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight={800}
      >
        <tspan x={"50%"} dy="0rem">
          Total
        </tspan>
        <tspan x={"50%"} dy="1.1rem">
          $
          {new Intl.NumberFormat().format(
            Math.round(data.reduce((acc, cur) => acc + cur.value, 0) / 1000)
          )}
          K
        </tspan>
      </text>
      <g>
        <g transform={`translate(${(width + 200) / 2},${height / 2})`}>
          {pieChart.map((d, idx) => {
            const arcData = arc()
              .innerRadius(100)
              .outerRadius(200)
              .startAngle(d.startAngle)
              .endAngle(d.endAngle)
              .padAngle(d.padAngle);

            const [centroidX, centroidY] = arcData.centroid();

            const x2 =
              centroidX + (centroidX / Math.abs(centroidX)) * (width / 8);
            const y2 =
              centroidY + (centroidY / Math.abs(centroidY)) * (height / 8);

            return (
              <React.Fragment key={idx}>
                <path d={arcData()} fill={colors[idx]} />

                <line
                  x1={centroidX}
                  y1={centroidY}
                  x2={x2}
                  y2={y2}
                  opacity={0.5}
                  stroke="#DEDEDE"
                />
                <text x={x2} y={y2} textAnchor={x2 < 0 ? "end" : "start"}>
                  $
                  {new Intl.NumberFormat().format(
                    Math.round(+d.data.value / 100)
                  )}
                  K ({Math.round(d.data.percentage)}%)
                </text>
              </React.Fragment>
            );
          })}
        </g>
      </g>
    </svg>
  ) : null;
};

export default CustomPieChart;
