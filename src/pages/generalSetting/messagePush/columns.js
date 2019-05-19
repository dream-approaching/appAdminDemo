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
      title: '浏览器名称',
      dataIndex: 'platform',
      key: 'platform',
      render: value => value || '0',
    },
    {
      title: '消息描述',
      dataIndex: 'url',
      key: 'url',
      render: value => value || '-',
    },
    {
      title: '用户群',
      dataIndex: 'value',
      key: 'value',
      render: value => value || '-',
    },
    {
      title: '推送时间',
      dataIndex: 'test',
      key: 'test',
      render: value => value || '-',
    },
    {
      title: '消息总数',
      dataIndex: 'test1',
      key: 'test1',
      render: value => value || '-',
    },
    {
      title: '收到数',
      dataIndex: 'test2',
      key: 'test2',
      render: value => value || '-',
    },
    {
      title: '打开',
      dataIndex: 'test3',
      key: 'test3',
      render: value => value || '-',
    },
    {
      title: '忽略',
      dataIndex: 'test4',
      key: 'test4',
      render: value => value || '-',
    },
    {
      title: '提交结果',
      dataIndex: 'test45',
      key: 'test45',
      render: value => value || '-',
    },
    {
      title: '失败原因',
      dataIndex: 'test6',
      key: 'test6',
      render: value => value || '-',
    },
    {
      title: '状态',
      dataIndex: 'test7',
      key: 'test7',
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
