import { Layout } from "antd";
import React from "react";
import CustomHeader from "./Header";

const { Content } = Layout;

export default function CustomLayout({ children, title, isBack }) {
  return (
    <Layout style={{ height: '100%', background: 'transparent' }}>
      <CustomHeader title={title} isBack={isBack} />
      <Layout style={{ background: 'transparent' }}>
        <Content
          style={{
            padding: '24px 40px',
            background: 'transparent',
            width: '100%',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}