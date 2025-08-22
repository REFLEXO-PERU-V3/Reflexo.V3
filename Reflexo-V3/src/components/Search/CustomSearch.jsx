import React from "react";
import { Input, ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "../../features/themeContext/themeContext";
const { Search } = Input;
const CustomSearch = ({ placeholder, onSearch, width }) => {
  const { theme } = useTheme();

  const antdThemeConfig = {
    token: {
      colorBgContainer: theme === 'dark' ? '#1f1f1f' : '#fff',
      colorText: theme === 'dark' ? '#fff' : '#000',
      colorBorder: theme === 'dark' ? '#444' : '#d9d9d9',
      colorTextPlaceholder: theme === 'dark' ? '#aaa' : '#bfbfbf',
    },
    algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <Search
        placeholder={placeholder}
        onSearch={onSearch}
        style={{ width: width }}
      />
    </ConfigProvider>
  );
};

export default CustomSearch;