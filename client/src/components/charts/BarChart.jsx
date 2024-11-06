import React from "react";
import { Bar, Pie } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  return (
    <>
      {chartData == null ? (
        <NoData />
      ) : (
        <Bar
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      )}
    </>
  );
};

export default BarChart;
const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-xl font-semibold">No data available</h1>
    </div>
  );
};
