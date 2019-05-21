import React, { Fragment } from 'react';
import { articleType } from '@/constants/constants';

// 探索列表
export default function exploreColumn(editAction) {
  const column = [
    {
      title: '文章ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      // sorter: (a, b) => {
      //   if (a.mingcheng < b.mingcheng) {
      //     return 1;
      //   }
      //   return -1;
      // },
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      render: value => value || '-',
    },
    {
      title: '文章类型',
      dataIndex: 'type',
      key: 'type',
      render: value => articleType[value] || '-',
    },
    {
      title: '标签',
      dataIndex: 'label',
      key: 'label',
      render: value => value || '-',
    },
    {
      title: '阅读量',
      dataIndex: 'qudao',
      key: 'qudao',
      render: value => value || '-',
      sorter: (a, b) => {
        return a.qudao - b.qudao;
      },
    },
    {
      title: '收藏量',
      dataIndex: 'favorites',
      key: 'favorites',
      render: value => value || '-',
      sorter: (a, b) => {
        return a.favorites - b.favorites;
      },
    },
    {
      title: '评论量',
      dataIndex: 'comment_num',
      key: 'comment_num',
      render: value => value || '-',
      sorter: (a, b) => {
        return a.comment_num - b.comment_num;
      },
    },
    {
      title: '转发量',
      dataIndex: 'qudao4',
      key: 'qudao4',
      render: value => value || '-',
      sorter: (a, b) => {
        return a.qudao4 - b.qudao4;
      },
    },
    {
      title: '发布时间',
      dataIndex: 'created_time',
      key: 'created_time',
      render: value => value || '-',
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      render: value => value || '-',
    },
    {
      title: '发布人员',
      dataIndex: 'create_user',
      key: 'create_user',
      render: value => value || '-',
    },
    {
      title: '更新人员',
      dataIndex: 'update_user',
      key: 'update_user',
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
