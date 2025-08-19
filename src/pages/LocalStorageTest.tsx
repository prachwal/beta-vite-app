import React, { useState, useEffect } from "react";
import { Card, Button, Typography, Space, Divider } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useI18n } from "../contexts/I18nContext";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSelector } from "../components/LanguageSelector";

const { Title, Paragraph, Text } = Typography;

interface TestData {
  id: number;
  name: string;
  value: string;
  timestamp: string;
}

export const LocalStorageTest: React.FC = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const [testData, setTestData] = useState<TestData[]>([]);
  const [lastAction, setLastAction] = useState<string>("");

  // Get Redux state for system monitoring
  const themeState = useSelector((state: RootState) => state.theme);
  const languageState = useSelector((state: RootState) => state.i18n);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = localStorage.getItem("testData");
    if (data) {
      setTestData(JSON.parse(data));
    }
  };

  const saveData = () => {
    const newItem: TestData = {
      id: Date.now(),
      name: `Test ${Date.now()}`,
      value: `Value ${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    const updatedData = [...testData, newItem];
    localStorage.setItem("testData", JSON.stringify(updatedData));
    setTestData(updatedData);
    setLastAction("Dodano nowy element");
  };

  const clearData = () => {
    localStorage.removeItem("testData");
    setTestData([]);
    setLastAction("Wyczyszczono dane");
  };

  const removeItem = (id: number) => {
    const updatedData = testData.filter((item) => item.id !== id);
    localStorage.setItem("testData", JSON.stringify(updatedData));
    setTestData(updatedData);
    setLastAction("Usunięto element");
  };

  return (
    <div>
      <Title level={1} style={{ color: isDark ? "#fff" : "#000" }}>
        {t("localStorageTest.title")}
      </Title>
      <Paragraph style={{ color: isDark ? "#fff" : "#000" }}>
        {t("localStorageTest.description")}
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card
          title={t("localStorageTest.controls")}
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderColor: isDark ? "#434343" : "#f0f0f0",
          }}
        >
          <Space direction="vertical" size="middle">
            <Space direction="vertical">
              <Text strong style={{ color: isDark ? "#fff" : "#000" }}>
                Theme Controls (System Support):
              </Text>
              <ThemeToggle showSystemOption={true} />
            </Space>

            <Divider />

            <Space direction="vertical">
              <Text strong style={{ color: isDark ? "#fff" : "#000" }}>
                Language Controls (System Support):
              </Text>
              <LanguageSelector showSystemOption={true} />
            </Space>

            <Divider />

            <Space>
              <Button type="primary" onClick={saveData} size="middle">
                {t("localStorageTest.addData")}
              </Button>
              <Button danger onClick={clearData} size="middle">
                {t("localStorageTest.clearData")}
              </Button>
            </Space>
            {lastAction && (
              <Paragraph style={{ color: isDark ? "#fff" : "#000" }}>
                Ostatnia akcja: {lastAction}
              </Paragraph>
            )}
          </Space>
        </Card>

        <Card
          title="System Status"
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderColor: isDark ? "#434343" : "#f0f0f0",
          }}
        >
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Space>
              <Text strong style={{ color: isDark ? "#fff" : "#000" }}>
                Theme:
              </Text>
              <Text style={{ color: isDark ? "#ccc" : "#666" }}>
                {themeState.isDark ? "Dark" : "Light"}(
                {themeState.themeSource === "system" ? "System" : "Manual"})
              </Text>
            </Space>
            <Space>
              <Text strong style={{ color: isDark ? "#fff" : "#000" }}>
                Language:
              </Text>
              <Text style={{ color: isDark ? "#ccc" : "#666" }}>
                {languageState.language.toUpperCase()}(
                {languageState.languageSource === "browser"
                  ? "Browser"
                  : "Manual"}
                )
              </Text>
            </Space>
            <Space>
              <Text strong style={{ color: isDark ? "#fff" : "#000" }}>
                Theme Listener:
              </Text>
              <Text
                style={{
                  color: themeState.isSystemThemeListenerActive
                    ? "#52c41a"
                    : "#ff4d4f",
                }}
              >
                {themeState.isSystemThemeListenerActive ? "Active" : "Inactive"}
              </Text>
            </Space>
            <Space>
              <Text strong style={{ color: isDark ? "#fff" : "#000" }}>
                Language Listener:
              </Text>
              <Text
                style={{
                  color: languageState.isLanguageListenerActive
                    ? "#52c41a"
                    : "#ff4d4f",
                }}
              >
                {languageState.isLanguageListenerActive ? "Active" : "Inactive"}
              </Text>
            </Space>
          </Space>
        </Card>

        <div
          style={{
            height: 32,
            margin: "16px 0",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "4px",
          }}
        />

        <Card
          title={t("localStorageTest.data")}
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderColor: isDark ? "#434343" : "#f0f0f0",
          }}
        >
          {testData.length === 0 ? (
            <Paragraph style={{ color: isDark ? "#fff" : "#000" }}>
              {t("localStorageTest.noData")}
            </Paragraph>
          ) : (
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {testData.map((item) => (
                <Card
                  key={item.id}
                  size="small"
                  style={{
                    background: isDark ? "#2a2a2a" : "#fafafa",
                    borderColor: isDark ? "#434343" : "#f0f0f0",
                  }}
                >
                  <Space direction="vertical" size="small">
                    <div>
                      <strong style={{ color: isDark ? "#fff" : "#000" }}>
                        {item.name}
                      </strong>
                    </div>
                    <div style={{ color: isDark ? "#ccc" : "#666" }}>
                      {item.value}
                    </div>
                    <div
                      style={{ color: isDark ? "#999" : "#888", fontSize: 12 }}
                    >
                      {item.timestamp}
                    </div>
                    <Button
                      size="small"
                      danger
                      onClick={() => removeItem(item.id)}
                    >
                      {t("localStorageTest.remove")}
                    </Button>
                  </Space>
                </Card>
              ))}
            </Space>
          )}
        </Card>
      </Space>
    </div>
  );
};
