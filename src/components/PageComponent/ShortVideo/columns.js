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
      title: '名称',
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
      title: '状态',
      dataIndex: 'zhuangtai',
      key: 'zhuangtai',
      render: value => value || '0',
    },
    {
      title: '视频图片',
      dataIndex: 'tupian',
      key: 'tupian',
      render: value => value || '-',
    },
    {
      title: '播放时长',
      dataIndex: 'jiekou',
      key: 'jiekou',
      render: value => value || '-',
    },
    {
      title: '视频来源',
      dataIndex: 'qudao',
      key: 'qudao',
      render: value => value || '-',
    },
    {
      title: '发布时间',
      dataIndex: 'kaishi',
      key: 'kaishi',
      render: value => value || '-',
    },
    {
      title: '播放地址',
      dataIndex: 'url',
      key: 'url',
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
