import React from 'react';
import { Icon } from 'antd';

export const uploadButton = (text = 'Upload') => {
  return (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">{text}</div>
    </div>
  );
};
