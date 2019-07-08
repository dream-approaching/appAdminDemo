import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import styles from './Analysis.less';
import { ChartCard, MiniArea } from '@/components/Charts';
import Trend from '@/components/Trend';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(({ loading, visitData }) => {
  console.log('%cvisitData:', 'color: #0e93e0;background: #aaefe5;', visitData);
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="新用户数(7日平均)"
          action={
            <Tooltip title="最近7天，平均每天新激活的用户">
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          loading={loading}
          total={numeral(8846).format('0,0')}
          footer={
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <Trend flag="up" style={{ marginRight: 16 }}>
                同比
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                同比
                <span className={styles.trendText}>11%</span>
              </Trend>
            </div>
          }
          contentHeight={46}
        >
          <MiniArea color="#975FE4" data={[]} />
        </ChartCard>
      </Col>
    </Row>
  );
});

export default IntroduceRow;
