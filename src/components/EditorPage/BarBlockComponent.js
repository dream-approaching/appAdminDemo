import 'braft-editor/dist/index.css';
import React from 'react';
import { ContentUtils } from 'braft-utils';
import './index.less';

export default class BarBlockComponent extends React.Component {
  // 注意：通过blockRendererFn定义的block，无法在编辑器中直接删除，需要在组件中增加删除按钮
  removeBarBlock = () => {
    this.props.blockProps.editor.setValue(
      ContentUtils.removeBlock(this.props.blockProps.editorState, this.props.block)
    );
  };

  render() {
    const blockData = this.props.block.getData();
    const name = blockData.get('name');
    const desc = blockData.get('desc');
    const logo = blockData.get('logo');

    return (
      <div className="my-block-bar">
        <div className="bar-block-left">
          <div>
            <img alt="download" src={logo} />
          </div>
          <div className="bar-block-app">
            <p>{name}</p>
            <p>{desc}</p>
          </div>
        </div>
        <div>
          <img alt="download" src={logo} />
        </div>
      </div>
    );
  }
}
