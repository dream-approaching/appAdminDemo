import React from 'react';
import { Modal, Input, List, Skeleton, Avatar } from 'antd';
import { connect } from 'dva';
import { mergeProps } from '@/utils/utils';
import { timeoutSearch } from '@/config/config';

@connect(
  ({ app, loading }) => ({
    app,
    loading: loading.effects['app/queryModalAppSearchEffect'],
  }),
  dispatch => ({ dispatch }),
  mergeProps,
  { withRef: true }
)
class ModalAppSearch extends React.Component {
  state = {
    visible: false,
  };

  componentWillUnmount() {
    this.clearData();
    this.searchTimer && clearTimeout(this.searchTimer);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
      searchKey: '',
    });
    this.clearData();
  };

  clearData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/saveModalAppList',
      payload: [],
    });
  };

  handleChangeKey = e => {
    this.setState({
      searchKey: e.target.value,
    });

    const { value } = e.target;
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.queryAppDispatch(value);
    }, timeoutSearch);
  };

  queryAppDispatch = value => {
    const { dispatch } = this.props;
    if (!value.length) return false;
    dispatch({
      type: 'app/queryModalAppSearchEffect',
      payload: {
        data_type: '1', // 暂无意义
        page: 1,
        rows: 10,
        search_string: value,
      },
    });
  };

  render() {
    const { visible, searchKey } = this.state;
    const { loading, app, selectAppAction = () => {} } = this.props;
    return (
      <Modal
        destroyOnClose
        className="appSearchModal"
        title="查找应用"
        visible={visible}
        footer={null}
        onCancel={this.hideModal}
      >
        <Input value={searchKey} onChange={this.handleChangeKey} placeholder="请输入应用名" />
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          dataSource={app.modalAppList}
          renderItem={item => (
            <List.Item actions={[<a onClick={() => selectAppAction(item)}>添加</a>]}>
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.app_logo} />}
                  title={item.app_name_cn}
                  description={item.develop_classfy}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </Modal>
    );
  }
}

export default ModalAppSearch;
