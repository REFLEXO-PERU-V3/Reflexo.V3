import React from "react";
import { Pagination } from "antd";

const ModeloPagination = ({ total, current, pageSize, onChange }) => {
  const handleChange = (page, size) => {
    onChange(page, size);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginTop: '20px',
      }}
    >
      <div>
        <Pagination
          showSizeChanger={false}
          current={current}
          total={total}
          pageSize={pageSize}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        {pageSize} / página
      </div>
    </div>
  );
};

export default ModeloPagination;