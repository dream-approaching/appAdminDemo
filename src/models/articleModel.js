import { articleActionReq, queryExploreDetailReq } from '@/services/commonApi';
import { myMessage } from '@/components/MyMessage';

export default {
  namespace: 'article',

  state: {
    articleDetail: null,
  },

  effects: {
    *addArticleEffect({ payload, successFn }, { call }) {
      console.log('%cpayload:', 'color: #0e93e0;background: #aaefe5;', payload);
      try {
        const response = yield call(articleActionReq, payload);
        console.log('%cresponse:', 'color: #0e93e0;background: #aaefe5;', response);
        if (response && response.code === 0) {
          successFn && successFn();
        } else {
          myMessage.warning(response.msg);
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    *queryArticleDetailEffect({ payload, successFn }, { call, put }) {
      console.log('%cpayload:', 'color: #0e93e0;background: #aaefe5;', payload);
      try {
        const response = yield call(queryExploreDetailReq, payload);
        console.log('%cresponse:', 'color: #0e93e0;background: #aaefe5;', response);
        if (response && response.code === 0) {
          yield put({
            type: 'saveArticleDetail',
            payload: response.data,
          });
          successFn && successFn();
        } else {
          myMessage.warning(response.msg);
        }
      } catch (err) {
        console.log('err', err);
      }
    },
  },

  reducers: {
    saveArticleDetail(state, { payload }) {
      return {
        ...state,
        articleDetail: payload,
      };
    },
  },
};
