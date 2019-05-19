import React from 'react';
import { Button } from 'antd';
import Table from '@/components/MyTable';
import SearchList from '@/components/SearchListType';
import ModalForm from '@/components/ModalForm';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import columns from './columns';

const treeData = [
  {
    title: '线上',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'cmdc_test',
        value: '0-0-0',
        key: '0-0-0',
      },
      {
        title: 'cmdc',
        value: '0-0-1',
        key: '0-0-1',
      },
    ],
  },
  {
    title: '线下',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'heisha',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'normal1',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'kuai',
        value: '0-1-2',
        key: '0-1-2',
      },
      {
        title: 'Node6',
        value: '0-1-3',
        key: '0-1-3',
      },
      {
        title: 'wj_by04',
        value: '0-1-4',
        key: '0-1-4',
      },
      {
        title: 'letv',
        value: '0-1-5',
        key: '0-1-5',
      },
    ],
  },
];

class Banner extends React.Component {
  getModalFormItem = () => {
    return [
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
        type: 'treeCheck',
        title: '渠道',
        id: 'uploadImg',
        dataOption: {
          option: treeData,
        },
      },
      {
        type: 'radio',
        title: '启用短链接',
        id: 'radio',
        options: {
          rules: [{ required: true, message: '必选项' }],
        },
        dataOption: {
          option: [{ key: 1, value: '是' }, { key: 2, value: '否' }],
        },
      },
      {
        type: 'rangePicker',
        title: '选择时间',
        id: 'rangeTime',
        options: {
          rules: [{ required: true, message: '必选项' }],
        },
      },
      {
        type: 'input',
        title: 'URL',
        id: 'url',
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
      <PageHeaderWrapper>
        <SearchList type="common4" submitAction={submitSearch} />
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

export default Banner;
