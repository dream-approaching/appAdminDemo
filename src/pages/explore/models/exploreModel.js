import { queryExploreListReq } from '@/services/commonApi';
import { amapSearchApi, amapIpAddress } from '@/services/amapApi';

export default {
  namespace: 'explore',

  state: {
    exploreList: [],
    exploreListTotal: 0,
    defaultAddressList: [],
    currentAddress: {},
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
    *queryDefaultAddressListEffect({ payload }, { call, put }) {
      try {
        const response = yield call(amapSearchApi, payload);
        if (response && response.status === '1') {
          yield put({
            type: 'saveDefaultAddressList',
            payload: response.pois,
          });
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    *queryCurrentLocation({ payload }, { call, put }) {
      try {
        const response = yield call(amapIpAddress, payload);
        console.log('%cresponse:', 'color: #0e93e0;background: #aaefe5;', response);
        if (response && response.status === '1') {
          yield put({
            type: 'saveCurrentLocation',
            payload: response,
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
    saveDefaultAddressList(state, { payload }) {
      return {
        ...state,
        defaultAddressList: payload,
      };
    },
    saveCurrentLocation(state, { payload }) {
      return {
        ...state,
        currentAddress: payload,
      };
    },
  },
};
