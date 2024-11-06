import {
  Input,
  Avatar,
  Button,
  Menu,
  Tooltip,
  Dropdown,
  Popconfirm,
  Drawer,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { TbZoomMoney } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
import { LocalStorageService } from "../../shared/localStorage.service";
import { useAuth } from "../../shared/context/AuthContext";
import { useState } from "react";
import SearchPrice from "../../pages/user/SearchPrice";

const UserHeader = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { setUser } = useAuth();

  const logout = () => {
    LocalStorageService.removeUser();
    setUser(null);
    navigate("/signIn");
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/userProfile">
          <a target="_blank" rel="noopener noreferrer">
            <UserOutlined /> Profile
          </a>
        </Link>
      </Menu.Item>

      <Popconfirm
        title="Logout Confirmation"
        description="Are you sure to logout?"
        onConfirm={logout}
        onCancel={() => {}}
        okText="Yes"
        cancelText="No"
        placement="bottomLeft"
      >
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer">
            <LogoutOutlined /> LogOut
          </a>
        </Menu.Item>
      </Popconfirm>
    </Menu>
  );
  return (
    <>
      <nav className="relative flex w-full bg-zinc-50 py-2 shadow-dark-mild dark:bg-green-400 lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <span className="text-xl text-black dark:text-white">
            <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl dark:text-white">
              Haven{" "}
              <mark className="px-2 text-white bg-lime-600 rounded dark:bg-lime-500">
                Finders
              </mark>
            </h1>
          </span>
          <div className="flex items-center justify-end gap-2">
            <Link to="/">
              <Tooltip placement="bottom" title={"Home"}>
                <Button
                  type="text"
                  shape="circle"
                  icon={<HomeOutlined />}
                  style={{ color: "white", fontSize: "1.2rem" }}
                />
              </Tooltip>
            </Link>

            <div className="hidden sm:block">
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined />}
                style={{ width: 250 }}
                className="rounded-full ml-2 mr-2"
              />
            </div>

            <Tooltip placement="bottom" title={"Search Price"}>
              <Button
                type="text"
                shape="circle"
                icon={<TbZoomMoney />}
                style={{ color: "white", fontSize: "1.2rem" }}
                onClick={() => setOpen(true)}
              />
            </Tooltip>
          </div>

          <Dropdown overlay={menu} placement="bottomLeft">
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </nav>

      <Drawer
        closable
        destroyOnClose
        title={<p>Search Price With AI</p>}
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        width={500}
      >
        <SearchPrice />
      </Drawer>
    </>
  );
};

export default UserHeader;
