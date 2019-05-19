import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect()
class KindsSite extends Component {
  render() {
    const { children } = this.props;
    return <PageHeaderWrapper>{children}</PageHeaderWrapper>;
  }
}

export default KindsSite;
