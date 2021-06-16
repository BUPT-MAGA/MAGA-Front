import React from 'react';
import { notification, message } from 'antd';
import { CreditCardOutlined, NumberOutlined } from '@ant-design/icons';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { useIntl } from 'umi';
import request from '../../utils/request';

const handleSubmit = (values) => {
  console.log('values:');
  console.log(values);
  request
    .post('/api/checkin', values)
    .then((response) => {
      console.log(response), message.success('入住成功！');
    })
    .catch((err) => {
      console.log(err.response), message.error('入住失败！');
    });
};

const CheckInBox = () => {
  // const intl = useIntl();
  return (
    <PageHeaderWrapper>
      <div
        style={{
          width: 330,
          margin: 'auto',
        }}
      >
        <ProForm
          onFinish={(values) => {
            handleSubmit(values);
          }}
          submitter={{
            searchConfig: {
              submitText: '确认入住',
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
            tooltip="身份证长度为 3 位"
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

export default CheckInBox;
