import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getCaptchaReq, loginReq } from '@/services/loginApi';
import { setAuthority } from '@/utils/authority';
import { getPageQuery, compile, uncompile } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import message from '@/components/Message';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    loginInfo: sessionStorage.getItem('info')
      ? JSON.parse(uncompile(sessionStorage.getItem('info')))
      : null,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(loginReq, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: true,
          currentAuthority: 'admin',
        },
      });
      // Login successfully
      if (response && response.code === 0) {
        reloadAuthorized();
        yield put({
          type: 'saveLoginInfo',
          payload: response.data,
        });
        window.sessionStorage.setItem('info', compile(JSON.stringify(response.data)));
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        message.warning(response.msg || '登录失败');
      }
    },

    *getCaptchaEffect({ payload }, { call }) {
      const response = yield call(getCaptchaReq, payload);
      if (response.success) {
        message.success('发送成功');
      } else {
        message.warning(response.msg || '发送失败');
      }
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      window.sessionStorage.clear();
      yield put({
        type: 'saveLoginInfo',
        payload: null,
      });
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    saveLoginInfo(state, { payload }) {
      return {
        ...state,
        loginInfo: payload,
      };
    },
  },
};
