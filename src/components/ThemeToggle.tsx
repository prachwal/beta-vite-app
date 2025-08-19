import React from "react";
import { Switch, Space, Typography, Checkbox } from "antd";
import { MoonOutlined, SunOutlined, DesktopOutlined } from "@ant-design/icons";
import { useTheme } from "../contexts/ThemeContext";
import { useI18n } from "../contexts/I18nContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setTheme, setSystemTheme } from "../store/slices/themeSlice";

const { Text } = Typography;

interface ThemeToggleProps {
  label?: string;
  labelStyle?: React.CSSProperties;
  size?: "small" | "middle" | "large";
  showSystemOption?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  label,
  labelStyle,
  size = "small",
  showSystemOption = false,
}) => {
  const { isDark: theme } = useTheme();
  const { t } = useI18n();
  const dispatch = useDispatch();
  const themeSource = useSelector(
    (state: RootState) => state.theme.themeSource
  );

  const displayLabel = label || t("theme.darkMode");

  const isSystemMode = themeSource === "system";

  const handleSystemToggle = (checked: boolean) => {
    if (checked) {
      dispatch(setSystemTheme());
    } else {
      // Switch to manual mode with current theme
      dispatch(setTheme({ isDark: theme, source: theme ? "dark" : "light" }));
    }
  };

  const handleManualToggle = (checked: boolean) => {
    if (!isSystemMode) {
      dispatch(
        setTheme({ isDark: checked, source: checked ? "dark" : "light" })
      );
    }
  };

  return (
    <Space direction="vertical" size={4}>
      <Space size={size}>
        <Text
          style={{
            color: theme ? "#fff" : "#000",
            marginRight: 8,
            ...labelStyle,
          }}
        >
          {displayLabel}
        </Text>
        <Switch
          checked={theme}
          onChange={handleManualToggle}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          disabled={isSystemMode}
        />
      </Space>

      {showSystemOption && (
        <Space size="small">
          <Checkbox
            checked={isSystemMode}
            onChange={(e) => handleSystemToggle(e.target.checked)}
          >
            <Text
              style={{
                color: theme ? "#fff" : "#000",
                fontSize: "12px",
                ...labelStyle,
              }}
            >
              <DesktopOutlined style={{ marginRight: 4 }} />
              {t("theme.useSystem") || "Use system settings"}
            </Text>
          </Checkbox>
        </Space>
      )}
    </Space>
  );
};
