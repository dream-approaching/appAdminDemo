import { queryModalLabelReq } from '@/services/commonApi';
import { myMessage } from '@/components/MyMessage';

export default {
  namespace: 'label',

  state: {
    labelData: [],
    selectedLabel: [],
  },

  effects: {
    *queryLabelEffect({ payload }, { call, put }) {
      console.log('%cpayload:', 'color: #0e93e0;background: #aaefe5;', payload);
      try {
        const response = yield call(queryModalLabelReq, payload);
        console.log('%cresponse:', 'color: #0e93e0;background: #aaefe5;', response);
        if (response && response.code === 0) {
          yield put({
            type: 'saveLabelData',
            payload: response.data.label_all_list || [],
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
    saveLabelData(state, { payload }) {
      return {
        ...state,
        labelData: payload,
      };
    },
    saveSelectedLabel(state, { payload }) {
      return {
        ...state,
        selectedLabel: payload,
      };
    },
  },
};
