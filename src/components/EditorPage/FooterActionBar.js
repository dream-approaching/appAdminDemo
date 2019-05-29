// /* eslint-disable */
import React from 'react';
import { Input, Form, Radio, Tag, Button, Col } from 'antd';
import 'braft-editor/dist/index.css';
import MyUpload from '@/components/MyUpload';
import LabelModal from '@/components/LabelModal';
import styles from './index.less';
import { uploadButton } from '../MyUpload/uploadBtn';

const RadioGroup = Radio.Group;
const { TextArea } = Input;

class FooterActionBar extends React.Component {
  handleShowLabelModal = () => {
    this.labelModalRef.wrappedInstance.showModal();
  };

  handleSubmit = fn => {
    const { form } = this.props;
    // const { coverList, topImgList, title, editorState } = this.state;
    // form.validateFields(['articleType', 'desc', 'coverImg', 'topImg'], (err, values) => {
    form.validateFields(['articleType', 'desc'], (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        fn();
      }
    });
  };

  render() {
    const { form, coverList, topImgList } = this.props;
    const { getFieldDecorator } = form;
    const option = [
      { key: 1, value: '专题文章' },
      { key: 2, value: '应用推荐' },
      { key: 3, value: '互动话题' },
    ];
    return (
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
          <Col xs={24} sm={24} md={24} lg={24} xl={8}>
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
          <Col xs={24} sm={24} md={24} lg={24} xl={16}>
            <Form.Item label="关联App标签" key="关联App标签">
              {getFieldDecorator('relation', {
                rules: [
                  {
                    required: true,
                    message: '必填',
                  },
                ],
              })(<Input placeholder="石墨文档" />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8}>
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
          <Col xs={24} sm={24} md={24} lg={12} xl={8}>
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
                  onChange={this.props.handleChangeUpload('cover')}
                >
                  {coverList.length >= 1 ? null : uploadButton()}
                </MyUpload>
              )}
            </Form.Item>
            <RadioGroup defaultValue="黑色底" className={styles.coverBtn}>
              <Radio value="黑色底">黑色底</Radio>
              <Radio value="白色底">白色底</Radio>
            </RadioGroup>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8}>
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
                  onChange={this.props.handleChangeUpload('topImg')}
                >
                  {topImgList.length >= 1 ? null : uploadButton()}
                </MyUpload>
              )}
            </Form.Item>
          </Col>
        </Form>
        <LabelModal ref={ref => (this.labelModalRef = ref)} />
      </div>
    );
  }
}

const EditorFooter = Form.create()(FooterActionBar);
export default EditorFooter;
