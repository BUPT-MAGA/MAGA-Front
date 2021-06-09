import {
  GithubOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  WechatOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import { getFakeCaptcha } from '@/services/login';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [type, setType] = useState('login');
  const intl = useIntl();

  const handleSubmit = (values) => {
    console.log(values);
    const { dispatch } = props;
    if (type === 'login') {
      values = { ...values, ['grant_type']: 'password' };
      dispatch({
        type: 'login/login',

        payload: { ...values, type },
      });
    } else {
      values = { ...values, ['role']: 'admin' };
      {
        /* add role to register */
      }
      dispatch({
        type: 'login/signup',
        payload: { ...values, type },
      });
    }
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="login"
            tab={intl.formatMessage({
              id: 'pages.login.accountLogin.tab',
              defaultMessage: 'Account password login',
            })}
          />
          <Tabs.TabPane
            key="signup"
            tab={intl.formatMessage({
              id: 'pages.login.accountSignUp.tab',
              defaultMessage: 'Account sign up',
            })}
          />
        </Tabs>

        {status === 'error' && loginType === 'login' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: 'Incorrect account or password（admin/ant.design)',
            })}
          />
        )}
        {/* login */}
        {type === 'login' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: 'Username: admin or user',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="Please enter user name!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: 'Password: ant.design',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Please enter password！"
                    />
                  ),
                },
              ]}
            />
          </>
        )}

        {status === 'error' && loginType === 'signup' && !submitting && (
          <LoginMessage content="Verification code error" />
        )}

        {/* signup */}
        {type === 'signup' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: 'Please input user name！',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="Please enter user name!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: 'Password: ant.design',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Please enter password！"
                    />
                  ),
                },
              ]}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="Auto login" />
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
            onClick={() => message.warn('请联系管理员！')}
          >
            <FormattedMessage id="pages.login.forgotPassword" defaultMessage="Forget password" />
          </a>
        </div>
      </ProForm>
      <Space className={styles.other}>
        <FormattedMessage id="pages.login.loginWith" defaultMessage="Other login methods" />
        <GithubOutlined className={styles.icon} />
        <WechatOutlined className={styles.icon} />
        <WeiboCircleOutlined className={styles.icon} />
      </Space>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
