import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '首页',
          title: '首页',
          href: '/',
        },
        {
          key: '猎鹰浏览器',
          title: '猎鹰浏览器',
          href: 'http://ly.myyq.com.cn/',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 Copyright Copyright Copyright
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
