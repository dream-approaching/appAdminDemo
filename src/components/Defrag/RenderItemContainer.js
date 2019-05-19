import React from 'react';
import { Form } from 'antd';

function RenderItemContainer({ children, title, ...rest }) {
  return (
    <Form.Item label={title} key={title} {...rest}>
      {children}
    </Form.Item>
  );
}

export default React.memo(RenderItemContainer);
