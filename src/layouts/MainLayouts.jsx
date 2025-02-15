import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const MainLayouts = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<DashboardOutlined />}
            onClick={() => navigate("/Pages/Dashboard/DashboardPage")}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserOutlined />}
            onClick={() => navigate("/Pages/Dashboard/DashboardUser")}
          >
            Usuarios
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<SettingOutlined />}
            onClick={() => navigate("/Pages/Dashboard/DashboardHelp")}
          >
            Configuración
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<LogoutOutlined />}
            onClick={() => navigate("/Pages/LoginPage/LoginPage")}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        {/* Header */}
        <Header style={{ background: "#fff", padding: 0 }}>
          Mi Aplicación
        
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
