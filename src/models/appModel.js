import { queryModalAppSearchReq } from '@/services/appApi';
import { myMessage } from '@/components/MyMessage';

export default {
  namespace: 'app',

  state: {
    modalAppList: [],
    notices: [],
  },

  effects: {
    *queryModalAppSearchEffect({ payload }, { call, put }) {
      try {
        const response = yield call(queryModalAppSearchReq, payload);
        if (response && response.code === 0) {
          yield put({
            type: 'saveModalAppList',
            payload: response.data || {},
          });
        } else {
          myMessage.warning(response.msg);
        }
      } catch (err) {
        console.log('err', err);
      }
    },
  },

  reducers: {
    saveModalAppList(state, { payload }) {
      return {
        ...state,
        modalAppList: payload,
      };
    },
  },
};
