import { Pie } from "react-chartjs-2";

const PieChart = ({ chartData, title }) => {
  return (
    <>
      {chartData == null ? (
        <NoData />
      ) : (
        <Pie
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: title,
              },
            },

            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      )}
    </>
  );
};

export default PieChart;

//  is suburbPieChartData == null show no data component
const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-xl font-semibold">No data available</h1>
    </div>
  );
};
