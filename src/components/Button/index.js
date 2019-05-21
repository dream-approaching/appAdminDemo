import React from 'react';
import { Button } from 'antd';

export default class MyButton extends React.PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Button style={{ margin: '0 5px' }} type="primary" {...rest}>
        {children}
      </Button>
    );
  }
}
