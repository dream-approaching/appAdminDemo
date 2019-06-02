import { articleActionReq, queryLabelReq } from '@/services/commonApi';
import { myMessage } from '@/components/MyMessage';

export default {
  namespace: 'article',

  state: {
    labelData: [],
  },

  effects: {
    *queryLabelEffect({ payload, successFn }, { call, put }) {
      console.log('%cpayload:', 'color: #0e93e0;background: #aaefe5;', payload);
      try {
        const response = yield call(queryLabelReq, payload);
        console.log('%cresponse:', 'color: #0e93e0;background: #aaefe5;', response);
        if (response && response.code === 0 && successFn) {
          yield put({
            type: 'saveLabelData',
            payload: response.data || {},
          });
        } else {
          myMessage.warning(response.msg);
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    *addArticleEffect({ payload, successFn }, { call }) {
      console.log('%cpayload:', 'color: #0e93e0;background: #aaefe5;', payload);
      try {
        const response = yield call(articleActionReq, payload);
        console.log('%cresponse:', 'color: #0e93e0;background: #aaefe5;', response);
        if (response && response.code === 0 && successFn) {
          successFn();
        } else {
          myMessage.warning(response.msg);
        }
      } catch (err) {
        console.log('err', err);
      }
    },
  },

  reducers: {
    saveLabelData(state, { payload }) {
      return {
        ...state,
        labelData: payload,
      };
    },
  },
};
