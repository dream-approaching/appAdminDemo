import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import Banner from '@/components/PageComponent/Banner';

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
class BannerAndroid extends React.Component {
  state = {
    // selectItem: {},
    editorState: BraftEditor.createEditorState(null),
  };

  submitSearch = data => {
    console.log(data);
  };

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML();
    console.log('%chtmlContent:', 'color: #0e93e0;background: #aaefe5;', htmlContent);
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
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
    const { editorState } = this.state;
    return (
      <Fragment>
        <Banner
          ref={ref => (this.pageComponent = ref)}
          submitSearch={this.submitSearch}
          deleteAction={this.deleteAction}
          showModal={this.showModal}
          dataSource={testData}
        />
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.submitContent}
        />
      </Fragment>
    );
  }
}

export default BannerAndroid;
