import React, { Fragment } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Row,
  Col,
  TreeSelect,
} from 'antd';
import classNames from 'classnames';
import { ChromePicker } from 'react-color';
import RenderItemContainer from '@/components/Defrag/RenderItemContainer';
import { throttle } from '@/utils/utils';
import MyUpload from './MyUpload';
import styles from './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const defaultColorPicker = '#1890FF';

class MyModal extends React.Component {
  static defaultProps = {
    formItem: [],
    formLayout: 'horizontal',
    labelAlign: 'right',
    loading: false,
    disabled: false,
    destroyOnClose: false,
    submitAction: () => {},
  };

  defaultState = {
    modalVisible: false,
    modalTitle: '',
    type: null,
    showColorPicker: false,
    colorBlock: defaultColorPicker,
  };

  state = this.defaultState;

  // 打开modal
  showModal = (type, modalTitle) => {
    this.setState({
      type,
      modalVisible: true,
      modalTitle,
    });
  };

  // 关闭modal
  hideModal = () => {
    this.setState(this.defaultState);
  };

  // 提交操作
  submitModal = e => {
    e.preventDefault();
    const { type } = this.state;
    const { form, submitAction } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err === null) {
        submitAction(values, type);
      }
    });
  };

  handleToggleColorPicker = event => {
    event.stopPropagation();
    const { showColorPicker } = this.state;
    this.setState({
      showColorPicker: !showColorPicker,
    });
  };

  handleChangeColor = id => (currentColor, event) => {
    event.stopPropagation();
    const { form } = this.props;
    let showColor;
    if (currentColor.rgb.a !== 1) {
      const { r, g, b, a } = currentColor.rgb;
      showColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    } else {
      showColor = currentColor.hex;
    }
    this.handleSetColorBlock(showColor);
    form.setFieldsValue({
      [id]: showColor,
    });
  };

  handleSetColorBlock = color => this.setState({ colorBlock: color });

  /**
   * @param {Object} item formItem模板参数
   * @param {Int} index 序号
   * @returns {String} formItem模板
   */
  renderModalItem = (item, index) => {
    const { getFieldDecorator } = this.props.form;
    const { dataOption = {} } = item;
    const { option = [], key, value, showValue } = dataOption;
    const layout = { labelCol: { span: 5 }, wrapperCol: { span: 19 } };
    switch (item.type) {
      case 'input':
      case 'textArea':
        return (
          <RenderItemContainer title={item.title} key={item.title} {...layout}>
            {getFieldDecorator(item.id || `id_${index}`, {
              ...item.options,
            })(
              item.type === 'input' ? (
                <Input placeholder={item.placeholder} {...item.props} {...item.methods} />
              ) : (
                <Input.TextArea
                  placeholder={item.placeholder}
                  rows={4}
                  {...item.props}
                  {...item.methods}
                />
              )
            )}
          </RenderItemContainer>
        );
      case 'select': {
        let initialValue = null;
        if (option.length > 0) {
          initialValue = option[0][value] || option[0].value;
        }
        return (
          <RenderItemContainer title={item.title} key={item.title} {...layout}>
            {getFieldDecorator(item.id || `id_${index}`, {
              initialValue,
              ...item.options,
            })(
              <Select {...item.methods} {...item.props}>
                {option.map(optionItem => (
                  <Option
                    value={optionItem[value] || optionItem.key}
                    key={optionItem[key] || optionItem.value}
                  >
                    {optionItem[showValue] || optionItem.value}
                  </Option>
                ))}
              </Select>
            )}
          </RenderItemContainer>
        );
      }
      case 'rangePicker':
        return (
          <RenderItemContainer title={item.title} key={item.title} {...layout}>
            {getFieldDecorator(item.id || `id_${index}`, {
              ...item.options,
            })(<RangePicker {...item.methods} />)}
          </RenderItemContainer>
        );
      case 'datePicker':
        return (
          <RenderItemContainer title={item.title} key={item.title} {...layout}>
            {getFieldDecorator(item.id || `id_${index}`, {
              ...item.options,
            })(<DatePicker {...item.methods} />)}
          </RenderItemContainer>
        );
      case 'colorPicker':
        const { showColorPicker, colorBlock } = this.state;
        const style = { background: colorBlock };
        return (
          <RenderItemContainer
            className="colorPicker"
            title={item.title}
            key={item.title}
            {...layout}
          >
            <Fragment>
              {getFieldDecorator(item.id || `id_${index}`, {
                ...item.options,
              })(
                <Input
                  addonAfter={
                    <div
                      onClick={this.handleToggleColorPicker}
                      style={{ ...style }}
                      className={styles.colorShowBlock}
                    />
                  }
                  maxLength={7}
                  placeholder={item.placeholder}
                  {...item.props}
                  {...item.methods}
                />
              )}
              {showColorPicker && (
                <ChromePicker
                  onChange={throttle(this.handleChangeColor(item.id), 500)}
                  className={styles.colorPickerBody}
                  color={colorBlock}
                />
              )}
            </Fragment>
          </RenderItemContainer>
        );
      case 'upload':
        return (
          <RenderItemContainer
            extra={item.extra || '图片要求jpg,png格式,不超过2M'}
            title={item.title}
            className="upload"
            key={item.title}
            {...layout}
          >
            {getFieldDecorator(item.id || `id_${index}`, {
              ...item.options,
            })(<MyUpload {...item.props} />)}
          </RenderItemContainer>
        );
      case 'radio':
        return (
          <RenderItemContainer
            title={item.title}
            className="radioCheck"
            key={item.title}
            {...layout}
          >
            {getFieldDecorator(item.id || `id_${index}`, {
              ...item.options,
            })(
              <RadioGroup style={{ width: '100%' }} {...item.props}>
                <Row>
                  {option.map(optionItem => {
                    return (
                      <Col
                        className="radioCheckCol"
                        key={optionItem[key] || optionItem.key}
                        span={6}
                      >
                        <Radio value={optionItem[value] || optionItem.value} {...optionItem.props}>
                          {optionItem[showValue] || optionItem.value}
                        </Radio>
                      </Col>
                    );
                  })}
                </Row>
              </RadioGroup>
            )}
          </RenderItemContainer>
        );
      case 'checkBox':
        return (
          <RenderItemContainer
            title={item.title}
            className="radioCheck"
            key={item.title}
            {...layout}
          >
            {getFieldDecorator(item.id || `id_${index}`, {
              ...item.options,
            })(
              <Checkbox.Group style={{ width: '100%' }} {...item.props}>
                <Row>
                  {option.map(optionItem => {
                    return (
                      <Col
                        className="radioCheckCol"
                        key={optionItem[key] || optionItem.key}
                        span={6}
                      >
                        <Checkbox value={optionItem[value] || optionItem.value}>
                          {optionItem[showValue] || optionItem.value}
                        </Checkbox>
                      </Col>
                    );
                  })}
                </Row>
              </Checkbox.Group>
            )}
          </RenderItemContainer>
        );
      case 'treeCheck':
        return (
          <RenderItemContainer title={item.title} key={item.title} {...layout}>
            {getFieldDecorator(item.id || `id_${index}`, {
              ...item.options,
            })(
              <TreeSelect
                treeData={option}
                searchPlaceholder={item.placeholder}
                treeCheckable
                showCheckedStrategy={TreeSelect.SHOW_PARENT}
                {...item.props}
                {...item.methods}
              />
            )}
          </RenderItemContainer>
        );
      case 'render':
        return item.render;
      default:
        return null;
    }
  };

  handleFormClick = e => {
    const pickerContainer = document.getElementsByClassName('chrome-picker')[0];
    if (pickerContainer && !pickerContainer.contains(e.target)) {
      this.setState({
        showColorPicker: false,
      });
    }
  };

  // modal的footer
  renderModalFooter = () => {
    const { loading, disabled } = this.props;
    return (
      <Fragment>
        <Button key="back" onClick={this.hideModal}>
          取消
        </Button>
        <Button
          key="ok"
          onClick={this.submitModal}
          loading={loading}
          type="primary"
          disabled={disabled}
        >
          确定
        </Button>
      </Fragment>
    );
  };

  render() {
    const { modalVisible, modalTitle } = this.state;
    const { formItem = [], formLayout, labelAlign, destroyOnClose } = this.props;
    return (
      <Modal
        visible={modalVisible}
        title={modalTitle}
        destroyOnClose={destroyOnClose}
        className={classNames(styles.exportModal, 'exportModal')}
        onCancel={this.hideModal}
        bodyStyle={{ padding: '15px 20px 0 5px' }}
        footer={this.renderModalFooter()}
      >
        <Form onClick={this.handleFormClick} labelAlign={labelAlign} layout={formLayout}>
          {formItem.map((item, index) => this.renderModalItem(item, index))}
        </Form>
      </Modal>
    );
  }
}

const ModalForm = Form.create()(MyModal);

export default ModalForm;
