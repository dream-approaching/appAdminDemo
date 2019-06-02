import React from 'react';
import { Modal, Input } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { mergeProps } from '@/utils/utils';

@connect(
  ({ article, loading }) => ({
    article,
    loading: loading.effects['article/queryLabelEffect'],
  }),
  {},
  mergeProps,
  { withRef: true }
)
class ModalLabel extends React.Component {
  state = { visible: false, searchKey: '' };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      searchKey: '',
    });
  };

  handleChangeKey = e => {
    this.setState({
      searchKey: e.target.value,
    });
    this.queryLabelDispatch();
  };

  queryLabelDispatch = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'article/queryLabelEffect', payload: {} });
  };

  render() {
    const { visible, searchKey } = this.state;
    return (
      <Modal
        className={styles.labelModalCon}
        title="选择标签"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Input value={searchKey} onChange={this.handleChangeKey} placeholder="请输入关键字" />
      </Modal>
    );
  }
}

export default ModalLabel;
