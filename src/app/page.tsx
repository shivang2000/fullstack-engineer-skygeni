import CustomBarChart from "@/components/CustomBarChart";
import CustomDatabaseViewTable from "@/components/CustomDatabaseViewTable";
import CustomPieChart from "@/components/CustomPieChart";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen w-screen p-4">
      {/* header */}
      <div>Won ACV mix by Cust Type</div>

      {/* main content */}
      <div className="w-full flex flex-col gap-10">
        <div className="w-full flex justify-between">
          {/* Bar Chart */}
          <CustomBarChart />

          {/* Pie Chart */}
          <CustomPieChart />
        </div>

        {/* Table */}
        <CustomDatabaseViewTable />
      </div>
    </div>
  );
}
