import React, { Fragment } from 'react';
import Table from '@/components/MyTable';
// import { Form } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { exploreType, publishStatus } from '@/config/constants';
import MyButton from '@/components/Button';
import { goodsColumn } from './columns';
import EditGoods from './components/editGoods';

@connect(({ explore, loading }) => ({
  explore,
  loading: loading.effects['explore/queryExploreListEffect'],
}))
class Explore extends React.Component {
  state = {
    currentPage: 1,
    editStatus: false,
    editorType: 'add',
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

  handleShowEditor = () => {
    this.setState({
      editStatus: true,
    });
  };

  handleHideEditor = () => {
    this.setState({
      editStatus: false,
    });
  };

  handleEditGoods = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/queryArticleDetailEffect',
      payload: { id: item.id },
      successFn: async () => {
        await this.setState({ editorType: 'edit' });
        this.handleShowEditor();
      },
    });
  };

  handleAddGoods = () => {
    this.handleShowEditor();
    this.setState({
      editorType: 'add',
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

  renderTableView = () => {
    const { currentPage } = this.state;
    const { loading } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleAddGoods}>添加商品</MyButton>
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
          columns={goodsColumn(this.handleEditGoods)}
          dataSource={[]}
        />
      </Fragment>
    );
  };

  render() {
    const { editStatus, editorType } = this.state;
    return (
      <PageHeaderWrapper>
        {(editStatus && <EditGoods editorType={editorType} />) || this.renderTableView()}
      </PageHeaderWrapper>
    );
  }
}

export default Explore;
