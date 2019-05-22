/* eslint-disable */
import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import './index.less';

class BarBlockComponent extends React.Component {
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
        <button className="button-remove" onClick={this.removeBarBlock}>
          <i className="bfi-bin" />
        </button>
      </div>
    );
  }
}

// 声明blockRendererFn
const blockRendererFn = (block, { editor, editorState }) => {
  if (block.getType() === 'block-bar') {
    return {
      component: BarBlockComponent,
      editable: false,
      props: { editor, editorState }, // 此处传入的内容可以在组件中通过this.props.blockProps获取到
    };
  }
};

const blockImportFn = (nodeName, node) => {
  if (nodeName === 'div' && node.classList.contains('my-block-foo')) {
    const dataA = node.dataset.a;

    return {
      type: 'block-foo',
      data: {
        dataA,
      },
    };
  }

  if (nodeName === 'div' && node.classList.contains('my-block-bar')) {
    const text = node.querySelector('span').innerText;
    const dataB = node.dataset.b;

    return {
      type: 'block-bar',
      data: {
        text,
        dataB,
      },
    };
  }
};

// 自定义block输出转换器，用于将不同的block转换成不同的html内容，通常与blockImportFn中定义的输入转换规则相对应
const blockExportFn = (contentState, block) => {
  if (block.type === 'block-bar') {
    const { dataB } = block.data;

    return {
      start: `<div class="my-block-bar" data-b="${dataB}">`,
      end: '</div>',
    };
  }
};

// 定义一段html，请留意其内容与上文定义的输入/输出转换器的关联性
const initialContent = `<p></p>
<div class="my-block-bar" data-b="1234567"><span>ABCDEFG</span></div>
<p></p>`;

export default class BasicDemo extends React.Component {
  state = {
    // 注意： 使用createEditorState时，需要将上文定义的blockImportFn和blockExportFn作为第二个对象参数的成员传入
    editorState: BraftEditor.createEditorState(initialContent, { blockImportFn, blockExportFn }),
  };

  handleChange = editorState => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState, outputHTML } = this.state;

    // 在组件中传入上文定义的blockRenderMap、blockRendererFn
    // 并将blockImportFn和blockExportFn传入组件的converts属性
    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
            blockRendererFn={blockRendererFn}
            converts={{ blockImportFn, blockExportFn }}
          />
        </div>
        <h5>输出内容</h5>
        <div className="output-content">{outputHTML}</div>
      </div>
    );
  }
}
