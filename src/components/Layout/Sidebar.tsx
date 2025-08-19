import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useI18n } from "../../contexts/I18nContext";
import { useTheme } from "../../contexts/ThemeContext";
import {
  HomeOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  ApiOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: t("nav.home"),
    },
    {
      key: "/about",
      icon: <InfoCircleOutlined />,
      label: t("nav.about"),
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: t("nav.settings"),
    },
    {
      key: "/server-status",
      icon: <ApiOutlined />,
      label: "Server Status",
    },
    {
      key: "/localStorage-test",
      icon: <ExperimentOutlined />,
      label: "LocalStorage Test",
    },
  ];

  return (
    <Sider
      suppressHydrationWarning
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        background: isDark ? "#001529" : "#fff",
        borderRight: isDark ? "none" : "1px solid #f0f0f0",
      }}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.3)",
        }}
      />
      <Menu
        theme={isDark ? "dark" : "light"}
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ border: "none" }}
      />
    </Sider>
  );
};
