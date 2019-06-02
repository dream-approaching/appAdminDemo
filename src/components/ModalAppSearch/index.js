import React from 'react';
import { Modal, Input, List, Skeleton, Avatar } from 'antd';
import { connect } from 'dva';
import { mergeProps } from '@/utils/utils';

@connect(
  ({ app, loading }) => ({
    app,
    loading: loading.effects['app/queryModalAppSearchEffect'],
  }),
  {},
  mergeProps,
  { withRef: true }
)
class ModalAppSearch extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleHideModal = () => {
    this.setState({
      visible: false,
      searchKey: '',
    });
  };

  handleChangeKey = e => {
    this.setState({
      searchKey: e.target.value,
    });
    this.queryAppDispatch();
  };

  queryAppDispatch = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'app/queryModalAppSearchEffect', payload: {} });
  };

  render() {
    const { visible, searchKey } = this.state;
    const { loading } = this.props;
    const list = [
      { name: 'app', title: 'title', desc: 'desc' },
      { name: 'app2', title: 'title', desc: 'desc' },
    ];
    return (
      <Modal
        destroyOnClose
        className="appSearchModal"
        title="查找应用"
        visible={visible}
        onCancel={this.handleHideModal}
      >
        <Input value={searchKey} onChange={this.handleChangeKey} placeholder="请输入应用名" />
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item actions={[<a>添加</a>]}>
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.desc}
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
