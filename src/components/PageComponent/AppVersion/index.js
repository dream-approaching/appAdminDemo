import React from 'react';
import { Button } from 'antd';
import Table from '@/components/MyTable';
import SearchList from '@/components/SearchListType';
import ModalForm from '@/components/ModalForm';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import columns from './columns';

class AppVersion extends React.Component {
  static defaultProps = {
    platform: 'Android',
  };

  getModalFormItem = () => {
    const { platform } = this.props;
    return [
      {
        type: 'input',
        title: `${platform}版本`,
        id: 'name',
      },
      {
        type: 'radio',
        title: '接口数据版本',
        id: 'radio',
        options: {
          rules: [{ required: true, message: '必选项' }],
        },
        dataOption: {
          option: [{ key: 1, value: '4.0.0' }, { key: 2, value: '5.0.0' }],
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
    const { submitSearch, showModal, deleteAction, platform, ...rest } = this.props;
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
          columns={columns(showModal('edit', '编辑'), deleteAction, platform)}
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

export default AppVersion;
