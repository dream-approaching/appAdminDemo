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
      title: '配置项key',
      dataIndex: 'platform',
      key: 'platform',
      render: value => value || '0',
    },
    {
      title: '配置项类型',
      dataIndex: 'url',
      key: 'url',
      render: value => value || '-',
    },
    {
      title: '配置项value',
      dataIndex: 'value',
      key: 'value',
      render: value => value || '-',
    },
    {
      title: '描述',
      dataIndex: 'test',
      key: 'test',
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
