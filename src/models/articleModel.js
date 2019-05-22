import { articleActionReq } from '@/services/commonApi';
import { myMessage } from '@/components/MyMessage';

export default {
  namespace: 'article',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    *addArticleEffect({ payload, successFn }, { call }) {
      console.log('%cpayload:', 'color: #0e93e0;background: #aaefe5;', payload);
      try {
        const response = yield call(articleActionReq, payload);
        console.log('%cresponse:', 'color: #0e93e0;background: #aaefe5;', response);
        if (response && response.code === 0 && successFn) {
          successFn();
        }
        myMessage.warning(response.msg);
      } catch (err) {
        console.log('err', err);
      }
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },
};
