import { queryExploreListReq } from '@/services/commonApi';

export default {
  namespace: 'explore',

  state: {
    exploreList: [],
    exploreListTotal: 0,
  },

  effects: {
    *queryExploreListEffect({ payload }, { call, put }) {
      try {
        const response = yield call(queryExploreListReq, payload);
        if (response && response.code === 0) {
          yield put({
            type: 'saveExploreListReducer',
            payload: response.data || {},
          });
        }
      } catch (err) {
        console.log('err', err);
      }
    },
  },

  reducers: {
    saveExploreListReducer(state, { payload }) {
      return {
        ...state,
        exploreList: payload.dataList,
        exploreListTotal: payload.totalCount,
      };
    },
  },
};
