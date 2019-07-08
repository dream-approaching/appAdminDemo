import React from 'react';
import Table from '@/components/MyTable';
// import { Form } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { exploreType, publishStatus } from '@/config/constants';
import { orderColumn } from './columns';

@connect(({ explore, loading }) => ({
  explore,
  loading: loading.effects['explore/queryExploreListEffect'],
}))
class Order extends React.Component {
  state = {
    currentPage: 1,
  };

  componentDidMount() {
    // this.queryExploreListDispatch();
  }

  queryExploreListDispatch = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'explore/queryExploreListEffect',
      payload: {
        pageType: exploreType.explore.key,
        page: 1,
        rows: 15,
        status: publishStatus.pending.key,
        ...params,
      },
    });
  };

  handleChangePage = (page, pageSize) => {
    this.setState({ currentPage: page });
    const requestBody = {
      page,
      rows: pageSize,
    };
    this.queryExploreListDispatch(requestBody);
  };

  handleChangePageSize = (current, pageSize) => {
    console.log(current, pageSize);
  };

  render() {
    const { currentPage } = this.state;
    const { loading } = this.props;
    return (
      <PageHeaderWrapper>
        <Table
          pagination={{
            current: currentPage,
            total: 0,
            onChange: this.handleChangePage,
            showSizeChanger: true,
            onShowSizeChange: this.handleChangePageSize,
          }}
          rowKey={record => record.id}
          loading={loading}
          columns={orderColumn()}
          dataSource={[]}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Order;
