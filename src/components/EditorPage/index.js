/* eslint-disable */
import React from 'react';
import { Input, Icon, Form, Radio, Tag, Button, Col } from 'antd';
import BraftEditor from 'braft-editor';
import MyButton from '@/components/Button';
import 'braft-editor/dist/index.css';
import MyUpload from '@/components/MyUpload';
import { connect } from 'dva';
import { ContentUtils } from 'braft-utils';
import LabelModal from '@/components/LabelModal';
import BarBlockComponent from '@/components/EditorPage/BarBlockComponent';
import { preview } from './preview';
import styles from './index.less';
import { myMessage } from '../MyMessage';

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

const blockImportFn = (nodeName, node) => {
  if (nodeName === 'div' && node.classList.contains('my-block-foo')) {
    const dataA = node.dataset.a;

    return {
      type: 'block-foo',
      data: {
        dataA,
      },
    };
  }

  if (nodeName === 'div' && node.classList.contains('my-block-bar')) {
    const text = node.querySelector('span').innerText;
    const dataB = node.dataset.b;

    return {
      type: 'block-bar',
      data: {
        text,
        dataB,
      },
    };
  }
};

// 自定义block输出转换器，用于将不同的block转换成不同的html内容，通常与blockImportFn中定义的输入转换规则相对应
const blockExportFn = (contentState, block) => {
  if (block.type === 'block-bar') {
    const { dataB } = block.data;

    return {
      start: `<div class="my-block-bar" data-b="${dataB}">`,
      end: '</div>',
    };
  }
  const previousBlock = contentState.getBlockBefore(block.key);

  if (block.type === 'unstyled' && previousBlock && previousBlock.getType() === 'atomic') {
    return {
      start: '',
      end: '',
    };
  }
};

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
    coverList: [],
    topImgList: [],
    // editorImgList: [],
    editorState: BraftEditor.createEditorState(
      '<h3></h3><div class="media-wrap image-wrap"><img src="http://192.168.0.200:1230/uploads_cms_images/1558611147559_23721.png"/></div>',
      { blockImportFn, blockExportFn }
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
            img: 'http://192.168.0.200:1230/uploads_cms_images/1558581044104_34502.png',
            // img: coverList[0].response.data.imgurl,
            title,
            // content: '<span>123</span>',
            content:
              '<img src="http://192.168.0.200:1230/uploads_cms_images/1558581044104_34502.png" />',
            // content: editorState.toHTML(),
            topimg: 'http://192.168.0.200:1230/uploads_cms_images/1558581044104_34502.png',
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

  handleShowLabelModal = () => {
    this.labelModalRef.wrappedInstance.showModal();
  };

  handleChooseApp = () => {
    const { editorState } = this.state;
    this.setState({
      editorState: ContentUtils.insertHTML(
        editorState,
        `<p></p>
<div class="my-block-bar" data-b="1234567"><span>ABCDEFG</span></div>
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
    const option = [
      { key: 1, value: '专题文章' },
      { key: 2, value: '应用推荐' },
      { key: 3, value: '互动话题' },
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
            <MyButton onClick={this.handleSubmit}>保存</MyButton>
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
            <div className={styles.footerCon}>
              <Form labelAlign="left" layout="inline">
                <Col span={24}>
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
                </Col>
                <Col span={24}>
                  <Form.Item label="标签" key="标签">
                    {getFieldDecorator('label', {
                      rules: [{ required: true }],
                    })(
                      <div>
                        <span>
                          <Tag closable color="magenta">
                            工具
                          </Tag>
                          <Tag closable color="magenta">
                            社交
                          </Tag>
                          <Tag closable color="magenta">
                            阅读
                          </Tag>
                        </span>
                        <Button onClick={this.handleShowLabelModal} size="small">
                          选择
                        </Button>
                      </div>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
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
                </Col>
                <Col span={8}>
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
                </Col>
                <Col span={8}>
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
                </Col>
              </Form>
            </div>
          </div>
          <div className={styles.editBodyRight} />
        </div>
        <LabelModal ref={ref => (this.labelModalRef = ref)} />
      </div>
    );
  }
}

const EditorPageForm = Form.create()(EditorPage);
export default EditorPageForm;
