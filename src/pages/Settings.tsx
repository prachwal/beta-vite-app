import React from "react";
import { Card, Typography, Space } from "antd";
import { useI18n } from "../contexts/I18nContext";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSelector } from "../components/LanguageSelector";

const { Title, Paragraph } = Typography;

export const Settings: React.FC = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();

  return (
    <div>
      <Title level={1} style={{ color: isDark ? "#fff" : "#000" }}>
        {t("settings.title")}
      </Title>
      <Paragraph style={{ color: isDark ? "#fff" : "#000" }}>
        {t("settings.description")}
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card
          title={t("settings.appearance.title")}
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderColor: isDark ? "#434343" : "#f0f0f0",
          }}
        >
          <Space direction="vertical" size="middle">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ThemeToggle label="" />
            </div>
          </Space>
        </Card>

        <Card
          title={t("settings.language.title")}
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderColor: isDark ? "#434343" : "#f0f0f0",
          }}
        >
          <Space direction="vertical" size="middle">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <LanguageSelector label="" showSystemOption={true} />
            </div>
          </Space>
        </Card>

        <Card
          title={t("settings.about.title")}
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderColor: isDark ? "#434343" : "#f0f0f0",
          }}
        >
          <Paragraph style={{ color: isDark ? "#fff" : "#000" }}>
            {t("settings.about.description")}
          </Paragraph>
        </Card>
      </Space>
    </div>
  );
};
