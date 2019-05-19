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
class SwitchAndroid extends React.Component {
  getModalFormItem = () => {
    return [
      {
        type: 'input',
        title: '名称',
        id: 'name',
      },
      {
        type: 'checkBox',
        title: '接口数据版本',
        id: 'apiVersion',
        options: {
          rules: [{ required: true, message: '至少选择一个选项' }],
        },
        dataOption: {
          option: [
            { key: 1, value: '4.0.0' },
            { key: 2, value: '5.0.0' },
            { key: 3, value: '5.1.0' },
          ],
        },
      },
      {
        type: 'checkBox',
        title: '渠道',
        id: 'channel',
        options: {
          rules: [{ required: true, message: '至少选择一个选项' }],
        },
        dataOption: {
          option: [
            { key: 1, value: 'jsbrowser' },
            { key: 2, value: 'gsbrowser' },
            { key: 3, value: 'lybrowser' },
            { key: 4, value: 'lybrowser2' },
            { key: 5, value: 'lybrowser3' },
            { key: 6, value: 'lybrowser4' },
          ],
        },
      },
      {
        type: 'radio',
        title: '开关',
        id: 'radio',
        options: {
          rules: [{ required: true, message: '必选项' }],
        },
        dataOption: {
          option: [{ key: 1, value: '开' }, { key: 2, value: '关' }],
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
        <SearchList type="switchAndroid" submitAction={this.submitSearch} />
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

export default SwitchAndroid;
