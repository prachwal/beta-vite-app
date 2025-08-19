import React, { useState } from "react";
import { Layout as AntLayout } from "antd";
import { useTheme } from "../../contexts/ThemeContext";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDark } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Static styles to ensure consistency between server and client
  const layoutStyle = { minHeight: "100vh" };
  const contentStyle = {
    margin: "24px 16px",
    padding: 24,
    minHeight: 280,
    background: isDark ? "#141414" : "#fff",
    color: isDark ? "#fff" : "#000",
  };

  return (
    <AntLayout style={layoutStyle} suppressHydrationWarning>
      <Sidebar collapsed={collapsed} />
      <AntLayout>
        <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <Content style={contentStyle}>{children}</Content>
      </AntLayout>
    </AntLayout>
  );
};
