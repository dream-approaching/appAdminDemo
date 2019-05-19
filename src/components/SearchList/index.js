import React from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import RenderItemContainer from '@/components/Defrag/RenderItemContainer';
import styles from './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SearchList extends React.Component {
  static defaultProps = {
    formItem: [],
    formLayout: 'inline',
    submitAction: () => {},
    btnText: '查询',
  };

  /**
   * @param {Object} item formItem模板参数
   * @param {Int} index 序号
   * @returns {String} formItem模板
   */
  renderModalItem = (item, index) => {
    const { getFieldDecorator } = this.props.form;
    switch (item.type) {
      case 'input':
        return (
          <RenderItemContainer title={item.title} key={`${item.title}`}>
            {getFieldDecorator(item.id || `id_${index}`, {
              ...item.options,
            })(<Input placeholder={item.placeholder} disabled={item.disabled} {...item.methods} />)}
          </RenderItemContainer>
        );
      case 'select': {
        const { option = [], key, value, showValue } = item.dataOption;
        let initialValue = null;
        if (option.length > 0) {
          initialValue = option[0][value] || option[0].value;
        }
        return (
          <RenderItemContainer title={item.title} key={`${item.title}`}>
            {getFieldDecorator(item.id || `id_${index}`, {
              initialValue,
              ...item.options,
            })(
              <Select style={{ minWidth: '80px' }} {...item.methods} {...item.props}>
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
          <RenderItemContainer title={item.title} key={`${item.title}_${index}`}>
            {getFieldDecorator(item.id || `id_${index}`, {
              ...item.options,
            })(<RangePicker {...item.methods} />)}
          </RenderItemContainer>
        );
      case 'render':
        return item.render;
      default:
        return null;
    }
  };

  submitAction = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      // 校验通过
      if (err === null) {
        // 提交表单
        this.props.submitAction(values);
      }
    });
  };

  render() {
    const { form, formItem, formLayout, btnText } = this.props;
    const { getFieldsError } = form;
    return (
      <Form className={styles.container} onSubmit={this.submitAction} layout={formLayout}>
        {formItem.map((item, index) => this.renderModalItem(item, index))}
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            {btnText}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const SearchListForm = Form.create()(SearchList);

export default SearchListForm;
