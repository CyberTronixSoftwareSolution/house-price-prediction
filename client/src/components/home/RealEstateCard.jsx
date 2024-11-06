// import { useEffect, useState } from "react";

import { Button } from "antd";
import { BsHouseExclamation } from "react-icons/bs";

const RealEstateCard = () => {
  return (
    <>
      <div className="grid w-full">
        <div className="relative mx-auto w-full">
          <a
            href="#"
            className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
          >
            <div className="rounded-lg bg-white p-4 shadow">
              <div className="relative flex h-52 justify-center overflow-hidden rounded-lg">
                <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                  <div className="absolute inset-0 bg-black bg-opacity-80">
                    <img
                      src="https://assets.entrepreneur.com/content/3x2/2000/20150622231001-for-sale-real-estate-home-house.jpeg?crop=16:9"
                      alt=""
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-5 mb-3 flex">
                  <p className="flex items-center font-medium text-white shadow-sm">
                    <i className="fa fa-camera mr-2 text-xl text-white"></i>
                    10
                  </p>
                </div>
                <div className="absolute bottom-0 right-5 mb-3 flex">
                  <p className="flex items-center font-medium text-gray-800">
                    <i className="fa fa-heart mr-2 text-2xl text-white"></i>
                  </p>
                </div>

                <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#1f93ff] px-2 py-1 text-xs font-semibold text-white">
                  {" "}
                  Residential{" "}
                </span>
                <span className="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white">
                  {" "}
                  <i className="fa fa-star"></i>{" "}
                </span>
              </div>

              <div className="mt-4">
                <h2
                  className="line-clamp-1 text-2xl font-medium text-gray-800 md:text-lg"
                  title="New York"
                >
                  1000 yards (Brand New) Bungalow Available in...
                </h2>

                <p className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                  <span className="text-sm uppercase"> PKR </span>
                  <span className="text-2xl">3,200,000,000</span>/Sqft
                </p>
              </div>
              <div className="mt-4">
                <p className="line-clamp-1 mt-2 text-lg text-gray-800">
                  6 bedrooms Architect designed Imported fixtures and fittings
                  Full basement Top of the [more]
                </p>
              </div>

              <div className="flex justify-end mt-2">
                <Button
                  key="submit"
                  icon={<BsHouseExclamation />}
                  type="primary"
                >
                  More Details
                </Button>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default RealEstateCard;
