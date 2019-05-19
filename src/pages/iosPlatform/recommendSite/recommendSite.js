import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import RecommendSite from '@/components/PageComponent/RecommendSite';

const testData = [
  {
    id: '1',
    mingcheng: '海报',
    tupian: 'tupian1',
    zhuangtai: '上线',
    jiekou: '2.0',
    qudao: 'APP store',
    kaishi: '2019-03-29 10:00:00',
    jieshu: '2019-03-29 10:00:00',
    url: 'https://www.test.com',
  },
  {
    id: '3',
    mingcheng: '天气',
    tupian: 'tupian3',
    zhuangtai: '上线',
    jiekou: '3.0',
    qudao: 'APP store',
    kaishi: '2019-03-29 10:00:00',
    jieshu: '2019-03-29 10:00:00',
    url: 'https://www.test.com',
  },
  {
    id: '2',
    mingcheng: '阿里图标',
    tupian: 'tupian2',
    zhuangtai: '下线',
    jiekou: '2.1',
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
class RecommendSiteIos extends React.Component {
  state = {
    // selectItem: {},
  };

  submitSearch = data => {
    console.log(data);
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
      <RecommendSite
        ref={ref => (this.pageComponent = ref)}
        submitSearch={this.submitSearch}
        deleteAction={this.deleteAction}
        showModal={this.showModal}
        dataSource={testData}
      />
    );
  }
}

export default RecommendSiteIos;
