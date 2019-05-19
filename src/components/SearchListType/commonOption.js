export const name = (title = '名称') => {
  return {
    type: 'input',
    title,
    id: 'name',
  };
};

export const channel = {
  type: 'select',
  title: '渠道',
  id: 'channel',
};

export const apiVersion = {
  type: 'select',
  title: '接口数据版本',
  id: 'apiVersion',
};

export const appVersion = {
  type: 'select',
  title: 'App版本',
  id: 'appVersion',
};

export const rangeTime = {
  type: 'rangePicker',
  title: '开始时间',
  id: 'rangeTime',
};

export const status = {
  type: 'select',
  title: '状态',
  id: 'status',
  dataOption: {
    option: [
      {
        id: 1,
        value: '全部',
      },
      {
        id: 2,
        value: '上线',
      },
      {
        id: 3,
        value: '下线',
      },
    ],
    key: 'id',
    value: 'value',
    showValue: 'value',
  },
};

export const selfUpgrade = {
  type: 'select',
  title: '自升级',
  id: 'selfUpgrade',
  dataOption: {
    option: [
      {
        id: 1,
        value: '全部',
      },
      {
        id: 2,
        value: '自升级',
      },
      {
        id: 3,
        value: '非自升级',
      },
    ],
    key: 'id',
    value: 'value',
    showValue: 'value',
  },
};
