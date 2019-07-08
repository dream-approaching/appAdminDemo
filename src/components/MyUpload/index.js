import React from 'react';
import { Upload, Modal } from 'antd';
import { connect } from 'dva';
import { baseUrl } from '@/defaultSettings';
import { myMessage } from '../MyMessage';

@connect(({ login }) => ({ login }))
class MyUpload extends React.Component {
  state = {
    imgSize: '10',
    imgType: 'png',
    imgContent: '',
  };

  handleBeforeUpload = async file => {
    // 限制图片 格式、size、分辨率
    const { limitMeasure = {} } = this.props;
    const { width, height } = limitMeasure;
    const isJPG = file.type === 'image/jpeg';
    const isJPEG = file.type === 'image/jpeg';
    // const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    const isAllowType = isJPG || isJPEG || isPNG;
    if (!isAllowType) {
      myMessage.warning('只能上传JPG 、JPEG 、 PNG格式的图片~');
      return false;
    }
    const isAllowSize = file.size / 1024 / 1024 < 2;
    if (!isAllowSize) {
      myMessage.warning('超过2M限制 不允许上传~');
      return false;
    }
    await this.setState({
      imgSize: file.size,
      imgType: file.type.split('/')[1],
    });
    return this.checkImageWH(file, width, height);
  };

  checkImageWH = (file, width, height) => {
    return new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.onload = async e => {
        const src = e.target.result;
        const image = new Image();
        image.onload = () => {
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
        console.log('%cimage.src:', 'color: #0e93e0;background: #aaefe5;', image.src);
        await this.setState({
          imgContent: image.src.split(',')[1],
        });
      };
      filereader.readAsDataURL(file);
    });
  };

  render() {
    const { login, ...rest } = this.props;
    const { loginInfo } = login;
    const { imgContent, imgSize, imgType } = this.state;
    // console.log('%cimgContent:', 'color: #0e93e0;background: #aaefe5;', imgContent);
    return (
      <Upload
        action={`${baseUrl}/interface/v1/js/user/auth/upload_picture`}
        data={{
          access_token: loginInfo ? loginInfo.access_token : '',
          username: loginInfo ? loginInfo.username : '',
          channel_id: '2',
          sig: 'true',
          image_size: imgSize,
          image_type: imgType,
          image_content: imgContent,
        }}
        onChange={this.handleChangeUpload}
        beforeUpload={this.handleBeforeUpload}
        {...rest}
      />
    );
  }
}

export default MyUpload;
