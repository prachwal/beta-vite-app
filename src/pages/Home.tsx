import React from "react";
import { Card, Typography, Space, Button } from "antd";
import { useI18n } from "../contexts/I18nContext";
import { useTheme } from "../contexts/ThemeContext";
import {
  PlayCircleOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const Home: React.FC = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();

  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <Title
        level={1}
        style={{
          color: isDark ? "#fff" : "#000",
          marginBottom: "16px",
          wordBreak: "normal",
          whiteSpace: "normal",
        }}
      >
        {t("home.title")}
      </Title>
      <Paragraph
        style={{
          color: isDark ? "#fff" : "#000",
          marginBottom: "24px",
          wordBreak: "normal",
          whiteSpace: "normal",
        }}
      >
        {t("home.subtitle")}
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card
          title={t("home.features.title")}
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderColor: isDark ? "#434343" : "#f0f0f0",
          }}
        >
          <Space direction="vertical">
            <Button type="primary" icon={<PlayCircleOutlined />} size="large">
              {t("home.features.start")}
            </Button>
            <Button icon={<BookOutlined />}>
              {t("home.features.documentation")}
            </Button>
            <Button icon={<SettingOutlined />}>
              {t("home.features.settings")}
            </Button>
          </Space>
        </Card>

        <Card
          title={t("home.welcome.title")}
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderColor: isDark ? "#434343" : "#f0f0f0",
          }}
        >
          <Paragraph style={{ color: isDark ? "#fff" : "#000" }}>
            {t("home.welcome.description")}
          </Paragraph>
        </Card>
      </Space>
    </div>
  );
};
