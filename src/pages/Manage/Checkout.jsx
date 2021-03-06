import React from 'react';
import { Card, Form, Input, Button, notification, message, BackTop } from 'antd';
import { CreditCardOutlined, NumberOutlined } from '@ant-design/icons';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { useIntl } from 'umi';
import request from '../../utils/request';

const handleSubmit = async (values) => {
  console.log('values:');
  console.log(values);
  request
    .post('/api/checkout', values)
    .then((response) => {
      console.log(response), message.success('退房成功！');
    })
    .catch((err) => {
      console.log(err.response), message.error('退房失败！');
    });
};

const CheckOutBox = () => {
  return (
    <PageHeaderWrapper>
      <div
        style={{
          width: 330,
          margin: 'auto',
        }}
      >
        <ProForm
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
          submitter={{
            searchConfig: {
              submitText: '确认退房',
            },
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              size: 'large',
              style: {
                width: '100%',
              },
            },
          }}
        >
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <CreditCardOutlined />,
            }}
            name="user_id"
            label="客户身份证号"
            tooltip="身份证长度为 18 位"
            placeholder="请输入身份证号"
            rules={[
              {
                required: true,
                message: '请输入身份证号!',
              },
              {
                pattern: /^\d*$/,
                message: '不合法的身份证号!',
              },
            ]}
          />
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <NumberOutlined />,
            }}
            name="room_id"
            label="房间号"
            placeholder="请输入房间号"
            rules={[
              {
                required: true,
                message: '请输入房间号!',
              },
              {
                pattern: /^\d{3}$/,
                message: '不合法的房间号!',
              },
            ]}
          />
        </ProForm>
      </div>
    </PageHeaderWrapper>
  );
};

export default CheckOutBox;
