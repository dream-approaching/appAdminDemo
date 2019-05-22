import React, { Fragment } from 'react';
import Table from '@/components/MyTable';
// import { Form } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { exploreType, publishStatus } from '@/constants/constants';
import MyButton from '@/components/Button';
import EditorPageForm from '@/components/EditorPage';
import columns from './columns';
import styles from './index.less';

@connect(({ explore, loading }) => ({
  explore,
  loading: loading.effects['explore/queryExploreListEffect'],
}))
class Explore extends React.Component {
  state = {
    currentPage: 1,
    editStatus: true,
  };

  componentDidMount() {
    this.queryExploreListDispatch();
  }

  queryExploreListDispatch = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'explore/queryExploreListEffect',
      payload: {
        pageType: exploreType.explore.key,
        page: 1,
        rows: 15,
        status: publishStatus.failed.key,
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

  handleAddArticle = () => {
    this.setState({
      editStatus: true,
    });
  };

  handleCancelAddArticle = () => {
    this.setState({
      editStatus: false,
    });
  };

  addSuccessFn = () => {
    this.handleCancelAddArticle();
    this.queryExploreListDispatch();
  };

  renderTableView = () => {
    const { currentPage } = this.state;
    const { explore, loading } = this.props;
    return (
      <Fragment>
        <Table
          pagination={{
            current: currentPage,
            total: +explore.exploreListTotal,
            onChange: this.handleChangePage,
            showSizeChanger: true,
            onShowSizeChange: this.handleChangePageSize,
          }}
          rowKey={record => record.id}
          loading={loading}
          columns={columns()}
          dataSource={explore.exploreList}
        />
        <div className={styles.footerCon}>
          <MyButton onClick={this.handleAddArticle}>添加文章</MyButton>
        </div>
      </Fragment>
    );
  };

  render() {
    const { editStatus } = this.state;
    // if (editStatus) return this.renderEditStatus()
    return (
      <PageHeaderWrapper>
        {(editStatus && (
          <EditorPageForm
            addSuccessFn={this.addSuccessFn}
            cancelAddAction={this.handleCancelAddArticle}
          />
        )) ||
          this.renderTableView()}
      </PageHeaderWrapper>
    );
  }
}

export default Explore;
