import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface SimpleLayoutProps {
  children: React.ReactNode;
}

export const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children }) => {
  const { isDark } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        backgroundColor: isDark ? "#001529" : "#f5f5f5",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: collapsed ? "80px" : "200px",
          backgroundColor: isDark ? "#001529" : "#fff",
          borderRight: isDark ? "none" : "1px solid #f0f0f0",
          transition: "width 0.2s",
        }}
      >
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div
          style={{
            height: "64px",
            backgroundColor: isDark ? "#001529" : "#fff",
            borderBottom: isDark ? "none" : "1px solid #f0f0f0",
          }}
        >
          <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            margin: "24px 16px",
            padding: "24px",
            minHeight: "calc(100vh - 64px - 48px)",
            maxHeight: "calc(100vh - 64px - 48px)",
            overflow: "auto",
            backgroundColor: isDark ? "#141414" : "#fff",
            color: isDark ? "#fff" : "#000",
            borderRadius: "6px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SimpleLayout;
