import React, { Fragment } from 'react';
import { Button } from 'antd';
import Table from '@/components/MyTable';
import SearchList from '@/components/SearchListType';
import ModalForm from '@/components/ModalForm';
import { gradeTwoColumn } from './columns';

class GradeTwo extends React.Component {
  getModalFormItem = () => {
    return [
      {
        type: 'select',
        title: '一级标签',
        id: 'gradeone',
        placeholder: '请输入名称',
      },
      {
        type: 'input',
        title: '名称',
        id: 'name',
        placeholder: '请输入名称',
        options: {
          rules: [{ required: true, message: '请输入名称' }],
        },
      },
      {
        type: 'upload',
        title: '图片',
        id: 'uploadImg',
        options: {
          rules: [{ required: true, message: '必选项' }],
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
        type: 'input',
        title: 'URL',
        id: 'showUrl',
        placeholder: '请输入url',
        options: {
          rules: [{ required: true, message: '请输入url' }],
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
      <Fragment>
        <SearchList type="common4" submitAction={submitSearch} />
        <Button onClick={showModal('add', '添加')} type="primary">
          添加
        </Button>
        <Table
          pagination={null}
          rowKey={record => record.id}
          loading={false}
          columns={gradeTwoColumn(showModal('edit', '编辑'), deleteAction)}
          {...rest}
        />
        <ModalForm
          wrappedComponentRef={form => (this.modalForm = form)}
          ref={ref => (this.modalFormWithForm = ref)}
          formItem={this.getModalFormItem()}
          loading={false}
          submitAction={this.submitAction}
        />
      </Fragment>
    );
  }
}

export default GradeTwo;
