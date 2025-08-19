import React from "react";
import { Layout, Space, Button } from "antd";
import { useTheme } from "../../contexts/ThemeContext";
import { ThemeToggle } from "../ThemeToggle";
import { LanguageSelector } from "../LanguageSelector";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  collapsed,
  toggleCollapsed,
}) => {
  const { isDark: theme } = useTheme();

  return (
    <AntHeader
      suppressHydrationWarning
      style={{
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: theme ? "#001529" : "#fff",
        borderBottom: theme ? "none" : "1px solid #f0f0f0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          type="text"
          icon={collapsed ? "☰" : "✕"}
          onClick={toggleCollapsed}
          style={{
            fontSize: "16px",
            color: theme ? "#fff" : "#000",
            marginRight: 16,
          }}
        />
      </div>

      <Space size="large">
        <ThemeToggle
          labelStyle={{ color: theme ? "#fff" : "#000" }}
          showSystemOption={false}
        />
        <LanguageSelector
          labelStyle={{ color: theme ? "#fff" : "#000" }}
          showSystemOption={false}
        />
      </Space>
    </AntHeader>
  );
};
