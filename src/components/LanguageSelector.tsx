import React from "react";
import { Space, Button, Dropdown, Typography, Checkbox } from "antd";
import { GlobalOutlined, DesktopOutlined } from "@ant-design/icons";
import { useI18n } from "../contexts/I18nContext";
import { useTheme } from "../contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setLanguage, setBrowserLanguage } from "../store/slices/i18nSlice";

const { Text } = Typography;

interface LanguageSelectorProps {
  label?: string;
  labelStyle?: React.CSSProperties;
  size?: "small" | "middle" | "large";
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  showSystemOption?: boolean;
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  label,
  labelStyle,
  size = "small",
  placement = "bottomRight",
  showSystemOption = false,
  disabled = false,
}) => {
  const {
    t,
    language,
    languages,
    changeLanguage,
    setBrowserLanguage: contextSetBrowserLanguage,
  } = useI18n();
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const languageSource = useSelector(
    (state: RootState) => state.i18n.languageSource
  );

  const displayLabel = label || t("language.select");
  const isSystemMode = languageSource === "browser";

  const handleSystemToggle = (checked: boolean) => {
    if (checked) {
      dispatch(setBrowserLanguage());
    } else {
      // Switch to manual mode with current language
      dispatch(setLanguage(language));
    }
  };

  const languageMenu = {
    items: languages.map((lang) => ({
      key: lang,
      label: lang.toUpperCase(),
    })),
    onClick: ({ key }: { key: string }) => {
      if (!isSystemMode) {
        changeLanguage(key);
      }
    },
    selectedKeys: [language],
  };

  return (
    <Space direction="vertical" size={4}>
      <Space size={size}>
        <Text
          style={{
            color: isDark ? "#fff" : "#000",
            marginRight: 8,
            ...labelStyle,
          }}
        >
          {displayLabel}
        </Text>
        <Dropdown
          menu={languageMenu}
          placement={placement}
          disabled={disabled || isSystemMode}
        >
          <Button
            type="text"
            icon={<GlobalOutlined />}
            style={{
              color: isDark ? "#fff" : "#000",
              cursor: disabled || isSystemMode ? "not-allowed" : "pointer",
              opacity: disabled || isSystemMode ? 0.5 : 1,
            }}
            disabled={disabled || isSystemMode}
          >
            {language.toUpperCase()}
            {isSystemMode && (
              <span style={{ fontSize: "10px", marginLeft: 4 }}>
                ({t("language.auto") || "auto"})
              </span>
            )}
          </Button>
        </Dropdown>
      </Space>

      {showSystemOption && (
        <Space size="small">
          <Checkbox
            checked={isSystemMode}
            onChange={(e) => handleSystemToggle(e.target.checked)}
          >
            <Text
              style={{
                color: isDark ? "#fff" : "#000",
                fontSize: "12px",
                ...labelStyle,
              }}
            >
              <DesktopOutlined style={{ marginRight: 4 }} />
              {t("language.useSystem") || "Use browser language"}
            </Text>
          </Checkbox>
        </Space>
      )}
    </Space>
  );
};
