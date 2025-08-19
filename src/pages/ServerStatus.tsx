import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Space,
  Button,
  Alert,
  Badge,
  Descriptions,
} from "antd";
import { useTheme } from "../contexts/ThemeContext";
import { useI18n } from "../contexts/I18nContext";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
  ApiOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface ServerStatus {
  status: "online" | "offline" | "checking";
  responseTime: number | null;
  timestamp: string;
  error?: string;
}

export const ServerStatus: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useI18n();
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    status: "checking",
    responseTime: null,
    timestamp: new Date().toISOString(),
  });
  const [isChecking, setIsChecking] = useState(false);

  const checkServerStatus = async () => {
    setIsChecking(true);
    const startTime = Date.now();

    try {
      // Test podstawowego endpointu
      const response = await fetch(window.location.origin + "/api/health", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        setServerStatus({
          status: "online",
          responseTime,
          timestamp: new Date().toISOString(),
        });
      } else {
        setServerStatus({
          status: "offline",
          responseTime,
          timestamp: new Date().toISOString(),
          error: `HTTP ${response.status}: ${response.statusText}`,
        });
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      setServerStatus({
        status: "offline",
        responseTime,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const checkAPIEndpoints = async () => {
    const endpoints = ["/api/health", "/api/translations", "/api/status"];

    console.log("=== API Endpoints Check ===");

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(window.location.origin + endpoint);
        console.log(
          `${endpoint}: ${response.status} - ${response.ok ? "OK" : "FAILED"}`
        );
      } catch (error) {
        console.log(`${endpoint}: ERROR - ${error}`);
      }
    }
  };

  useEffect(() => {
    checkServerStatus();
  }, []);

  const getStatusColor = () => {
    switch (serverStatus.status) {
      case "online":
        return "success";
      case "offline":
        return "error";
      default:
        return "processing";
    }
  };

  const getStatusIcon = () => {
    switch (serverStatus.status) {
      case "online":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
      case "offline":
        return <ExclamationCircleOutlined style={{ color: "#f5222d" }} />;
      default:
        return <ReloadOutlined spin style={{ color: "#1890ff" }} />;
    }
  };

  return (
    <div>
      <Title level={1} style={{ color: isDark ? "#fff" : "#000" }}>
        {t("serverStatus.title")}
      </Title>
      <Paragraph style={{ color: isDark ? "#fff" : "#000" }}>
        {t("serverStatus.description")}
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card
          title={
            <Space>
              <ApiOutlined />
              {t("serverStatus.serverStatus")}
            </Space>
          }
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderColor: isDark ? "#434343" : "#f0f0f0",
          }}
          extra={
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              loading={isChecking}
              onClick={checkServerStatus}
            >
              {t("serverStatus.refresh")}
            </Button>
          }
        >
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {getStatusIcon()}
              <Badge
                status={getStatusColor() as any}
                text={
                  <span
                    style={{
                      color: isDark ? "#fff" : "#000",
                      fontSize: "16px",
                    }}
                  >
                    {t("serverStatus.status")}:{" "}
                    {serverStatus.status.toUpperCase()}
                  </span>
                }
              />
            </div>

            {serverStatus.status === "offline" && serverStatus.error && (
              <Alert
                message={t("serverStatus.connectionError")}
                description={serverStatus.error}
                type="error"
                showIcon
              />
            )}

            <Descriptions bordered size="small" column={1}>
              <Descriptions.Item label={t("serverStatus.responseTime")}>
                {serverStatus.responseTime !== null
                  ? `${serverStatus.responseTime} ms`
                  : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label={t("serverStatus.lastCheck")}>
                {new Date(serverStatus.timestamp).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label={t("serverStatus.url")}>
                {window.location.origin}
              </Descriptions.Item>
            </Descriptions>
          </Space>
        </Card>

        <Card
          title={t("serverStatus.apiTests")}
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderColor: isDark ? "#434343" : "#f0f0f0",
          }}
        >
          <Space direction="vertical">
            <Paragraph style={{ color: isDark ? "#fff" : "#000" }}>
              {t("serverStatus.apiTestsDescription")}
            </Paragraph>
            <Button
              type="default"
              icon={<ApiOutlined />}
              onClick={checkAPIEndpoints}
            >
              {t("serverStatus.checkEndpoints")}
            </Button>
          </Space>
        </Card>
      </Space>
    </div>
  );
};
