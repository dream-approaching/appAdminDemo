import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import BarBlockComponent from '@/components/EditorPage/BarBlockComponent';
import './index.less';

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
  if (nodeName === 'div' && node.classList.contains('app-block-bar')) {
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
      start: `<div class="app-block-bar" data-b="${dataB}">`,
      end: '</div>',
    };
  }
};

// 定义一段html，请留意其内容与上文定义的输入/输出转换器的关联性
const initialContent = `<p></p>
<div class="app-block-bar" data-b="1234567"><span>ABCDEFG</span></div>
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
