import React, { Fragment } from 'react';
import { Divider } from 'antd';

export default function(editAction, deleteAction) {
  const column = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => {
        console.log(a, b);
        return a.id - b.id;
      },
    },
    {
      title: '包名',
      dataIndex: 'mingcheng',
      key: 'mingcheng',
      sorter: (a, b) => {
        if (a.mingcheng < b.mingcheng) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: '渠道',
      dataIndex: 'tupian',
      key: 'tupian',
      render: value => value || '-',
    },
    {
      title: '基准版本号',
      dataIndex: 'zhuangtai',
      key: 'zhuangtai',
      render: value => value || '0',
    },
    {
      title: '热更新版本号',
      dataIndex: 'jiekou',
      key: 'jiekou',
      render: value => value || '-',
    },
    {
      title: '升级版本',
      dataIndex: 'version1',
      key: 'version1',
      render: value => value || '-',
    },
    {
      title: '升级版本号',
      dataIndex: 'jiekou2',
      key: 'jiekou2',
      render: value => value || '-',
    },
    {
      title: '渠道',
      dataIndex: 'qudao',
      key: 'qudao',
      render: value => value || '-',
    },
    {
      title: '上线时间',
      dataIndex: 'kaishi',
      key: 'kaishi',
      render: value => value || '-',
    },
    {
      title: '状态',
      dataIndex: 'url',
      key: 'url',
      render: value => value || '-',
    },
    {
      title: '升级描述',
      dataIndex: 'showUrl',
      key: 'showUrl',
      render: value => value || '-',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (value, item) => {
        return (
          <Fragment>
            <a onClick={() => editAction(item)}>
              <span>编辑</span>
            </a>
            <Divider type="vertical" />
            <a onClick={() => deleteAction(item)}>
              <span>删除</span>
            </a>
          </Fragment>
        );
      },
    },
  ];

  return column;
}
