import React from "react";
import { Card, Typography, Space, Row, Col, Tag } from "antd";
import { useI18n } from "../contexts/I18nContext";
import { useTheme } from "../contexts/ThemeContext";
import {
  GithubOutlined,
  ApiOutlined,
  DatabaseOutlined,
  CodeOutlined,
  RocketOutlined,
  SafetyOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const About: React.FC = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();

  const technologies = [
    { name: "React 18", category: "Frontend", color: "blue" },
    { name: "TypeScript", category: "Language", color: "cyan" },
    { name: "Ant Design", category: "UI Framework", color: "geekblue" },
    { name: "Redux Toolkit", category: "State Management", color: "purple" },
    { name: "Vite", category: "Build Tool", color: "green" },
    { name: "Node.js", category: "Runtime", color: "lime" },
    { name: "Express", category: "Backend", color: "orange" },
    { name: "React Router", category: "Routing", color: "volcano" },
    { name: "i18next", category: "Internationalization", color: "gold" },
    { name: "Vercel", category: "Deployment", color: "magenta" },
  ];

  const features = [
    {
      icon: <GlobalOutlined />,
      title: t("about.features.ssr.title"),
      description: t("about.features.ssr.description"),
    },
    {
      icon: <SafetyOutlined />,
      title: t("about.features.typeSafety.title"),
      description: t("about.features.typeSafety.description"),
    },
    {
      icon: <ApiOutlined />,
      title: t("about.features.api.title"),
      description: t("about.features.api.description"),
    },
    {
      icon: <DatabaseOutlined />,
      title: t("about.features.stateManagement.title"),
      description: t("about.features.stateManagement.description"),
    },
  ];

  return (
    <div>
      <Title
        level={1}
        style={{ color: isDark ? "#fff" : "#000", marginBottom: 8 }}
      >
        {t("about.title")}
      </Title>
      <Paragraph
        style={{
          color: isDark ? "#fff" : "#000",
          fontSize: 18,
          marginBottom: 32,
        }}
      >
        {t("about.description")}
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card
          title={
            <Title
              level={3}
              style={{ margin: 0, color: isDark ? "#fff" : "#000" }}
            >
              <CodeOutlined style={{ marginRight: 8 }} />
              {t("about.architecture.title")}
            </Title>
          }
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderColor: isDark ? "#434343" : "#f0f0f0",
          }}
        >
          <Paragraph style={{ color: isDark ? "#fff" : "#000", fontSize: 16 }}>
            {t("about.architecture.description")}
          </Paragraph>

          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            {technologies.map((tech) => (
              <Col key={tech.name}>
                <Tag
                  color={tech.color}
                  style={{
                    fontSize: 14,
                    padding: "4px 12px",
                    borderRadius: 16,
                  }}
                >
                  {tech.name}
                </Tag>
              </Col>
            ))}
          </Row>
        </Card>

        <Row gutter={[16, 16]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} key={index}>
              <Card
                style={{
                  background: isDark ? "#1f1f1f" : "#fff",
                  borderColor: isDark ? "#434343" : "#f0f0f0",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    marginBottom: 12,
                    color: isDark ? "#1890ff" : "#0050b3",
                  }}
                >
                  {feature.icon}
                </div>
                <Title
                  level={4}
                  style={{ color: isDark ? "#fff" : "#000", marginBottom: 8 }}
                >
                  {feature.title}
                </Title>
                <Paragraph
                  style={{ color: isDark ? "#fff" : "#000", margin: 0 }}
                >
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        <Card
          title={
            <Title
              level={3}
              style={{ margin: 0, color: isDark ? "#fff" : "#000" }}
            >
              <RocketOutlined style={{ marginRight: 8 }} />
              {t("about.specs.title")}
            </Title>
          }
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderColor: isDark ? "#434343" : "#f0f0f0",
          }}
        >
          <Row gutter={[32, 16]}>
            <Col xs={24} md={12}>
              <Title level={4} style={{ color: isDark ? "#fff" : "#000" }}>
                {t("about.techStack.frontend")}
              </Title>
              <Paragraph style={{ color: isDark ? "#fff" : "#000", margin: 0 }}>
                {t("about.techStack.frontendList")}
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <Title level={4} style={{ color: isDark ? "#fff" : "#000" }}>
                {t("about.techStack.backend")}
              </Title>
              <Paragraph style={{ color: isDark ? "#fff" : "#000", margin: 0 }}>
                {t("about.techStack.backendList")}
              </Paragraph>
            </Col>
          </Row>
        </Card>

        <Card
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderColor: isDark ? "#434343" : "#f0f0f0",
            textAlign: "center",
          }}
        >
          <GithubOutlined
            style={{
              fontSize: 32,
              color: isDark ? "#fff" : "#000",
              marginBottom: 16,
            }}
          />
          <Title level={4} style={{ color: isDark ? "#fff" : "#000" }}>
            {t("about.openSource")}
          </Title>
          <Paragraph style={{ color: isDark ? "#fff" : "#000" }}>
            {t("about.openSourceDescription")}
          </Paragraph>
        </Card>
      </Space>
    </div>
  );
};
