import React, { Fragment } from 'react';
import { Divider } from 'antd';

export default function(editAction, deleteAction, platform) {
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
      title: `${platform}版本`,
      dataIndex: 'platform',
      key: 'platform',
      render: value => value || '0',
    },
    {
      title: '接口数据版本',
      dataIndex: 'apiVersion',
      key: 'apiVersion',
      render: value => value || '-',
    },
    {
      title: '升级描述',
      dataIndex: 'desc',
      key: 'desc',
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
