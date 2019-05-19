import React from 'react';
import { Button } from 'antd';
import Table from '@/components/MyTable';
import SearchList from '@/components/SearchListType';
import ModalForm from '@/components/ModalForm';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import columns from './columns';

class LandscapeSite extends React.Component {
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
        type: 'colorPicker',
        title: '标题颜色',
        id: 'titleColor',
        placeholder: '请输入或选择标题颜色',
        options: {
          rules: [
            { required: true, message: '请输入或选择标题颜色' },
            { pattern: /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/, message: '请检查颜色值是否正确' },
          ],
        },
        methods: {
          onChange: e => {
            return this.modalForm.handleSetColorBlock(e.target.value);
          },
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
        type: 'radio',
        title: '图片颜色',
        id: 'color',
        options: {
          rules: [{ required: true, message: '必选项' }],
        },
        dataOption: {
          option: [{ key: 1, value: '浅色系' }, { key: 2, value: '深色系' }],
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
        type: 'radio',
        title: '发布状态',
        id: 'status',
        options: {
          rules: [{ required: true, message: '必选项' }],
        },
        dataOption: {
          option: [{ key: 1, value: '下线' }, { key: 2, value: '上线' }],
        },
      },
      {
        type: 'input',
        title: 'URL',
        id: 'realUrl',
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

export default LandscapeSite;
