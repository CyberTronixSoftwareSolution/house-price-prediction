import { Line } from "react-chartjs-2";

const LineChart = ({ chartData }) => {
  return (
    <>
      {chartData == null ? (
        <NoData />
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  // Customizing tooltip to include additional data fields
                  label: function (tooltipItem) {
                    const index = tooltipItem.dataIndex;
                    const item = chartData.datasets[0].extraInfo[index];
                    return [
                      `Price: $${tooltipItem.raw.toFixed(2)}`,
                      `Suburb: ${item.suburb}`,
                      `Rooms: ${item.rooms}`,
                      `Postcode: ${item.postcode}`,
                      `Distance: ${item.distance} km`,
                      `Year: ${item.date}`,
                    ];
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Generated Time",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Price ($)",
                },
              },
            },
          }}
        />
      )}
    </>
  );
};

export default LineChart;

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-xl font-semibold">No data available</h1>
    </div>
  );
};
