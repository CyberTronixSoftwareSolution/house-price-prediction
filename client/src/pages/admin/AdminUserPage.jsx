import { Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLoading } from "../../shared/context/LoadingContext";
import CustomLoading from "../../components/CustomLoading";
const columns = [
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
  },
  {
    title: "Joined Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => {
      return createdAt.split("T")[0];
    },
  },
];

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [tempUsers, setTempUsers] = useState([]);

  const { loading, axiosInstance } = useLoading();

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/user/getAll");
      setUsers(response?.data?.data);
      setTempUsers(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSearch = (e) => {
    if (e === "") {
      setUsers(tempUsers);
    } else {
      const filteredUsers = tempUsers.filter((user) =>
        user.name.toLowerCase().includes(e.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  };
  return (
    <>
      {loading && <CustomLoading />}
      <div className="flex flex-col gap-6 p-3">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Users</h1>
            <Input
              size="middle"
              placeholder="Search Users"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              onChange={(e) => {
                onSearch(e.target.value);
              }}
            />
          </div>

          <span>
            <Table
              pagination={{
                pageSize: 5,
              }}
              columns={columns}
              dataSource={users}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default AdminUserPage;
