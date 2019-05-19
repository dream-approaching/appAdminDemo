import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class ShortVideo extends Component {
  render() {
    return <div>ShortVideo</div>;
  }
}

export default ShortVideo;
