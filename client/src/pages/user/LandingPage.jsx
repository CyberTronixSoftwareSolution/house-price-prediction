// import { Link } from "react-router-dom";
// import image from "../../assets/images/landing.png";

// const LandingPage = () => {
//   return (
//     <>
//       <div className="bg-violet-100 min-h-screen">
//         <div className="flex flex-col lg:flex-row justify-center items-center h-full px-5 md:px-10 lg:px-20 py-10">
//           <div className="w-full lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-black">
//               YOUNG{" "}
//               <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
//                 NETWORK
//               </mark>
//             </h1>
//             <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-600 mt-4 lg:mt-8">
//               Welcome to Young Network – where connections create opportunities!
//             </h3>
//             <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-4">
//               Unlock your professional potential with Young Network, the premier
//               platform for networking, career development, and business growth.
//               Whether you&apos;re a seasoned professional, an aspiring
//               entrepreneur, or a recent graduate, Young Network is your gateway
//               to a world of possibilities.
//             </p>

//             <div className="flex justify-center lg:justify-start mt-8 gap-4">
//               <Link to="/signIn">
//                 <div className="relative inline-flex group">
//                   <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
//                   <button
//                     className="relative inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base md:text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
//                     role="button"
//                   >
//                     Continue as User
//                   </button>
//                 </div>
//               </Link>
//             </div>
//           </div>

//           <div className="hidden lg:flex w-full lg:w-1/2 justify-center lg:justify-end">
//             <img
//               src={image}
//               alt="Related image"
//               draggable={false}
//               className="w-4/5 md:w-3/4 lg:w-full max-w-md"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LandingPage;

import { Link } from "react-router-dom";
import image from "../../assets/images/landing.png"; // Update with relevant image

const LandingPage = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="flex flex-col lg:flex-row justify-center items-center h-full px-5 md:px-10 lg:px-20 py-10">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-gray-900">
              FIND YOUR{" "}
              <mark className="px-2 text-white bg-green-600 rounded">
                DREAM HOME
              </mark>
            </h1>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 mt-4 lg:mt-8">
              Discover the best properties for sale in your area!
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-4">
              Whether you’re looking for a cozy home or a luxury property, we
              offer a wide range of listings to suit your needs. Explore
              neighborhoods, compare prices, and take the first step towards
              finding your new home.
            </p>

            <div className="flex justify-center lg:justify-start mt-8 gap-4">
              <Link to="/signIn">
                <div className="relative inline-flex group">
                  <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                  <button
                    className="relative inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base md:text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                  >
                    Continue as User
                  </button>
                </div>
              </Link>
              <Link to="/contact">
                <button className="px-4 py-2 text-sm sm:text-base md:text-lg font-bold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          {/* Hide the image on mobile screens */}
          <div className="hidden lg:flex w-full lg:w-1/2 justify-center lg:justify-end">
            <img
              src={image}
              alt="Beautiful house"
              draggable={false}
              className="w-4/5 md:w-3/4 lg:w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
