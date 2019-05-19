import React, { Fragment } from 'react';
import { Divider } from 'antd';

// 一级分类列表
export function gradeOneColumn(editAction, deleteAction) {
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
      title: '图片',
      dataIndex: 'tupian',
      key: 'tupian',
      render: value => value || '-',
    },
    {
      title: '状态',
      dataIndex: 'zhuangtai',
      key: 'zhuangtai',
      render: value => value || '0',
    },
    {
      title: '渠道',
      dataIndex: 'qudao',
      key: 'qudao',
      render: value => value || '-',
    },
    {
      title: 'url',
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

// 二级分类列表
export function gradeTwoColumn(editAction, deleteAction) {
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
      title: '图片',
      dataIndex: 'tupian',
      key: 'tupian',
      render: value => value || '-',
    },
    {
      title: '状态',
      dataIndex: 'zhuangtai',
      key: 'zhuangtai',
      render: value => value || '0',
    },
    {
      title: '一级标签',
      dataIndex: 'zhuangtai1',
      key: 'zhuangtai1',
      render: value => value || '0',
    },
    {
      title: '渠道',
      dataIndex: 'qudao',
      key: 'qudao',
      render: value => value || '-',
    },
    {
      title: '类型',
      dataIndex: 'qudao2',
      key: 'qudao2',
      render: value => value || '-',
    },
    {
      title: 'url',
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

// 三级分类列表
export function gradeThreeColumn(editAction, deleteAction) {
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
      title: '图片',
      dataIndex: 'tupian',
      key: 'tupian',
      render: value => value || '-',
    },
    {
      title: '状态',
      dataIndex: 'zhuangtai',
      key: 'zhuangtai',
      render: value => value || '0',
    },
    {
      title: '一级标签',
      dataIndex: 'zhuangtai1',
      key: 'zhuangtai1',
      render: value => value || '0',
    },
    {
      title: '二级标签',
      dataIndex: 'zhuangtai2',
      key: 'zhuangtai2',
      render: value => value || '0',
    },
    {
      title: '渠道',
      dataIndex: 'qudao',
      key: 'qudao',
      render: value => value || '-',
    },
    {
      title: 'url',
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
