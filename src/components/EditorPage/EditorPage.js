// /* eslint-disable */
import React from 'react';
import { Button, Select } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import MyUpload from '@/components/MyUpload';
import { connect } from 'dva';
import { Base64 } from 'js-base64';
import classnames from 'classnames';
import shortid from 'shortid';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Example from './example';
import BarBlockComponent from '@/components/EditorPage/BarBlockComponent';
import { publishStatus } from '@/config/constants';
import { unitImportFn, unitExportFn, blockExportFn, blockImportFn } from './convert';
import styles from './index.less';
import { uploadButton } from '../MyUpload/uploadBtn';

const { Option } = Select;
const blockRendererFn = (block, { editor, editorState }) => {
  if (block.getType() === 'block-bar') {
    return {
      component: BarBlockComponent,
      editable: false,
      props: { editor, editorState }, // 此处传入的内容可以在组件中通过this.props.blockProps获取到
    };
  }
};
@connect(({ explore, label, loading, article }) => ({
  explore,
  label,
  article,
  loading: loading.effects['explore/queryExploreListEffect'],
}))
class EditorPage extends React.Component {
  constructor(props) {
    super(props);
    if (props.editorType === 'edit') {
      console.log(props.article.articleDetail);
      const { articleDetail } = props.article;
      this.state = {
        selectedApp: [],
        colorType: '',
        title: articleDetail.title,
        coverList: [],
        imgList: [],
        // editorImgList: [],
        editorState: BraftEditor.createEditorState('<h3>123</h3>', {
          blockImportFn,
          blockExportFn,
        }),
      };
    } else {
      this.state = {
        selectedApp: [],
        colorType: '1',
        title: '测试编辑器01',
        coverList: [],
        addressValue: '',
        imgList: [],
        // editorImgList: [],
        editorState: null,
        uploadedImg: [
          {
            id: '1',
            name: 1,
            url: 'http://192.168.0.200:1230/uploads_cms_images/1562576690067_64242.png',
          },
          {
            id: '2',
            name: 2,
            url: 'http://192.168.0.200:1230/uploads_cms_images/1562576880366_48239.png',
          },
          {
            id: '3',
            name: 3,
            url: 'http://192.168.0.200:1230/uploads_cms_images/1562576880366_48239.png',
          },
        ],
        sorting: false,
      };
    }
  }

  componentDidMount() {
    console.log('editor componentDidMount');
  }

  componentWillUnmount() {
    console.log('editor componentWillUnmount');
  }

