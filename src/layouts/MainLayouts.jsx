import React from "react";
import { Layout, Menu, message } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("group_id");
  localStorage.removeItem("role");
  window.location.href = "/LoginPage";
};

const MainLayouts = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  
  if (token === null) {
    message.error("Debes iniciar sesión");
    setTimeout(() => {
        window.location.href = "/LoginPage";
    }, 1000); // Redirige después de 1 segundo
}
  
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<DashboardOutlined />}
            onClick={() => navigate("/DashboardPage")}
          >
            Tasks
          </Menu.Item>
          {userRole !== "1" && userRole !== "2" && (
          <Menu.Item
            key="2"
            icon={<UserOutlined />}
            onClick={() => navigate("/DashboardUser")}
          >
            Usuarios
          </Menu.Item>
          )}
            {userRole !== "1" && userRole !== "2" && (
          <Menu.Item
            key="3"
            icon={<TeamOutlined />}
            onClick={() => navigate("/DashboardGroups")}
          >
            Groups
          </Menu.Item>
              )}
          <Menu.Item
            key="4"
            icon={<LogoutOutlined />}
            onClick={() => logout()}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        {/* Header */}
        <Header style={{ background: "#fff", padding: 0 }}>
          
        
        </Header>

        {/* Contenido dinámico */}
        <Content
          style={{ margin: "16px", padding: "16px", background: "#fff" }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayouts;
