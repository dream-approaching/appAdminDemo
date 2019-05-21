import React, { Fragment } from 'react';
import Table from '@/components/MyTable';
import { Input, Upload, Icon } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { exploreType, publishStatus } from '@/constants/constants';
import BraftEditor from 'braft-editor';
import MyButton from '@/components/Button';
import 'braft-editor/dist/index.css';
import columns from './columns';
import styles from './index.less';

// function readImage(file) {
//   const reader = new FileReader();

//   reader.addEventListener('load', function() {
//     const image = new Image();

//     image.addEventListener('load', function() {
//       var imageInfo =
//         file.name +
//         ' ' +
//         image.width +
//         '×' +
//         image.height +
//         ' ' +
//         file.type +
//         ' ' +
//         Math.round(file.size / 1024) +
//         'KB';

//       // Show image and info
//       elPreview.appendChild(this);
//       elPreview.insertAdjacentHTML('beforeend', imageInfo + '<br>');

//     });
//     image.src = reader.result;
//   });

//   reader.readAsDataURL(file);
// }

@connect(({ explore, loading }) => ({
  explore,
  loading: loading.effects['explore/queryExploreListEffect'],
}))
class Explore extends React.Component {
  state = {
    currentPage: 1,
    editStatus: true,
    fileList: [],
    editorState: BraftEditor.createEditorState(null),
  };

  componentDidMount() {
    this.queryExploreListDispatch();
    this.input = document.getElementById('browse');
  }

  queryExploreListDispatch = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'explore/queryExploreListEffect',
      payload: {
        pageType: exploreType.explore.key,
        page: 1,
        rows: 15,
        status: publishStatus.failed.key,
        ...params,
      },
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

  handleChangePage = (page, pageSize) => {
    this.setState({ currentPage: page });
    const requestBody = {
      page,
      rows: pageSize,
    };
    this.queryExploreListDispatch(requestBody);
  };

  handleChangePageSize = (current, pageSize) => {
    console.log(current, pageSize);
  };

  handleAddArticle = () => {
    this.setState({
      editStatus: true,
    });
  };

  handleCancelAddArticle = () => {
    this.setState({
      editStatus: false,
    });
  };

  handleChangeUpload = ({ file, fileList, event }) => {
    console.log('%cfile:', 'color: #0e93e0;background: #aaefe5;', file);
    console.log('%cfileList:', 'color: #0e93e0;background: #aaefe5;', fileList);
    console.log('%cevent:', 'color: #0e93e0;background: #aaefe5;', event);
    this.setState({ fileList });
  };

  beforeUpload = file => {
    console.log('%cfile:', 'color: #0e93e0;background: #aaefe5;', file);

    return true;
  };

  renderEditStatus = () => {
    const { editorState, fileList } = this.state;
    const blockExportFn = (contentState, block) => {
      const previousBlock = contentState.getBlockBefore(block.key);

      if (block.type === 'unstyled' && previousBlock && previousBlock.getType() === 'atomic') {
        return {
          start: '',
          end: '',
        };
      }
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className={styles.editorCon}>
        <div className={styles.editorHeader}>
          <Input placeholder="请输入标题" className={styles.headerInput} />
          <div className={styles.rightBtnCon}>
            <MyButton onClick={this.handleCancelAddArticle}>取消</MyButton>
            <MyButton>存为模板</MyButton>
            <MyButton>预览</MyButton>
            <MyButton>保存</MyButton>
          </div>
        </div>
        <div className={styles.editBody}>
          <div className={styles.editBodyLeft}>
            <BraftEditor
              converts={{ blockExportFn }}
              value={editorState}
              onChange={this.handleEditorChange}
              onSave={this.handleSubmitContent}
            />
            <div className={styles.footerCon}>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                id="browse"
                onChange={this.handleChangeUpload}
                beforeUpload={this.beforeUpload}
              >
                {fileList.length >= 3 ? null : uploadButton}
              </Upload>
            </div>
          </div>
          <div className={styles.editBodyRight} />
        </div>
      </div>
    );
  };

  renderTableView = () => {
    const { currentPage } = this.state;
    const { explore, loading } = this.props;
    return (
      <Fragment>
        <Table
          pagination={{
            current: currentPage,
            total: +explore.exploreListTotal,
            onChange: this.handleChangePage,
            showSizeChanger: true,
            onShowSizeChange: this.handleChangePageSize,
          }}
          rowKey={record => record.id}
          loading={loading}
          columns={columns()}
          dataSource={explore.exploreList}
        />
        <div className={styles.footerCon}>
          <MyButton onClick={this.handleAddArticle}>添加文章</MyButton>
        </div>
      </Fragment>
    );
  };

  render() {
    const { editStatus } = this.state;
    // if (editStatus) return this.renderEditStatus()
    return (
      <PageHeaderWrapper>
        {(editStatus && this.renderEditStatus()) || this.renderTableView()}
      </PageHeaderWrapper>
    );
  }
}

export default Explore;
