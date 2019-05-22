import React from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

@connect(
  ({ explore, loading }) => ({
    explore,
    loading: loading.effects['explore/queryExploreListEffect'],
  }),
  {},
  mergeProps,
  { withRef: true }
)
class LabelModal extends React.Component {
  state = { visible: false };

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

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <Modal
        className={styles.labelModalCon}
        title="Basic Modal"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        123
      </Modal>
    );
  }
}

export default LabelModal;
