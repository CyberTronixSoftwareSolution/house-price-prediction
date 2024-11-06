import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useLoading } from "../../shared/context/LoadingContext";
import PieChart from "../../components/charts/PieChart";
import { CategoryScale } from "chart.js";
import BarChart from "../../components/charts/BarChart";
import LineChart from "../../components/charts/LineChart";
import moment from "moment";
Chart.register(CategoryScale);

const AdminDashboardPage = () => {
  const { axiosInstance } = useLoading();
  const [suberbs, setSuberbs] = useState([]);

  const [suburbPieChartData, setSuburbPieChartData] = useState(null);
  const [suburbPieChartDate, setSuburbPieChartDate] = useState(dayjs());

  const [suburbData, setSuburbData] = useState("Abbotsford");
  const [avgPriceData, setAvgPriceData] = useState(null);

  const [prdictionChartData, setPrdictionChartData] = useState(null);
  const [prdictionChartDate, setPrdictionChartDate] = useState(dayjs());

  const [websckt, setWebsckt] = useState();

  useEffect(() => {
    fetchSuburbSearchCountByDateData(suburbPieChartDate);
    getSuburbData();
    fetchPredictionDataByMonth(prdictionChartDate);
  }, [suburbPieChartDate]);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws`);
    setWebsckt(ws);

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (message) {
        getAvgPriceDataBySuburb(suburbData);
        fetchSuburbSearchCountByDateData(suburbPieChartDate);
        fetchPredictionDataByMonth(prdictionChartDate);
      }
    };
  }, []);

  const getSuburbData = async () => {
    try {
      const response = await axiosInstance.get("/prediction/getAllStubData");
      setSuberbs(response.data.data);
      getAvgPriceDataBySuburb();
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSubrb = (value) => {
    setSuburbData(value);
    getAvgPriceDataBySuburb(value);
  };

  const getAvgPriceDataBySuburb = async () => {
    const response = await axiosInstance.get(
      `/prediction/yearlySuburbsPrice/${suburbData}`
    );

    if (response.data.isSuccessful) {
      const data = response.data.data;
      const labels = data?.map((item) => item.year);
      const avgPrices = data?.map((item) => item.average_price);

      let obj = {
        labels: labels,
        datasets: [
          {
            data: avgPrices,
          },
        ],
      };
      setAvgPriceData(obj);
    }
  };

  const handleDateChange = (date) => {
    setSuburbPieChartDate(date);
    fetchSuburbSearchCountByDateData(date);
  };

  const fetchSuburbSearchCountByDateData = async (date) => {
    try {
      const formattedDate = date.format("YYYY-MM-DD");
      const response = await axiosInstance.get(
        `/prediction/resultBySuburbs?date=${formattedDate}`
      );

      if (response.data.isSuccessful) {
        const data = response.data.data;
        const labels = data?.map((item) => item.suburb);
        const counts = data?.map((item) => item.count);

        let obj = {
          labels: labels,
          datasets: [
            {
              data: counts,
            },
          ],
        };
        setSuburbPieChartData(obj);

        // console.log(suburbPieChartDate);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePrdictionDateChange = (date) => {
    setPrdictionChartDate(date);
    fetchPredictionDataByMonth(date);
  };

  const fetchPredictionDataByMonth = async (date) => {
    try {
      const formattedDate = date.format("YYYY-MM-DD");
      const response = await axiosInstance.get(
        `/prediction/allPredictionForMonth?date=${formattedDate}`
      );

      if (response.data.isSuccessful) {
        const data = response.data.data;

        const labels = data.map((item) =>
          // dayjs(item.dateTime).format("MM-DD HH:mm")
          moment(item.dateTime).format("l")
        );
        const prices = data.map((item) => item.price);

        console.log(labels);

        setPrdictionChartData({
          labels: labels,
          datasets: [
            {
              label: "Price Over Time",
              data: prices,
              borderColor: "#36A2EB",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true,
              tension: 0.1,
              extraInfo: data,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {/* {loading && <CustomLoading />} */}
      <div className="h-[78vh] overflow-y-scroll">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <div className="block rounded-lg bg-green-100 shadow-secondary-1 dark:bg-surface-dark dark:text-black text-surface">
              <div className="px-6 py-3 flex justify-between">
                <h5 className="mb-2 text-xl font-medium leading-tight">
                  Monthly Prediction By Suburb
                </h5>

                <DatePicker
                  value={suburbPieChartDate}
                  onChange={handleDateChange}
                  picker="month"
                  clearIcon={false}
                />
              </div>
              <div className="pb-6" style={{ height: "320px" }}>
                <PieChart chartData={suburbPieChartData} title="" />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="block rounded-lg bg-green-100 shadow-secondary-1 dark:bg-surface-dark dark:text-black text-surface">
              <div className="px-6 py-3 flex justify-between">
                <h5 className="mb-2 text-xl font-medium leading-tight">
                  Average Prices By Years
                </h5>

                <Select
                  options={suberbs}
                  value={suburbData}
                  onChange={(value) => onChangeSubrb(value)}
                  clearIcon={false}
                  style={{ width: "200px" }}
                  showSearch={true}
                  filterOption={(input, option) =>
                    option.value.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </div>
              <div className="pb-6" style={{ height: "320px" }}>
                <BarChart chartData={avgPriceData} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-3">
          <div className="col-span-12 md:col-span-12">
            <div className="block rounded-lg bg-green-100 shadow-secondary-1 dark:bg-surface-dark dark:text-black text-surface">
              <div className="px-6 py-3 flex justify-between">
                <h5 className="mb-2 text-xl font-medium leading-tight">
                  Moth Wise Prediction Data
                </h5>

                <DatePicker
                  value={prdictionChartDate}
                  onChange={handlePrdictionDateChange}
                  picker="month"
                  clearIcon={false}
                />
              </div>
              <div className="pb-6" style={{ height: "400px", width: "100%" }}>
                <LineChart chartData={prdictionChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
