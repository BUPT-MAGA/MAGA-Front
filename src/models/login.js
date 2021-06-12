import { stringify } from 'querystring';
import { history } from 'umi';
import { AccountLogin, AccountSignUp } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      try {
        const response = yield call(AccountLogin, payload);
        console.log(response.data);
        localStorage.setItem('access_token', response.data.access_token);
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (window.routerBase !== '/') {
              redirect = redirect.replace(window.routerBase, '/');
            }

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/settings');
      } catch (e) {
        message.error('登录失败');
      }
    },

    *signup({ payload }, { call, put }) {
      try {
        const response = yield call(AccountSignUp, payload);
        console.log(response);
        message.success('注册成功！');
      } catch (e) {
        message.error('注册失败');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
