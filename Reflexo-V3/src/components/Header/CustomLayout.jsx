import React from "react";
import { Layout } from "antd";
import CustomHeader from "./Header";

const { Content } = Layout;

export default function CustomLayout({ children, title, isBack }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CustomHeader title={title} isBack={isBack} />
      <Layout>
        <Content
          style={{
            padding: "24px 40px",
            background: "#f5f5f5",
            width: "100%",     
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}