import React, { Component } from 'react';
import { connect } from 'dva';
// import { Row, Col, Icon, Menu, Dropdown } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import IntroduceRow from './IntroduceRow';

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Analysis extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  render() {
    const { chart, loading } = this.props;
    const { visitData } = chart;

    return (
      <PageHeaderWrapper>
        <IntroduceRow loading={loading} visitData={visitData} />
      </PageHeaderWrapper>
    );
  }
}

export default Analysis;
