import React from 'react';
import Table from '@/components/MyTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import columns from './columns';

const testData = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
  { id: '8' },
  { id: '9' },
  { id: '10' },
  { id: '11' },
  { id: '12' },
  { id: '13' },
];

class Banner extends React.PureComponent {
  render() {
    return (
      <PageHeaderWrapper>
        <Table
          pagination={null}
          rowKey={record => record.id}
          loading={false}
          columns={columns()}
          dataSource={testData}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Banner;
