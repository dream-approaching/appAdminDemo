import React from 'react';
import { Button } from 'antd';
import Table from '@/components/MyTable';
import SearchList from '@/components/SearchListType';
import ModalForm from '@/components/ModalForm';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import columns from './columns';

class HotUpdate extends React.Component {
  getModalFormItem = () => {
    return [
      {
        type: 'input',
        title: '包名',
        id: 'name',
        placeholder: '请输入包名',
        options: {
          rules: [{ required: true, message: '请输入包名' }],
        },
      },
      {
        type: 'input',
        title: '基准版本名称',
        id: 'version1',
        placeholder: '请输入基准版本名称',
        options: {
          rules: [{ required: true, message: '请输入基准版本名称' }],
        },
      },
      {
        type: 'input',
        title: '热更新版本号',
        id: 'version2',
        placeholder: '请输入热更新版本号',
        options: {
          rules: [{ required: true, message: '请输入热更新版本号' }],
        },
      },
      {
        type: 'radio',
        title: '升级版本',
        id: 'upgradeVersion',
        options: {
          rules: [{ required: true, message: '必选项' }],
        },
        dataOption: {
          option: [{ key: 1, value: '1.0.0' }, { key: 2, value: '2.1.0' }],
        },
      },
      {
        type: 'input',
        title: '升级版本号',
        id: 'upgradeVersion2',
        placeholder: '请输入升级版本号',
        options: {
          rules: [{ required: true, message: '请输入升级版本号' }],
        },
      },
      {
        type: 'datePicker',
        title: '上线日期',
        id: 'time',
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

  render() {
    const { submitSearch, showModal, deleteAction, ...rest } = this.props;
    return (
      <PageHeaderWrapper>
        <SearchList type="hotUpdate" submitAction={submitSearch} />
        <Button onClick={showModal('add', '添加')} type="primary">
          添加
        </Button>
        <Table
          pagination={null}
          rowKey={record => record.id}
          loading={false}
          columns={columns(showModal('edit', '编辑'), deleteAction)}
          {...rest}
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

export default HotUpdate;
