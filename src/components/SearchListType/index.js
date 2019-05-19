import React from 'react';
import SearchList from '@/components/SearchList';
import {
  name,
  status,
  channel,
  apiVersion,
  appVersion,
  rangeTime,
  selfUpgrade,
} from './commonOption';

class SearchListType extends React.Component {
  state = {
    searchOptionList: [],
  };

  componentDidMount() {
    // todo 从redux取渠道、接口数据版本信息
    // 如果redux没有的话，就发起请求，然后保存在redux
    const { type } = this.props;
    let searchOptionList;
    const channelItem = {
      ...channel,
      dataOption: {
        option: [], // todo
      },
    };
    const apiVersionItem = {
      ...apiVersion,
      dataOption: {
        option: [], // todo
      },
    };
    const appVersionItem = {
      ...appVersion,
      dataOption: {
        option: [], // todo
      },
    };
    switch (type) {
      case 'common4':
        searchOptionList = [name(), channelItem, apiVersionItem, status];
        break;
      case 'common3':
        searchOptionList = [name(), channelItem, status];
        break;
      case 'switchAndroid':
        searchOptionList = [name(), channelItem, apiVersionItem];
        break;
      case 'switchIos':
        searchOptionList = [name(), channelItem, appVersionItem];
        break;
      case 'upgradeAndroid':
        searchOptionList = [name('Android版本:'), channelItem, status];
        break;
      case 'upgradeIos':
        searchOptionList = [name('IOS版本:'), channelItem, status];
        break;
      case 'hotUpdate':
        searchOptionList = [name('升级版本'), channelItem, status];
        break;
      case 'onlyName':
        searchOptionList = [name()];
        break;
      case 'config':
        searchOptionList = [name('配置项key')];
        break;
      case 'nameChannel':
        searchOptionList = [name(), channelItem];
        break;
      case 'nameStatus':
        searchOptionList = [name(), status];
        break;
      case 'messagePush':
        searchOptionList = [name('消息描述'), rangeTime];
        break;
      case 'channelTab':
        searchOptionList = [name(), selfUpgrade];
        break;
      default:
        return null;
    }
    this.setState({ searchOptionList });
  }

  render() {
    const { searchOptionList } = this.state;
    const { submitAction } = this.props;
    return <SearchList formItem={searchOptionList} submitAction={submitAction} />;
  }
}

export default SearchListType;
