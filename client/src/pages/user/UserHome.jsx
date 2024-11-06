import { Carousel } from "antd";
import { useState, useEffect } from "react";
import { useLoading } from "../../shared/context/LoadingContext";
import CustomLoading from "../../components/CustomLoading";
import image1 from "../../assets/images/home/1.png";
import image2 from "../../assets/images/home/2.png";
import image3 from "../../assets/images/home/3.png";
import RealEstateCard from "../../components/home/RealEstateCard";

const UserHome = () => {
  const [houses, setHouses] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const { loading, axiosInstance } = useLoading();

  return (
    <>
      {loading && <CustomLoading />}
      <div className="">
        <Carousel
          arrows={true}
          autoplay
          autoplaySpeed={3000}
          dotPosition="bottom"
          effect="scrollx"
          style={{ height: "420px" }}
        >
          <div>
            <img
              src={image1}
              alt="img"
              style={{ height: "420px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src={image2}
              alt="img"
              style={{ height: "420px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src={image3}
              alt="img"
              style={{ height: "420px", width: "100%", objectFit: "cover" }}
            />
          </div>
        </Carousel>
      </div>

      <div className="p-4 mt-2">
        <h1 className="text-3xl font-bold text-center">
          Welcome to Haven Finders
        </h1>
        <p className="text-center text-gray-500">
          The best place to find your dream home
        </p>
      </div>

      {houses.length > 0 && (
        <div className="p-4 mt-4">
          {/* <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Available Houses
            </span>
          </h1> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {houses.map((house) => (
              <RealEstateCard key={house._id} job={house} applyForJob={{}} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserHome;
