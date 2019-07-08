import React, { Fragment } from 'react';
import { Modal, Input, Tag, Checkbox, Col, Row } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import styles from './index.less';
import { mergeProps, clearRepeatArr } from '@/utils/utils';
import { timeoutSearch } from '@/config/config';

@connect(
  ({ label, loading }) => ({
    label,
    loading: loading.effects['label/queryLabelEffect'],
  }),
  dispatch => ({ dispatch }),
  mergeProps,
  { withRef: true }
)
class ModalLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, searchKey: '', currentType: null };
  }

  componentWillUnmount() {
    this.searchTimer && clearTimeout(this.searchTimer);
  }

  showModal = async data => {
    const { label } = this.props;
    const { selectedLabel } = label;
    await this.setState({
      visible: true,
      currentType: data.type,
      checkedLabel: selectedLabel,
    });
    this.queryLabelDispatch();
    console.log('%cselectedLabel:', 'color: #0e93e0;background: #aaefe5;', selectedLabel);
    selectedLabel.map(item => {
      this.setState({
        [`${item.label}_checked`]: true,
      });
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
      searchKey: '',
      checkedLabel: [],
    });
    const { label } = this.props;
    const { labelData } = label;
    labelData.map(labelItem => {
      this.setState({
        [`${labelItem.data.label}_checked`]: false,
      });
      labelItem.child.map(childLabelItem => {
        this.setState({
          [`${childLabelItem.label}_checked`]: false,
        });
      });
    });
  };

  toogleCheckbox = (item, e) => {
    const isChecked = e.target.checked;
    const { checkedLabel } = this.state;
    const index = checkedLabel.findIndex(items => items.id === item.id);
    if (isChecked) {
      this.setState({
        checkedLabel: [...checkedLabel, item],
        [`${item.label}_checked`]: true,
      });
    } else {
      const arr = clearRepeatArr(checkedLabel, [checkedLabel[index]]);
      this.setState({
        checkedLabel: arr,
        [`${item.label}_checked`]: false,
      });
    }
  };

  handleDeleteLabel = item => {
    const { label } = this.props;
    const { checkedLabel } = this.state;
    const { labelData } = label;
    labelData.map(labelItem => {
      if (labelItem.data.id === item.id) {
        const arr = clearRepeatArr(checkedLabel, [item]);
        this.setState({
          checkedLabel: arr,
          [`${item.label}_checked`]: false,
        });
      }
      labelItem.child.map(childLabelItem => {
        if (childLabelItem.id === item.id) {
          const arr = clearRepeatArr(checkedLabel, [item]);
          this.setState({
            checkedLabel: arr,
            [`${item.label}_checked`]: false,
          });
        }
      });
    });
  };

  handleChangeKey = e => {
    this.setState({
      searchKey: e.target.value,
    });
    const { value } = e.target;
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.queryLabelDispatch(value);
    }, timeoutSearch);
  };

  queryLabelDispatch = searchKey => {
    const { dispatch } = this.props;
    const { currentType } = this.state;
    dispatch({
      type: 'label/queryLabelEffect',
      payload: {
        oper: 'search',
        type: currentType,
        search_string: searchKey,
      },
    });
  };

  render() {
    const { visible, searchKey, checkedLabel } = this.state;
    const { label, confirmAction } = this.props;
    const { labelData } = label;
    return (
      <Modal
        className={classnames(styles.labelModalCon, 'labelModalCon')}
        title="选择标签"
        visible={visible}
        onOk={() => confirmAction(checkedLabel)}
        onCancel={this.hideModal}
        destroyOnClose
      >
        <Input value={searchKey} onChange={this.handleChangeKey} placeholder="请输入关键字" />

        <div style={{ marginTop: '15px', height: '24px' }}>
          已选择标签：
          <span>
            {checkedLabel &&
              checkedLabel.map(item => {
                return (
                  <Tag
                    onClose={() => this.handleDeleteLabel(item)}
                    key={item.id}
                    closable
                    color="magenta"
                  >
                    {item.label}
                  </Tag>
                );
              })}
          </span>
        </div>
        {labelData.map(item => {
          return (
            <Fragment key={item.data.id}>
              <Row>
                <Col style={{ marginTop: '20px' }} span={24}>
                  <Checkbox
                    onChange={e => this.toogleCheckbox(item.data, e)}
                    style={{ fontWeight: 'bold' }}
                    checked={this.state[`${item.data.label}_checked`]}
                  >
                    {item.data.label}
                  </Checkbox>
                </Col>
                {item.child.map(childItem => {
                  return (
                    <Col style={{ marginTop: '5px' }} key={childItem.id} span={4}>
                      <Checkbox
                        checked={this.state[`${childItem.label}_checked`]}
                        onChange={e => this.toogleCheckbox(childItem, e)}
                      >
                        {childItem.label}
                      </Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </Fragment>
          );
        })}
      </Modal>
    );
  }
}

export default ModalLabel;
