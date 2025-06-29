"use client";
import { IBarChartSingleData } from "@/app/api/bar-chart-data/route";
import { scaleBand, scaleLinear } from "d3";
import { useEffect, useState } from "react";

const width = 720;
const height = 500;
const margin = { top: 10, right: 0, bottom: 20, left: 20 };

const CustomBarChart = () => {
  const [data, setData] = useState<IBarChartSingleData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/bar-chart-data");
      const result = await response.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  const xScale = scaleBand()
    .domain(data.map((d) => d.closed_fiscal_quarter))
    .range([margin.left, width - margin.right])
    .padding(0.5);

  const yScale = scaleLinear()
    .domain([0, Math.max(...data.map((d) => d.total_acv))])
    .nice()
    .range([height - margin.bottom - margin.top, margin.top]);

  return data ? (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* x scale mapping */}
        {xScale.domain().map((tickValue) => (
          <g key={tickValue}>
            <line
              x1={(xScale(tickValue) ?? 0) + xScale.bandwidth() / 2}
              x2={(xScale(tickValue) ?? 0) + xScale.bandwidth() / 2}
              y1={height - margin.bottom - margin.top + 2}
              y2={height - margin.bottom - margin.top + 7}
              strokeWidth={2}
              stroke="#DEDEDE"
            />
            <text
              key={tickValue}
              style={{ textAnchor: "middle" }}
              x={(xScale(tickValue) ?? 0) + xScale.bandwidth() / 2}
              y={height - margin.top}
            >
              {tickValue}
            </text>
          </g>
        ))}
        {/* Y scale mapping */}
        {yScale.ticks().map((tickValue) => (
          <g key={tickValue}>
            <text
              textAnchor="middle"
              alignmentBaseline="central"
              // dy=".71em"
              y={yScale(tickValue)}
              x={0}
            >
              {tickValue / 1000}
            </text>
            <line
              x1={margin.left}
              x2={width}
              y1={yScale(tickValue)}
              y2={yScale(tickValue)}
              strokeWidth={2}
              stroke="#DEDEDE"
            />
            <line
              x1={margin.left}
              x2={margin.left - 5}
              y1={yScale(tickValue)}
              y2={yScale(tickValue)}
              strokeWidth={2}
              stroke="black"
            />
          </g>
        ))}

        {/* x y scale axis lines */}
        <line
          x1={margin.left}
          y1={height - margin.bottom - margin.top + 2}
          x2={margin.left}
          y2={0}
          strokeWidth={2}
          stroke="#DEDEDE"
        />
        <line
          x1={margin.left - 5}
          y1={height - margin.bottom - margin.top + 1}
          x2={height + width}
          y2={height - margin.bottom - margin.top + 1}
          strokeWidth={2}
          opacity={0.5}
          stroke="#DEDEDE"
        />

        {data.map((d, idx) => {
          const acvValueForNewCustomer =
            d.combined_data.find((cd) => cd.Cust_Type === "New Customer")
              ?.acv ?? 0;

          const YForNewCustomer = yScale(acvValueForNewCustomer);
          const heightForNewCustomer =
            height -
            yScale(acvValueForNewCustomer) -
            margin.bottom -
            margin.top;
          const YForNewCustomerText =
            YForNewCustomer + heightForNewCustomer / 2;

          const acvValueForExistingCustomer =
            d.combined_data.find((cd) => cd.Cust_Type === "Existing Customer")
              ?.acv ?? 0;

          const YForExistingCustomer =
            yScale(acvValueForExistingCustomer) - heightForNewCustomer;
          const heightForExistingCustomer =
            height -
            yScale(acvValueForExistingCustomer) -
            margin.bottom -
            margin.top;

          const YForExistingCustomerText =
            YForExistingCustomer + heightForExistingCustomer / 2;
          return (
            <g key={idx}>
              {/* existing customer bar */}
              <rect
                x={xScale(d.closed_fiscal_quarter) || 0}
                y={YForExistingCustomer}
                width={xScale.bandwidth()}
                height={heightForExistingCustomer}
                fill="#3685BB"
              />
              {/* new customer bar */}
              <rect
                x={xScale(d.closed_fiscal_quarter) || 0}
                y={YForNewCustomer}
                width={xScale.bandwidth()}
                height={heightForNewCustomer}
                fill="#FF8C27"
              />
              {/* new customer text */}
              <text
                x={xScale(d.closed_fiscal_quarter)}
                y={YForNewCustomerText}
                dy="0"
                fontWeight={800}
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan
                  x={
                    (xScale(d.closed_fiscal_quarter) ?? 0) +
                    xScale.bandwidth() / 2
                  }
                  fontWeight={800}
                  fill="white"
                  dy="0rem"
                >
                  $
                  {new Intl.NumberFormat().format(
                    Math.round(acvValueForNewCustomer / 1000)
                  )}
                  K
                </tspan>
                <tspan
                  x={
                    (xScale(d.closed_fiscal_quarter) ?? 0) +
                    xScale.bandwidth() / 2
                  }
                  fontWeight={800}
                  fill="white"
                  dy="1.1rem"
                >
                  ({Math.round((acvValueForNewCustomer / d.total_acv) * 100)}
                  %)
                </tspan>
              </text>

              {/* new existing text */}

              <text
                x={xScale(d.closed_fiscal_quarter)}
                y={YForExistingCustomerText}
                dy="0"
                fontWeight={800}
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan
                  x={
                    (xScale(d.closed_fiscal_quarter) ?? 0) +
                    xScale.bandwidth() / 2
                  }
                  fontWeight={800}
                  fill="white"
                  dy="0rem"
                >
                  $
                  {new Intl.NumberFormat().format(
                    Math.round(acvValueForExistingCustomer / 1000)
                  )}
                  K
                </tspan>
                <tspan
                  x={
                    (xScale(d.closed_fiscal_quarter) ?? 0) +
                    xScale.bandwidth() / 2
                  }
                  fontWeight={800}
                  fill="white"
                  dy="1.1rem"
                >
                  (
                  {Math.round(
                    (acvValueForExistingCustomer / d.total_acv) * 100
                  )}
                  %)
                </tspan>
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  ) : null;
};

export default CustomBarChart;
