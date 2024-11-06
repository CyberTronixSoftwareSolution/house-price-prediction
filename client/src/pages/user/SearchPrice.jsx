import { Alert, Button, DatePicker, InputNumber, Select } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLoading } from "../../shared/context/LoadingContext";
import dayjs from "dayjs";
import CustomLoading from "../../components/CustomLoading";
const SearchPrice = () => {
  const [suberbs, setSuberbs] = useState([]);
  const [postCodes, setPostCodes] = useState([]);

  const [room, setRoom] = useState(1);
  const [distance, setDistance] = useState(1);
  const [year, setYear] = useState(new Date());
  const [suburb, setSuburb] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [price, setPrice] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [errors, setErrors] = useState({});

  const { loading, axiosInstance } = useLoading();
  const [websckt, setWebsckt] = useState();

  useEffect(() => {
    getSuburbData();
  }, []);

  const getSuburbData = async () => {
    try {
      const response = await axiosInstance.get("/prediction/getAllStubData");
      setSuberbs(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSuberbs = (value, data) => {
    // console.log(value, data?.postalCodes);
    setPostalCode("");
    setSuburb(value);
    setPostCodes(data?.postalCodes);
  };

  const clearData = () => {
    setRoom(1);
    setDistance(1);
    setYear(new Date());
    setSuburb("");
    setPostalCode("");
    setPrice(0);
    setIsSearch(false);
    setErrors({});
  };

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws`);
    setWebsckt(ws);

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log(message);
    };
  }, []);

  const sendMessage = () => {
    websckt.send("Data Updated!");
  };

  const onSearch = async () => {
    let request = {
      Rooms: room,
      Distance: distance,
      Date: year,
      Suburb: suburb,
      Postcode: postalCode,
    };

    let errors = validate(request);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    axiosInstance
      .post("/prediction/predict", request)
      .then((response) => {
        if (response.data) {
          setPrice(response.data.data.predicted_price);
          setIsSearch(true);
          sendMessage();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validate = (data) => {
    const errors = {};
    if (!data.Suburb || data.Suburb === "") {
      errors.suburb = "Suburb is required";
    }

    if (!data.Postcode || data.Postcode === "") {
      errors.postalCode = "Postal Code is required";
    }

    if (!data.Date || data.Date === "") {
      errors.year = "Year is required";
    }

    if (!data.Rooms || data.Rooms === "") {
      errors.room = "Room is required";
    }

    if (data.Rooms < 1) {
      errors.room = "Enter valid room number";
    }
    if (!data.Distance || data.Distance === "") {
      errors.distance = "Distance is required";
    }

    if (data.Distance < 1) {
      errors.distance = "Enter valid distance";
    }
    return errors;
  };

  return (
    <>
      {loading && <CustomLoading />}
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-base text-gray-500 required">
            Suburb Name
          </label>
          <Select
            options={suberbs}
            value={suburb}
            onChange={(value, data) => onChangeSuberbs(value, data)}
            status={errors.suburb && "error"}
          />
          {errors.suburb && (
            <p className="text-red-500 text-xs">{errors.suburb}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Postal Code
            </label>
            <Select
              options={postCodes}
              value={postalCode}
              onChange={(value) => setPostalCode(value)}
              status={errors.postalCode && "error"}
            />

            {errors.postalCode && (
              <p className="text-red-500 text-xs">{errors.postalCode}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Year
            </label>
            <DatePicker
              picker="year"
              value={dayjs(year)}
              onChange={(date, dateString) => setYear(dateString)}
              status={errors.year && "error"}
            />
            {errors.year && (
              <p className="text-red-500 text-xs">{errors.year}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Distance
            </label>
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              value={distance}
              addonAfter="Km"
              onChange={(value) => setDistance(value)}
              status={errors.distance && "error"}
            />
            {errors.distance && (
              <p className="text-red-500 text-xs">{errors.distance}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Room
            </label>
            <InputNumber
              min={1}
              max={10}
              value={room}
              defaultValue={1}
              addonAfter="Room"
              onChange={(value) => setRoom(value)}
              status={errors.room && "error"}
            />
            {errors.room && (
              <p className="text-red-500 text-xs">{errors.room}</p>
            )}
          </div>
        </div>

        {isSearch && price !== 0 && (
          <Alert
            message={`Predicted Price : $${price.toFixed(2)}`}
            type="info"
          />
        )}

        {/* Search ANd clear Button */}
        <div className="flex justify-end gap-2">
          <Button
            type="primary"
            size={"middle"}
            variant="outlined"
            icon={<ClearOutlined />}
            ghost
            onClick={clearData}
          >
            Clear
          </Button>

          <Button
            key="submit"
            icon={<SearchOutlined />}
            type="primary"
            onClick={onSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchPrice;
