import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export const SSRSafeLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Completely static styles - no dynamic values
  const staticLayoutStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row" as const,
  };

  const staticContentStyle = {
    margin: "24px 16px",
    padding: 24,
    minHeight: 280,
    backgroundColor: "#ffffff", // Fixed colors - no theme switching for now
    color: "#000000",
    borderRadius: "6px",
  };

  return (
    <div style={staticLayoutStyle}>
      <div
        style={{
          width: collapsed ? "80px" : "200px",
          transition: "width 0.2s",
        }}
      >
        <Sidebar collapsed={collapsed} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ height: "64px" }}>
          <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </div>
        <div style={staticContentStyle}>{children}</div>
      </div>
    </div>
  );
};

export default SSRSafeLayout;
