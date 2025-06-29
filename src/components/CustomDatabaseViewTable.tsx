import { IBarChartSingleData } from "@/app/api/bar-chart-data/route";
import React from "react";
import { GET as fetchData } from "@/app/api/bar-chart-data/route";

const CustomDatabaseViewTable = async () => {
  const response = await fetchData();
  const result = await response.json();
  const data: IBarChartSingleData[] = result.data;

  return (
    <div className="w-full">
      <table className="w-full border-2 border-solid border-gray-300">
        <thead>
          <tr>
            <th className="border-2 border-solid border-gray-300 px-2">
              Closed Fiscal Quater
            </th>
            {data.map((d, idx) => (
              <th
                key={d.closed_fiscal_quarter}
                className={`border-2 border-solid border-gray-300 text-white px-2 ${
                  idx % 2 === 0 ? "bg-[#4371C4]" : "bg-[#5B9AD5]"
                }`}
                colSpan={3}
              >
                {d.closed_fiscal_quarter}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-2 border-solid border-gray-300">
            <td className="text-center ">Cust Type</td>
            {data.map((d) => (
              <React.Fragment key={d.closed_fiscal_quarter}>
                <td className="border-2 border-solid border-gray-300 text-center ">
                  # of Opps
                </td>
                <td className="border-2 border-solid border-gray-300 text-center ">
                  ACV
                </td>
                <td className="border-2 border-solid border-gray-300 text-center ">
                  % of Total
                </td>
              </React.Fragment>
            ))}
          </tr>
          <tr className="border-2 border-solid border-gray-300">
            <td className="px-1">Existing Customer</td>
            {data.map((d) => (
              <React.Fragment key={d.closed_fiscal_quarter}>
                <td className="border-2 border-solid border-gray-300 text-right px-2">
                  {Math.round(
                    d.combined_data.find(
                      (cd) => cd.Cust_Type === "Existing Customer"
                    )?.count ?? 0
                  )}
                </td>
                <td className="border-2 border-solid border-gray-300 text-right px-2">
                  $
                  {new Intl.NumberFormat().format(
                    Math.round(
                      d.combined_data.find(
                        (cd) => cd.Cust_Type === "Existing Customer"
                      )?.acv ?? 0
                    )
                  )}
                </td>
                <td className="border-2 border-solid border-gray-300 text-right px-2">
                  {Math.round(
                    ((d.combined_data.find(
                      (cd) => cd.Cust_Type === "Existing Customer"
                    )?.acv ?? 0) /
                      d.total_acv) *
                      100
                  )}
                  %
                </td>
              </React.Fragment>
            ))}
          </tr>
          <tr className="border-2 border-solid border-gray-300">
            <td className="px-1">New Customer</td>
            {data.map((d) => (
              <React.Fragment key={d.closed_fiscal_quarter}>
                <td className="border-2 border-solid border-gray-300 text-right px-2">
                  {Math.round(
                    d.combined_data.find(
                      (cd) => cd.Cust_Type === "New Customer"
                    )?.count ?? 0
                  )}
                </td>
                <td className="border-2 border-solid border-gray-300 text-right px-2">
                  $
                  {new Intl.NumberFormat().format(
                    Math.round(
                      d.combined_data.find(
                        (cd) => cd.Cust_Type === "New Customer"
                      )?.acv ?? 0
                    )
                  )}
                </td>
                <td className="border-2 border-solid border-gray-300 text-right px-2">
                  {Math.round(
                    ((d.combined_data.find(
                      (cd) => cd.Cust_Type === "New Customer"
                    )?.acv ?? 0) /
                      d.total_acv) *
                      100
                  )}
                  %
                </td>
              </React.Fragment>
            ))}
          </tr>
          <tr className="border-2 border-solid border-gray-300">
            <td className="px-1">Total</td>
            {data.map((d) => (
              <React.Fragment key={d.closed_fiscal_quarter}>
                <td className="border-2 border-solid border-gray-300 text-right px-2">
                  {Math.round(d.total_count ?? 0)}
                </td>
                <td className="border-2 border-solid border-gray-300 text-right px-2">
                  ${new Intl.NumberFormat().format(Math.round(d.total_acv))}
                </td>
                <td className="border-2 border-solid border-gray-300 text-right px-2">
                  100%
                </td>
              </React.Fragment>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomDatabaseViewTable;
