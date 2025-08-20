import React, { useEffect, useState } from "react";
import { Layout, Typography, Space, Button, theme } from "antd";
import { ArrowLeft } from "@phosphor-icons/react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useNavigate, useLocation } from "react-router-dom";

dayjs.locale("es");

const { Header } = Layout;
const { Text } = Typography;

const routeTitleMap = {
  "/": "Inicio",
  "/dashboard": "Dashboard",
  "/patients": "Pacientes",
  "/patients/new": "Nuevo Paciente",
  "/appointments": "Citas",
  "/reports": "Reportes",
  "/payments": "Pagos",
  "/staff": "Personal",
  "/configuration": "Configuración",
  "/history": "Historial",
  "/statistic": "Estadísticas",
};

export default function CustomHeader({ title: titleProp, isBack = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();

  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm:ss"));
  const [currentDate, setCurrentDate] = useState(
    dayjs().format("dddd, D [de] MMMM [del] YYYY")
  );

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTime(dayjs().format("HH:mm:ss"));
      setCurrentDate(dayjs().format("dddd, D [de] MMMM [del] YYYY"));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const title = titleProp ?? routeTitleMap[location.pathname] ?? "";

  const showBack =
    isBack && location.pathname !== "/dashboard" && location.pathname !== "/";

  return (
    <Header
      style={{
        background: token.colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: 20,
        height: 64,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Space>
        {showBack && (
          <Button
            type="text"
            onClick={() => navigate(-1)}
            icon={<ArrowLeft size={20} weight="bold" />}
          />
        )}
        <Text strong style={{ fontSize: 18 }}>
          {title}
        </Text>
      </Space>

      <Space direction="vertical" align="end" style={{ lineHeight: 1 }}>
        <Text strong>{currentTime}</Text>
        <Text
          type="secondary"
          style={{ textTransform: "capitalize", opacity: 0.85 }}
        >
          {currentDate}
        </Text>
      </Space>
    </Header>
  );
}