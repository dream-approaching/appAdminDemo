import 'braft-editor/dist/index.css';
import React from 'react';
import { ContentUtils } from 'braft-utils';
import './index.less';
import { Button } from 'antd';

export default class BarBlockComponent extends React.Component {
  // 注意：通过blockRendererFn定义的block，无法在编辑器中直接删除，需要在组件中增加删除按钮
  removeBarBlock = () => {
    this.props.blockProps.editor.setValue(
      ContentUtils.removeBlock(this.props.blockProps.editorState, this.props.block)
    );
  };

  render() {
    const blockData = this.props.block.getData();
    const dataB = blockData.get('dataB');

    return (
      <div className="bar-block-component">
        <h2>{`Hello ${dataB}!`}</h2>
        <Button className="button-remove" onClick={this.removeBarBlock}>
          <i className="bfi-bin" />
        </Button>
      </div>
    );
  }
}
