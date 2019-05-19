import React from 'react';
import { Button, Modal } from 'antd';
import { connect } from 'dva';
import Table from '@/components/MyTable';
import SearchList from '@/components/SearchListType';
import ModalForm from '@/components/ModalForm';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import columns from './columns';

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
class Configuration extends React.Component {
  getModalFormItem = () => {
    return [
      {
        type: 'radio',
        title: '是否启用缓存',
        id: 'radio',
        options: {
          rules: [{ required: true, message: '必选项' }],
        },
        dataOption: {
          option: [{ key: 1, value: '是' }, { key: 2, value: '否' }],
        },
      },
      {
        type: 'input',
        title: '配置项key',
        id: 'key',
        placeholder: '请输入配置项',
        options: {
          rules: [{ required: true, message: '请输入配置项' }],
        },
      },
      {
        type: 'select',
        title: '配置项value类型',
        id: 'type',
      },
      {
        type: 'input',
        title: '配置项value',
        id: 'value',
        placeholder: '请输入配置项value',
        options: {
          rules: [{ required: true, message: '请输入配置项value' }],
        },
      },
      {
        type: 'textArea',
        title: '描述',
        id: 'textArea',
        placeholder: '请输入描述',
        options: {
          rules: [{ required: true, message: '请输入描述' }],
        },
      },
    ];
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
    this.modalForm.showModal(type, modalTitle);
  };

  render() {
    return (
      <PageHeaderWrapper>
        <SearchList type="config" submitAction={this.submitSearch} />
        <Button onClick={this.showModal('add', '添加')} type="primary">
          添加
        </Button>
        <Table
          pagination={null}
          rowKey={record => record.id}
          loading={false}
          columns={columns(this.showModal('edit', '编辑'), this.deleteAction)}
          dataSource={testData}
        />
        <ModalForm
          wrappedComponentRef={form => (this.modalForm = form)}
          ref={ref => (this.modalFormWithForm = ref)}
          formItem={this.getModalFormItem()}
          loading={false}
          submitAction={this.submitAction}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Configuration;