import React from 'react';
import { Table } from 'antd';
import styles from './index.less';

function MyTable({ pagination, style, ...restProps }) {
  return (
    <Table
      className={styles.myTable}
      locale={{
        filterTitle: '筛选',
        filterConfirm: '确定',
        filterReset: '重置',
        emptyText: '暂无数据',
      }}
      pagination={{
        ...pagination,
        hideOnSinglePage: true,
      }}
      scroll={{ x: 1 || true, y: 0 }}
      rowClassName={styles.myTableRow}
      {...restProps}
    />
  );
}

export default React.memo(MyTable);
