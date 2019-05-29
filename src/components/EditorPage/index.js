// /* eslint-disable */
import React from 'react';
import { Input, Button } from 'antd';
import BraftEditor from 'braft-editor';
import MyButton from '@/components/Button';
import 'braft-editor/dist/index.css';
import MyUpload from '@/components/MyUpload';
import { connect } from 'dva';
import { ContentUtils } from 'braft-utils';
import BarBlockComponent from '@/components/EditorPage/BarBlockComponent';
import { Base64 } from 'js-base64';
import { unitImportFn, unitExportFn, blockExportFn, blockImportFn } from './convert';
import { preview } from './preview';
import styles from './index.less';
import { myMessage } from '../MyMessage';
import EditorFooter from './FooterActionBar';

const blockRendererFn = (block, { editor, editorState }) => {
  if (block.getType() === 'block-bar') {
    return {
      component: BarBlockComponent,
      editable: false,
      props: { editor, editorState }, // 此处传入的内容可以在组件中通过this.props.blockProps获取到
    };
  }
};
@connect(({ explore, loading }) => ({
  explore,
  loading: loading.effects['explore/queryExploreListEffect'],
}))
class EditorPage extends React.Component {
  state = {
    title: '测试编辑器01',
    coverList: [],
    topImgList: [],
    // editorImgList: [],
    editorState: BraftEditor.createEditorState('<h3>123</h3>', { blockImportFn, blockExportFn }),
  };

  handleChageTitle = e => {
    this.setState({
      title: e.target.value,
    });
  };

  handleSubmitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML();
    console.log('%chtmlContent:', 'color: #0e93e0;background: #aaefe5;', htmlContent);
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  handlePreview = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }

    window.previewWindow = window.open();
    window.previewWindow.document.write(preview(this.state.editorState.toHTML()));
    window.previewWindow.document.close();
  };

  handleSubmit = () => {
    const { dispatch, addSuccessFn } = this.props;
    const { coverList, topImgList, title, editorState } = this.state;
    if (!title.length) return myMessage.warning('请输入文章标题');
    dispatch({
      type: 'article/addArticleEffect',
      payload: {
        oper: 'add',
        // id: '',
        type: 2,
        img: coverList[0].response.data.imgurl,
        title,
        content: Base64.encode(editorState.toHTML()),
        topimg: topImgList[0].response.data.imgurl,
        label: '工具',
        status: 1,
      },
      successFn: addSuccessFn,
    });
    console.log('Base64.encode(editorState.toHTML())', Base64.encode(editorState.toHTML()));
  };

  handleSaveTemplate = () => {
    console.log(123);
  };

  handleShowLabelModal = () => {
    this.labelModalRef.wrappedInstance.showModal();
  };

  handleChooseApp = () => {
    const { editorState } = this.state;
    const apiData = {
      name: '讯飞语记',
      desc: '只需动动嘴就能记录生活的点点滴滴',
      logo:
        'https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=199629057,1253565291&fm=85&s=A7D18B7CC88377645AB29F930300408D',
    };
    this.setState({
      editorState: ContentUtils.insertHTML(
        editorState,
        `<p></p>
          <div class="app-block-bar"  data-name="${apiData.name}" data-desc="${
          apiData.desc
        }" data-logo="${apiData.logo}"></div>
          <p></p>`
      ),
    });
  };

  handleChooseApp2 = () => {
    const { editorState } = this.state;
    const apiData = {
      name: '有道云笔记',
      desc: '有道云笔记笔记本笔记本',
      logo:
        'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3461543860,1107367637&fm=173&app=49&f=JPEG?w=218&h=146&s=86355F864942A49455CCC02203000003',
    };
    this.setState({
      editorState: ContentUtils.insertHTML(
        editorState,
        `<p></p>
          <div class="app-block-bar"  data-name="${apiData.name}" data-desc="${
          apiData.desc
        }" data-logo="${apiData.logo}"></div>
          <p></p>`
      ),
    });
  };

  handleChangeUpload = imgType => ({ file, fileList }) => {
    const { editorState } = this.state;
    console.log('%cfile:', 'color: #0e93e0;background: #aaefe5;', file);
    this.setState({ [`${imgType}List`]: fileList });

    if (imgType === 'editorImg' && file.status === 'done') {
      this.setState({
        editorState: ContentUtils.insertMedias(editorState, [
          {
            type: 'IMAGE',
            url: file.response.data.imgurl,
          },
        ]),
      });
    }
  };

  render() {
    const { editorState, title, coverList, topImgList } = this.state;
    const { cancelAddAction } = this.props;

    const extendControls = [
      {
        key: 'addApp',
        type: 'component',
        component: (
          <Button type="button" onClick={this.handleChooseApp} className="control-item button">
            选择App
          </Button>
        ),
      },
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <MyUpload onChange={this.handleChangeUpload('editorImg')} showUploadList={false}>
            <Button className="control-item button upload-button" data-title="插入图片">
              插入图片
            </Button>
          </MyUpload>
        ),
      },
    ];
    return (
      <div className={styles.editorCon}>
        <div className={styles.editorHeader}>
          <Input
            onChange={this.handleChageTitle}
            value={title}
            placeholder="请输入标题"
            className={styles.headerInput}
          />
          <div className={styles.rightBtnCon}>
            <MyButton onClick={cancelAddAction}>取消</MyButton>
            <MyButton onClick={this.handleSaveTemplate}>存为模板</MyButton>
            <MyButton onClick={this.handlePreview}>预览</MyButton>
            <MyButton
              onClick={() => {
                this.footerRef.handleSubmit(this.handleSubmit);
              }}
            >
              保存
            </MyButton>
          </div>
        </div>
        <div className={styles.editBody}>
          <div className={styles.editBodyLeft}>
            <BraftEditor
              converts={{ unitImportFn, unitExportFn, blockExportFn, blockImportFn }}
              value={editorState}
              blockRendererFn={blockRendererFn}
              onChange={this.handleEditorChange}
              onSave={this.handleSubmitContent}
              extendControls={extendControls}
              ref={instance => (this.editorInstance = instance)}
            />
            <EditorFooter
              wrappedComponentRef={ref => (this.footerRef = ref)}
              handleChangeUpload={this.handleChangeUpload}
              coverList={coverList}
              topImgList={topImgList}
            />
          </div>
          <div className={styles.editBodyRight} />
        </div>
      </div>
    );
  }
}

export default EditorPage;
