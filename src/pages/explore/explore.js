import React, { Fragment } from 'react';
import Table from '@/components/MyTable';
import { Input, Upload, Icon, Modal } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { exploreType, publishStatus } from '@/constants/constants';
import BraftEditor from 'braft-editor';
import MyButton from '@/components/Button';
import 'braft-editor/dist/index.css';
import columns from './columns';
import styles from './index.less';

@connect(({ explore, loading }) => ({
  explore,
  loading: loading.effects['explore/queryExploreListEffect'],
}))
class Explore extends React.Component {
  state = {
    currentPage: 1,
    editStatus: true,
    fileList: [],
    editorState: BraftEditor.createEditorState(
      '<h3>01 标题1</h3><p style="text-indent:2em;">这个app很好用，是我最新换的一个之一</p><div class="media-wrap image-wrap align-center" style="text-align:center"><img src="data:image/png;base64,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"/></div><div class="media-wrap image-wrap align-center" style="text-align:center"><img src="data:image/png;base64,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"/></div>'
    ),
    imgSize: '10',
    imgType: 'png',
    imgContent: '',
  };

  componentDidMount() {
    // this.queryExploreListDispatch();
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

  handleBeforeUpload = async file => {
    console.log('%cfile:', 'color: #0e93e0;background: #aaefe5;', file);
    // 限制图片 格式、size、分辨率
    const isJPG = file.type === 'image/jpeg';
    // const isJPEG  = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    if (!(isJPG || isGIF || isPNG)) {
      Modal.error({
        title: '只能上传JPG 、JPEG 、GIF、 PNG格式的图片~',
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Modal.error({
        title: '超过2M限制 不允许上传~',
      });
    }
    await this.setState({
      imgSize: file.size,
      imgType: file.type,
      imgContent: encodeURI(file.thumbUrl),
    });
    return (isJPG || isGIF || isPNG) && isLt2M && this.checkImageWH(file, 350, 504);
  };

  checkImageWH = (file, width, height) => {
    return new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.onload = e => {
        const src = e.target.result;
        const image = new Image();
        image.onload = () => {
          resolve();
          if (width && this.width !== width) {
            Modal.error({
              title: `请上传宽为${width}的图片`,
            });
            reject();
          } else if (height && this.height !== height) {
            Modal.error({
              title: `请上传高为${height}的图片`,
            });
            reject();
          } else {
            resolve();
          }
        };
        image.onerror = reject;
        image.src = src;
      };
      filereader.readAsDataURL(file);
    });
  };

  renderEditStatus = () => {
    const { editorState, fileList, imgContent, imgSize, imgType } = this.state;
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
      if (type === 'line-height') {
        // 输出行高时不添加单位
        return unit;
      }

      // target的值可能是html或者editor，对应输出到html和在编辑器中显示这两个场景
      if (target === 'html') {
        // 只在将内容输出为html时才进行转换
        return `${unit / sizeBase}rem`;
      }
      // 在编辑器中显示时，按px单位展示
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
              converts={{ unitImportFn, unitExportFn, blockExportFn }}
              value={editorState}
              onChange={this.handleEditorChange}
              onSave={this.handleSubmitContent}
            />
            <div className={styles.footerCon}>
              <Upload
                action="http://192.168.0.200:1230/interface/v1/js/user/auth/upload_picture"
                data={{
                  sig: '',
                  access_token: '',
                  channel_id: '',
                  username: '',
                  image_size: imgSize,
                  image_type: imgType,
                  image_content: imgContent,
                }}
                listType="picture-card"
                fileList={fileList}
                onChange={this.handleChangeUpload}
                beforeUpload={this.handleBeforeUpload}
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
