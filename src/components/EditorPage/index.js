import React from 'react';
import { Input, Icon, Form, Radio, Tag, Button } from 'antd';
import BraftEditor from 'braft-editor';
import MyButton from '@/components/Button';
import 'braft-editor/dist/index.css';
import MyUpload from '@/components/MyUpload';
import { connect } from 'dva';
import { ContentUtils } from 'braft-utils';
import { preview } from './preview';
import styles from './index.less';
import { myMessage } from '../MyMessage';
import { debounce2 } from '@/utils/utils';

const RadioGroup = Radio.Group;
const { TextArea } = Input;

const sizeBase = 23.4375;
const unitImportFn = (unit, type, source) => {
  // type为单位类型，例如font-size等
  // source为输入来源，可能值为create或paste
  console.log(type, source);

  // 此函数的返回结果，需要过滤掉单位，只返回数值
  if (unit.indexOf('rem')) {
    return parseFloat(unit, 10) * sizeBase;
  }
  return parseFloat(unit, 10);
};

// 定义输出转换函数
const unitExportFn = (unit, type, target) => {
  if (type === 'line-height') return unit;
  // target的值可能是html或者editor，对应输出到html和在编辑器中显示这两个场景
  if (target === 'html') {
    return `${unit / sizeBase}rem`;
  }
  return `${unit}px`;
};

const blockExportFn = (contentState, block) => {
  const previousBlock = contentState.getBlockBefore(block.key);

  if (block.type === 'unstyled' && previousBlock && previousBlock.getType() === 'atomic') {
    return {
      start: '',
      end: '',
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
    coverList: [],
    topImgList: [],
    // editorImgList: [],
    editorState: BraftEditor.createEditorState(
      '<h3>01 标题1</h3><p style="text-indent:2em;">这个app很好用，是我最新换的一个之一</p><div class="media-wrap image-wrap align-center" style="text-align:center"><img src="data:image/png;base64,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"/></div><div class="media-wrap image-wrap align-center" style="text-align:center"><img src="data:image/png;base64,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"/></div>'
    ),
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

  handleChangePageSize = (current, pageSize) => {
    console.log(current, pageSize);
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

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form, addSuccessFn } = this.props;
    const { title, editorState } = this.state;
    // const { coverList, topImgList, title, editorState } = this.state;
    if (!title.length) return myMessage.warning('请输入文章标题');
    // form.validateFields(['articleType', 'desc', 'coverImg', 'topImg'], (err, values) => {
    form.validateFields(['articleType', 'desc'], (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
          type: 'article/addArticleEffect',
          payload: {
            oper: 'add',
            // id: '',
            type: 2,
            img: 'http://192.168.0.200:1230/uploads_cms_images/1558508759313_33879.png',
            // img: coverList[0].response.data.imgurl,
            title,
            // content: '<span>123</span>',
            content: editorState.toHTML(),
            topimg: 'http://192.168.0.200:1230/uploads_cms_images/1558508799841_662.png',
            // topimg: topImgList[0].response.data.imgurl,
            label: '工具',
            status: 1,
          },
          successFn: addSuccessFn,
        });
      }
    });
  };

  handleSaveTemplate = () => {
    console.log(123);
  };

  render() {
    const { editorState, coverList, topImgList, title } = this.state;
    const { form, cancelAddAction } = this.props;
    const { getFieldDecorator } = form;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const extendControls = [
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
              <Icon type="picture" theme="filled" />
            </Button>
          </MyUpload>
        ),
      },
    ];
    const option = [
      { key: 1, value: '专题文章' },
      { key: 2, value: '应用推荐' },
      { key: 3, value: '互动话题' },
    ];
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
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
            <MyButton onClick={debounce2(this.handleSaveTemplate, 1000)}>存为模板</MyButton>
            <MyButton onClick={this.handlePreview}>预览</MyButton>
            <MyButton onClick={this.handleSubmit}>保存</MyButton>
          </div>
        </div>
        <div className={styles.editBody}>
          <div className={styles.editBodyLeft}>
            <BraftEditor
              converts={{ unitImportFn, unitExportFn, blockExportFn }}
              value={editorState}
              onChange={this.handleEditorChange}
              onSave={this.handleSubmitContent}
              extendControls={extendControls}
            />
            <div className={styles.footerCon}>
              <Form labelAlign="left" layout="horizontal" {...formItemLayout}>
                <Form.Item label="文章类型" key="文章类型">
                  {getFieldDecorator('articleType', {
                    rules: [
                      {
                        required: true,
                        message: '请选择文章类型',
                      },
                    ],
                    initialValue: '应用推荐',
                  })(
                    <RadioGroup>
                      {option.map(optionItem => {
                        return (
                          <Radio key={optionItem.key} value={optionItem.value}>
                            {optionItem.value}
                          </Radio>
                        );
                      })}
                    </RadioGroup>
                  )}
                </Form.Item>
                <Form.Item label="标签" key="标签">
                  {getFieldDecorator('label', {
                    rules: [{ required: true }],
                  })(
                    <div>
                      <Tag color="magenta">工具</Tag>
                      <Tag color="magenta">社交</Tag>
                      <Tag color="magenta">阅读</Tag>
                    </div>
                  )}
                </Form.Item>
                <Form.Item label="摘要" key="摘要">
                  {getFieldDecorator('desc', {
                    rules: [
                      {
                        required: true,
                        message: '请输入摘要',
                      },
                    ],
                    initialValue: '摘要',
                  })(<TextArea rows={4} />)}
                </Form.Item>
                <Form.Item label="首页封面图" key="首页封面图">
                  {getFieldDecorator('coverImg', {
                    rules: [
                      {
                        required: true,
                        message: '请上传文章封面图',
                      },
                    ],
                  })(
                    <MyUpload
                      listType="picture-card"
                      fileList={coverList}
                      onChange={this.handleChangeUpload('cover')}
                    >
                      {coverList.length >= 1 ? null : uploadButton}
                    </MyUpload>
                  )}
                </Form.Item>
                <Form.Item label="文章顶部图" key="文章顶部图">
                  {getFieldDecorator('topImg', {
                    rules: [
                      {
                        required: true,
                        message: '请上传文章顶部图',
                      },
                    ],
                  })(
                    <MyUpload
                      listType="picture-card"
                      fileList={topImgList}
                      onChange={this.handleChangeUpload('topImg')}
                    >
                      {topImgList.length >= 1 ? null : uploadButton}
                    </MyUpload>
                  )}
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className={styles.editBodyRight} />
        </div>
      </div>
    );
  }
}

const EditorPageForm = Form.create()(EditorPage);
export default EditorPageForm;
