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
      dataIndex: 'platform',
      key: 'platform',
      render: value => value || '0',
    },
    {
      title: '状态',
      dataIndex: 'pinyin',
      key: 'pinyin',
      render: value => value || '0',
    },
    {
      title: '渠道',
      dataIndex: 'url',
      key: 'url',
      render: value => value || '-',
    },
    {
      title: '接口数据版本',
      dataIndex: 'url1',
      key: 'url1',
      render: value => value || '-',
    },
    {
      title: '创建日期',
      dataIndex: 'time1',
      key: 'time1',
      render: value => value || '-',
    },
    {
      title: '更新日期',
      dataIndex: 'time2',
      key: 'time2',
      render: value => value || '-',
    },
    {
      title: '延迟时间/天',
      dataIndex: 'time3',
      key: 'time3',
      render: value => value || '-',
    },
    {
      title: '起始时间',
      dataIndex: 'time4',
      key: 'time4',
      render: value => value || '-',
    },
    {
      title: '截止时间',
      dataIndex: 'time5',
      key: 'time5',
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
