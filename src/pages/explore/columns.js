import React, { Fragment } from 'react';

// 探索列表
export default function exploreColumn(editAction) {
  const column = [
    {
      title: '文章ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => {
        console.log(a, b);
        return a.id - b.id;
      },
    },
    {
      title: '标题',
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
      title: '排序',
      dataIndex: 'tupian',
      key: 'tupian',
      render: value => value || '-',
    },
    {
      title: '文章类型',
      dataIndex: 'zhuangtai',
      key: 'zhuangtai',
      render: value => value || '0',
    },
    {
      title: '标签',
      dataIndex: 'jiekou',
      key: 'jiekou',
      render: value => value || '-',
    },
    {
      title: '阅读量',
      dataIndex: 'qudao',
      key: 'qudao',
      render: value => value || '-',
    },
    {
      title: '收藏量',
      dataIndex: 'qudao2',
      key: 'qudao2',
      render: value => value || '-',
    },
    {
      title: '评论量',
      dataIndex: 'qudao3',
      key: 'qudao3',
      render: value => value || '-',
    },
    {
      title: '转发量',
      dataIndex: 'qudao4',
      key: 'qudao4',
      render: value => value || '-',
    },
    {
      title: '发布时间',
      dataIndex: 'kaishi',
      key: 'kaishi',
      render: value => value || '-',
    },
    {
      title: '更新时间',
      dataIndex: 'jieshu',
      key: 'jieshu',
      render: value => value || '-',
    },
    {
      title: '发布人员',
      dataIndex: 'url',
      key: 'url',
      render: value => value || '-',
    },
    {
      title: '更新人员',
      dataIndex: 'url2',
      key: 'url2',
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
          </Fragment>
        );
      },
    },
  ];

  return column;
}
