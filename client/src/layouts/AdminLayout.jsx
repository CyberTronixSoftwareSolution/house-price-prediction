import { useEffect, useState } from "react";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Layout,
  theme,
  Breadcrumb,
  Menu,
  Dropdown,
  Avatar,
} from "antd";
import SideBar from "../components/sidebar/sidebar.jsx";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LocalStorageService } from "../shared/localStorage.service.js";
import { useAuth } from "../shared/context/AuthContext.jsx";
const { Header, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbItem, setBreadcrumbItem] = useState([]);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const path = location.pathname;

  useEffect(() => {
    const pathArr = path.split("/");
    if (pathArr.includes("admin") && pathArr.includes("users")) {
      setBreadcrumbItem([<Breadcrumb.Item key="user">Users</Breadcrumb.Item>]);
      setPageTitle("Users Management");
    } else if (pathArr.includes("admin") && pathArr.includes("dashboard")) {
      setBreadcrumbItem([
        <Breadcrumb.Item key="dashboard">Dashboard</Breadcrumb.Item>,
      ]);
      setPageTitle("Dashboard");
    }
  }, [path]);

  const logout = () => {
    LocalStorageService.removeUser();
    setUser(null);
    navigate("/");
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/admin/profile">
          <a target="_blank" rel="noopener noreferrer">
            <UserOutlined /> Profile
          </a>
        </Link>
      </Menu.Item>

      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            logout();
          }}
        >
          <LogoutOutlined /> LogOut
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <SideBar collapsed={collapsed} />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-between items-center">
            <Button
              type="text"
              icon={
                collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "20px",
                width: 64,
                height: 64,
              }}
            />
            <div className="mr-3">
              <Dropdown
                overlay={menu}
                placement="bottomLeft"
                style={{
                  marginRight: "20px",
                }}
              >
                <Avatar size="large" icon={<UserOutlined />} />
              </Dropdown>
            </div>
          </div>
        </Header>
        <div className="flex justify-between items-center">
          <h1
            style={{
              margin: "16px 24px",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {pageTitle}
          </h1>
          <Breadcrumb style={{ margin: "16px 24px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            {breadcrumbItem}
          </Breadcrumb>
        </div>
        <Content
          style={{
            margin: "0px 16px",
            padding: 1,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
