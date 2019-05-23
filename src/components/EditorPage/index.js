// /* eslint-disable */
import React from 'react';
import { Input, Button } from 'antd';
import BraftEditor from 'braft-editor';
import MyButton from '@/components/Button';
import 'braft-editor/dist/index.css';
import MyUpload from '@/components/MyUpload';
import { connect } from 'dva';
import { ContentUtils } from 'braft-utils';
import Immutable from 'immutable';
import BarBlockComponent from '@/components/EditorPage/BarBlockComponent';
import { unitImportFn, unitExportFn, blockExportFn, blockImportFn } from './convert';
import { preview } from './preview';
import styles from './index.less';
// import { myMessage } from '../MyMessage';
import EditorFooter from './FooterActionBar';

const FooBlockElement = props => {
  return <div className="foo-block-element">{props.children}</div>;
};

// 定义block-foo的容器组件，用于包裹单个独立或多个连续的block-foo，这一项是可选的
const FooBlockWrapper = props => {
  return <div className="foo-block-wrapper">{props.children}</div>;
};

const blockRenderMap = Immutable.Map({
  'block-foo': {
    element: FooBlockElement,
    wrapper: <FooBlockWrapper />,
  },
});

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
    title: '测试编辑器',
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

  handleChangeUpload = imgType => ({ file, fileList }) => {
    console.log('%cfile:', 'color: #0e93e0;background: #aaefe5;', file);
    const { editorState } = this.state;
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

  handlePreview = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }

    window.previewWindow = window.open();
    window.previewWindow.document.write(preview(this.state.editorState.toHTML()));
    window.previewWindow.document.close();
  };

  handleSubmit = () => {
    // const { dispatch, addSuccessFn } = this.props;
    // const { coverList, topImgList, title, editorState } = this.state;
    // if (!title.length) return myMessage.warning('请输入文章标题');
    // dispatch({
    //   type: 'article/addArticleEffect',
    //   payload: {
    //     oper: 'add',
    //     // id: '',
    //     type: 2,
    //     img: 'http://192.168.0.200:1230/uploads_cms_images/1558581044104_34502.png',
    //     // img: coverList[0].response.data.imgurl,
    //     title,
    //     // content: '<span>123</span>',
    //     content:
    //       '<img src="http://192.168.0.200:1230/uploads_cms_images/1558581044104_34502.png" />',
    //     // content: editorState.toHTML(),
    //     topimg: 'http://192.168.0.200:1230/uploads_cms_images/1558581044104_34502.png',
    //     // topimg: topImgList[0].response.data.imgurl,
    //     label: '工具',
    //     status: 1,
    //   },
    //   successFn: addSuccessFn,
    // });
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
      name: '网易云音乐2',
      desc: 'Hello',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/UTjFYEzMSYVwzxIGVhMu.png',
    };
    this.setState({
      editorState: ContentUtils.insertHTML(
        editorState,
        `<p></p>
        <div class="my-block-foo" data-a="World!">Hello Foo</div>
          <div class="my-block-bar"  data-name="${apiData.name}" data-desc="${
          apiData.desc
        }" data-logo="${apiData.logo}"></div>
          <p></p>`
      ),
    });
    this.braftFinder = this.editorInstance.getFinderInstance();
    this.braftFinder.addItems([
      {
        id: new Date().getTime(),
        type: 'IMAGE',
        url: 'https://margox.cn/wp-content/uploads/2018/09/IMG_9508.jpg',
      },
    ]);
  };

  render() {
    const { editorState, title } = this.state;
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
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <Button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
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
              blockRenderMap={blockRenderMap}
              onChange={this.handleEditorChange}
              onSave={this.handleSubmitContent}
              extendControls={extendControls}
              ref={instance => (this.editorInstance = instance)}
            />
            <EditorFooter
              wrappedComponentRef={ref => (this.footerRef = ref)}
              handleChangeUpload={this.handleChangeUpload}
            />
          </div>
          <div className={styles.editBodyRight} />
        </div>
      </div>
    );
  }
}

export default EditorPage;
