import React, { Fragment } from 'react';
import { articleType } from '@/config/constants';

// 商品列表
export function goodsColumn(editAction) {
  const column = [
    {
      title: '商品名称',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '单价(金币)',
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
      title: '商品图片',
      dataIndex: 'sort',
      key: 'sort',
      render: value => value || '-',
    },
    {
      title: '发布时间',
      dataIndex: 'type',
      key: 'type',
      render: value => articleType[value] || '-',
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

// 订单列表
export function orderColumn() {
  const column = [
    {
      title: '商品名称',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '单价(金币)',
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
      title: '商品图片',
      dataIndex: 'sort',
      key: 'sort',
      render: value => value || '-',
    },
    {
      title: '兑换时间',
      dataIndex: 'type',
      key: 'type',
      render: value => articleType[value] || '-',
    },
    {
      title: '兑换人',
      dataIndex: 'type1',
      key: 'type1',
      render: value => articleType[value] || '-',
    },
    {
      title: '联系电话',
      dataIndex: 'type2',
      key: 'type2',
      render: value => articleType[value] || '-',
    },
    {
      title: '收件地址',
      dataIndex: 'type3',
      key: 'type3',
      render: value => articleType[value] || '-',
    },
  ];

  return column;
}
