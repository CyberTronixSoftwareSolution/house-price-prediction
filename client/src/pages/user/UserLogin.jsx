import { Link, useNavigate } from "react-router-dom";
import Login from "../../assets/images/login.png";
import { useState } from "react";
import { useLoading } from "../../shared/context/LoadingContext";
import { CustomToastService } from "../../shared/message.service";
import CustomLoading from "../../components/CustomLoading";
import { LocalStorageService } from "../../shared/localStorage.service";
import { useAuth } from "../../shared/context/AuthContext";

const UserLogin = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const { loading, axiosInstance } = useLoading();
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    try {
      const response = await axiosInstance.post("/auth/login", formData);

      if (response.data) {
        let user = response?.data?.data;
        LocalStorageService.setUser(user);
        setUser(user);
        clearValues();
        CustomToastService.success(response.data.message);
        if (user.role == 1) {
          navigate("/");
        } else {
          navigate("/admin/dashboard");
        }
      }
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  const clearValues = () => {
    setFormData({});
  };

  const validate = (data) => {
    const errors = {};
    if (!data.email || data.email === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      {loading && <CustomLoading />}
      <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
        <div className="max-w-screen-xl h-[550px] bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-green-50 text-center hidden md:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
              <img src={Login} alt="login" width={"500px"} draggable={false} />
            </div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-lime-900">
                  Sign In
                </h1>
                <p className="text-[12px] text-gray-500">
                  Hey there! Sign in and start managing your system
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <div>
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Enter your email"
                      id="email"
                      onChange={handleChange}
                    />

                    {errors.email && (
                      <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs">{errors.password}</p>
                    )}
                  </div>
                  <button
                    className="mt-5 tracking-wide font-semibold bg-green-900 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={onSubmit}
                  >
                    <span className="ml-3">Sign In</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Don&apos;t have an account?
                    <Link to="/signUp">
                      <span className="text-green-900 font-semibold">
                        &nbsp; Sign Up
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
