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
      title: '应用名',
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
      title: '包名',
      dataIndex: 'baoming',
      key: 'baoming',
      render: value => value || '-',
    },
    {
      title: `${platform}版本`,
      dataIndex: 'platform',
      key: 'platform',
      render: value => value || '0',
    },
    {
      title: '版本号',
      dataIndex: 'version',
      key: 'version',
      render: value => value || '-',
    },
    {
      title: '渠道',
      dataIndex: 'qudao',
      key: 'qudao',
      render: value => value || '-',
    },
    {
      title: 'app大小',
      dataIndex: 'size',
      key: 'size',
      render: value => value || '-',
    },
    {
      title: '上线时间',
      dataIndex: 'jieshu',
      key: 'jieshu',
      render: value => value || '-',
    },
    {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
      render: value => value || '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
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
