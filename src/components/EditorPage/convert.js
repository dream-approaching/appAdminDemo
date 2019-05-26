const sizeBase = 37.5;
export const unitImportFn = (unit, type, source) => {
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
export const unitExportFn = (unit, type, target) => {
  if (type === 'line-height') return unit;
  // target的值可能是html或者editor，对应输出到html和在编辑器中显示这两个场景
  if (target === 'html') {
    return `${unit / sizeBase}rem`;
  }
  return `${unit}px`;
};

export const blockImportFn = (nodeName, node) => {
  if (nodeName === 'div' && node.classList.contains('app-block-bar')) {
    const { name, desc, logo } = node.dataset;

    return {
      type: 'block-bar',
      data: {
        name,
        desc,
        logo,
      },
    };
  }
};

// 自定义block输出转换器，用于将不同的block转换成不同的html内容，通常与blockImportFn中定义的输入转换规则相对应
export const blockExportFn = (contentState, block) => {
  if (block.type === 'block-bar') {
    const { name, desc, logo } = block.data;

    return {
      start: `<div class="app-block-bar" data-name="${name}" data-desc="${desc}" data-logo="${logo}">`,
      end: '</div>',
    };
  }
  const previousBlock = contentState.getBlockBefore(block.key);

  if (block.type === 'unstyled' && previousBlock && previousBlock.getType() === 'atomic') {
    return {
      start: '',
      end: '',
    };
  }
};