  // 在编辑器获得焦点时按下ctrl+s会执行此方法
  handleSubmitContent = async () => {
    const htmlContent = this.state.editorState.toHTML();
    console.log('%chtmlContent:', 'color: #0e93e0;background: #aaefe5;', htmlContent);
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  handleSubmit = values => {
    const { dispatch, addSuccessFn, label, editorType } = this.props;
    const { coverList, imgList, title, editorState, selectedApp, colorType } = this.state;
    const data = {
      oper: editorType,
      type: values.articleType,
      img: coverList[0].response.data.imgurl,
      title,
      color_type: colorType,
      related_app: selectedApp.map(item => item.id).join(','),
      content: Base64.encode(editorState.toHTML()),
      topimg: imgList[0].response.data.imgurl,
      label: label.selectedLabel.map(item => item.label).join(','),
      status: publishStatus.pending.key,
    };
    console.log('%cdata:', 'color: #0e93e0;background: #aaefe5;', data);
    if (editorType === 'edit') {
      const { articleDetail } = this.props.article;
      data.id = articleDetail.id;
    }
    dispatch({
      type: 'article/addArticleEffect',
      payload: data,
      successFn: addSuccessFn,
    });
    console.log('Base64.encode(editorState.toHTML())', Base64.encode(editorState.toHTML()));
  };

  handleChangeUpload = imgType => ({ file, fileList }) => {
    const { uploadedImg } = this.state;
    this.setState({ [`${imgType}List`]: fileList });

    if (file.status === 'done') {
      console.log('%cfile:', 'color: #0e93e0;background: #aaefe5;', file);
      this.setState({
        uploadedImg: [
          ...uploadedImg,
          { id: shortid.generate(), url: file.response.data.imgurl, name: file.name },
        ],
      });
    }
  };

  /**
   * 提交表单
   * @param {Object} data 表单数据
   * @param {String} modalType modal的id
   */
  submitAction = (data, modalType) => {
    switch (modalType) {
      case 'template': {
        console.log('submitAction modalType is template');

        this.modalForm.hideModal();
        break;
      }
      default:
        return null;
    }
  };

  onSelect = value => {
    console.log('%cvalue:', 'color: #0e93e0;background: #aaefe5;', value);
  };

  handleSearchAddress = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'explore/queryDefaultAddressListEffect',
      payload: { keywords: value },
    });
  };

  handleChangeAddress = value => {
    this.setState({ addressValue: value });
  };

  handleStartSort = () => {
    this.setState({
      sorting: true,
    });
  };

  handleCompleteSort = () => {
    this.setState({
      sorting: false,
      uploadedImg: this.sortable.state.cards,
    });
  };

  render() {
    const { editorState, imgList, addressValue, uploadedImg, sorting } = this.state;
    console.log('%cuploadedImg:', 'color: #0e93e0;background: #aaefe5;', uploadedImg);
    const { cancelAddAction, explore } = this.props;
    const { currentAddress, defaultAddressList } = explore;
    const btnProps = { type: 'primary', className: 'control-item button' };
    const extendControls = [
      {
        key: 'cancel',
        type: 'component',
        component: (
          <Button {...btnProps} onClick={cancelAddAction} data-title="取消">
            取消
          </Button>
        ),
      },
      {
        key: 'save',
        type: 'component',
        component: (
          <Button {...btnProps} onClick={this.handleSubmit} data-title="保存">
            保存
          </Button>
        ),
      },
    ];
    return (
      <div className={classnames(styles.editorCon, 'editorPage')}>
        <div className={styles.editBody}>
          <div className={styles.editBodyLeft}>
            <BraftEditor
              converts={{ unitImportFn, unitExportFn, blockExportFn, blockImportFn }}
              value={editorState}
              blockRendererFn={blockRendererFn}
              onChange={this.handleEditorChange}
              onSave={this.handleSubmitContent}
              ref={instance => (this.editorInstance = instance)}
              excludeControls={['emoji', 'media']}
              extendControls={extendControls}
              className={styles.braftEditor}
            />
          </div>
          <div className={styles.editBodyRight}>
            <div className={styles.picBtn}>
              {(!sorting && (
                <MyUpload
                  listType="picture"
                  fileList={imgList}
                  showUploadList={false}
                  onChange={this.handleChangeUpload('img')}
                >
                  {imgList.length >= 9 ? null : uploadButton()}
                </MyUpload>
              )) || <span />}
              {(sorting && <Button onClick={this.handleCompleteSort}>完成排序</Button>) || (
                <Button style={{ marginLeft: 5 }} onClick={this.handleStartSort}>
                  排序
                </Button>
              )}
            </div>

            {(sorting && (
              <DndProvider backend={HTML5Backend}>
                <Example ref={ref => (this.sortable = ref)} data={uploadedImg} />
              </DndProvider>
            )) ||
              uploadedImg.map(item => {
                return (
                  <div className={styles.imgListItem} key={item.id}>
                    <img src={item.url} alt="img" width="50" height="50" />
                    <span>{item.name}</span>
                  </div>
                );
              })}
            <div className={styles.locationCon}>
              所在位置:{' '}
              <Select
                showSearch
                style={{ width: '75%' }}
                value={addressValue || `${currentAddress.province}${currentAddress.city}`}
                placeholder="搜索"
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearchAddress}
                onChange={this.handleChangeAddress}
                notFoundContent={null}
              >
                {defaultAddressList.map(item => (
                  <Option key={item.id}>
                    {item.pname}
                    {item.cityname}
                    {item.adname}
                    {item.address}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditorPage;
