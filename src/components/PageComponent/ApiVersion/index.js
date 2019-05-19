import React from 'react';
import { Button } from 'antd';
import Table from '@/components/MyTable';
import SearchList from '@/components/SearchListType';
import ModalForm from '@/components/ModalForm';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import columns from './columns';

class ApiVersion extends React.Component {
  getModalFormItem = () => {
    return [
      {
        type: 'input',
        title: '接口数据版本',
        id: 'name',
        placeholder: '请输入名称',
        options: {
          rules: [{ required: true, message: '请输入名称' }],
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
        <SearchList type="onlyName" submitAction={submitSearch} />
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

export default ApiVersion;
