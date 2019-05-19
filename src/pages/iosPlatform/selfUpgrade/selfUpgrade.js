import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import SelfUpgrade from '@/components/PageComponent/SelfUpgrade';

const testData = [
  {
    id: '343',
    mingcheng: '百度',
    tupian: 'tupian1',
    zhuangtai: '上线',
    jiekou: '2.0',
    qudao: 'APP store',
    kaishi: '2019-03-29 10:00:00',
    jieshu: '2019-03-29 10:00:00',
    url: 'https://www.test.com',
  },
];

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class SelfUpgradeIos extends React.Component {
  state = {
    // selectItem: {},
  };

  submitSearch = data => {
    console.log(data);
  };

  editAction = item => {
    console.log('edit', item);
  };

  deleteAction = item => {
    Modal.confirm({
      title: `您确定要删除该条记录?`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('delete ok', item);
      },
      onCancel() {},
    });
  };

  showModal = (type, modalTitle) => async item => {
    console.log(item, type, modalTitle);
    const { modalForm } = this.pageComponent;
    modalForm.showModal(type, modalTitle);
  };

  render() {
    return (
      <SelfUpgrade
        ref={ref => (this.pageComponent = ref)}
        submitSearch={this.submitSearch}
        deleteAction={this.deleteAction}
        showModal={this.showModal}
        dataSource={testData}
        platform="IOS"
      />
    );
  }
}

export default SelfUpgradeIos;
