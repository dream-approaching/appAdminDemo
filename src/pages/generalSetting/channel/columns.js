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
      title: '渠道名称',
      dataIndex: 'platform',
      key: 'platform',
      render: value => value || '0',
    },
    {
      title: '是否自升级',
      dataIndex: 'pinyin',
      key: 'pinyin',
      render: value => value || '0',
    },
    {
      title: '渠道类型',
      dataIndex: 'url',
      key: 'url',
      render: value => value || '-',
    },
    {
      title: '描述',
      dataIndex: 'url2',
      key: 'url2',
      render: value => value || '-',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
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
