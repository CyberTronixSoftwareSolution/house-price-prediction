import { SyncLoader } from "react-spinners";

const CustomLoading = () => {
  return (
    <>
      <div
        className="fixed top-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50"
        style={{ zIndex: 9999 }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-center items-center">
            <SyncLoader color="rgb(175, 225, 175)" margin={6} size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomLoading;
