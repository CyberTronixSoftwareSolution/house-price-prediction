import { Avatar, Button, Input, Modal, Popconfirm } from "antd";
import {
  LogoutOutlined,
  EditOutlined,
  PhoneOutlined,
  MailOutlined,
  InboxOutlined,
  UserOutlined,
} from "@ant-design/icons";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAuth } from "../../shared/context/AuthContext";
import { useLoading } from "../../shared/context/LoadingContext";
import { useNavigate } from "react-router-dom";
import { LocalStorageService } from "../../shared/localStorage.service";
import CustomLoading from "../../components/CustomLoading";
import { CustomToastService } from "../../shared/message.service";

const AdminProfilePage = () => {
  const [showEditUser, setShowEditUser] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState(null);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // update profile details
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  const { authUser, setUser } = useAuth();
  const { loading, axiosInstance } = useLoading();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (authUser) {
      fetchUserDetails();
    }
  }, [authUser]);

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(`/user/profile`);

      if (response.data) {
        setLoggedInUser(response?.data?.data);
        setName(response.data?.data.name);
        setMobileNumber(response.data?.data.mobileNumber);
        setEmail(response.data?.data.email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update User Details
  const updateUserDetails = async (e) => {
    e.preventDefault();

    let data = {
      name: name,
      email: email,
      mobileNumber: mobileNumber,
      role: 0,
    };
    const validationErrors = validateUserDetails(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    try {
      const response = await axiosInstance.put(`/user/update`, data);

      if (response.data) {
        CustomToastService.success(response.data.message);
        setShowEditUser(false);
        fetchUserDetails();
      }
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  // clear user details
  const clearUserDetails = () => {
    setName(loggedInUser?.name);
    setMobileNumber(loggedInUser?.mobileNumber);
    setEmail(loggedInUser?.email);
    setErrors({});
  };

  // Logout
  const logout = () => {
    LocalStorageService.removeUser();
    setUser(null);
    navigate("/");
  };

  // Validations
  const validateUserDetails = (data) => {
    const errors = {};
    if (!data.name || data.name === "") {
      errors.name = true;
    }

    if (!data.mobileNumber || data.mobileNumber === "") {
      errors.mobileNumber = true;
    }

    if (data.email === null || data.email === "") {
      errors.email = true;
    }

    return errors;
  };

  return (
    <>
      {loading && !showEditUser && <CustomLoading />}
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
        <div className="px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar size={64} icon={<UserOutlined />} />

            <div className="flex flex-col">
              <div className="text-xl font-bold leading-none tracking-tight text-black md:text-3xl lg:text-2xl dark:text-black">
                {loggedInUser?.name}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-500">
                  <PhoneOutlined /> {loggedInUser?.mobileNumber}
                </span>

                <span className="text-sm font-semibold text-gray-500">
                  <MailOutlined /> {loggedInUser?.email}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              icon={<EditOutlined />}
              ghost
              onClick={() => setShowEditUser(!showEditUser)}
            >
              Edit Profile
            </Button>
            <Popconfirm
              title="Logout Confirmation"
              description="Are you sure to logout?"
              onConfirm={logout}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
              placement="bottomLeft"
            >
              <Button type="primary" danger icon={<LogoutOutlined />} ghost>
                LogOut
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3 mb-6">
          <div
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl "
            style={{ height: "400px" }}
          >
            <div className="p-6 flex justify-between items-center">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Education
              </h5>

              <Tooltip title="Add Education" placement="right">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setShowAddEdu(!showAddEdu)}
                ></Button>
              </Tooltip>
            </div>
            <div className="px-6 py-2">
              <div
                className="overflow-hidden overflow-y-scroll"
                style={{ height: "300px" }}
              >
                {educations.length === 0 && <DataNotFound name={"Education"} />}

                {educations.map((education) => (
                  <EducationCard
                    education={education}
                    key={education?.id}
                    onDelete={deleteOption}
                  />
                ))}
              </div>
            </div>
          </div>
        </div> */}

      <Modal
        title="EDIT USER DETAILS"
        open={showEditUser}
        onOk={updateUserDetails}
        onCancel={() => {
          setShowEditUser(false);
          clearUserDetails();
        }}
        centered
        width={600}
        maskClosable={false}
      >
        {loading && <CustomLoading />}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Full Name
            </label>
            <Input
              placeholder="Full Name"
              value={name}
              id="name"
              status={errors.name && "error"}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                Email
              </label>
              <Input
                placeholder="email"
                readOnly
                value={loggedInUser?.email}
                id="email"
                status={errors.email && "error"}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="Phone Number"
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9]/g, "")
                    .slice(0, 12);
                }}
                value={mobileNumber}
                id="mobileNumber"
                status={errors.mobileNumber && "error"}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminProfilePage;

const DataNotFound = ({ name }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <InboxOutlined style={{ fontSize: "50px" }} className="text-gray-400" />
      <p className="text-gray-500">No {name} Found</p>
    </div>
  );
};

DataNotFound.propTypes = {
  name: PropTypes.string,
};
