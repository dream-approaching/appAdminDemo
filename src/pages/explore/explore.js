import React, { Fragment } from 'react';
import Table from '@/components/MyTable';
// import { Form } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { exploreType, publishStatus } from '@/config/constants';
import MyButton from '@/components/Button';
import EditorPageForm from '@/components/EditorPage/EditorPage';
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
    editorType: 'add',
  };

  componentDidMount() {
    // this.queryExploreListDispatch();
    this.queryLocationDispatch();
  }

  queryLocationDispatch = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'explore/queryCurrentLocation',
    });
  };

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

  handleEditArticle = item => {
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

  handleAddArticle = () => {
    this.handleShowEditor();
    this.setState({
      editorType: 'add',
    });
  };

  addSuccessFn = () => {
    this.handleHideEditor();
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
          columns={columns(this.handleEditArticle)}
          dataSource={explore.exploreList}
        />
        <div
          style={{ marginTop: !explore.exploreList.length ? '10px' : '-48px' }}
          className={styles.footerCon}
        >
          <MyButton onClick={this.handleAddArticle}>添加文章</MyButton>
        </div>
      </Fragment>
    );
  };

  render() {
    const { editStatus, editorType } = this.state;
    // if (editStatus) return this.renderEditStatus()
    return (
      <PageHeaderWrapper>
        {(editStatus && (
          <EditorPageForm
            editorType={editorType}
            addSuccessFn={this.addSuccessFn}
            cancelAddAction={this.handleHideEditor}
          />
        )) ||
          this.renderTableView()}
      </PageHeaderWrapper>
    );
  }
}

export default Explore;
