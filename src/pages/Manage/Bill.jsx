import React, { useState } from 'react';
import {
  Col,
  Statistic,
  Icon,
  Card,
  Table,
  BackTop,
  Button,
  Form,
  message,
  Input,
  Row,
} from 'antd';
import { CreditCardOutlined, PayCircleOutlined } from '@ant-design/icons';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import request from '../../utils/request';
import { getStatus, getWindSpeedName } from '../../utils/utils';

import { Typography, Alert } from 'antd';
import { get } from 'lodash-es';
import moment from 'moment';

const columns1 = [
  {
    title: '房间号',
    dataIndex: 'room_id',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '入住时间',
    dataIndex: 'checkin_time',
  },
  {
    title: '退房时间',
    dataIndex: 'checkout_time',
  },
  {
    title: '费用',
    dataIndex: 'fee',
    key: 'fee',
  },
];

export default () => {
  const [fee, setFee] = useState(0);
  const [logs, setLogs] = useState([]);

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      console.log('details:');
      let detail = (await request.get(`/api/bill?user_id=${values.user_id}`)).data;
      let newFee = 0;
      for (let log of detail) {
        console.log(log);

        log.checkin_time = moment.unix(log.checkin_time).format('YYYY-MM-DD HH:MM:SS');
        if (log.status === 2) {
          log.checkout_time = moment.unix(log.checkout_time).format('YYYY-MM-DD HH:MM:SS');
        } else {
          log.checkout_time = '-';
        }
        log.status = getStatus(log.status);
        log.fee = parseFloat(log.fee.toFixed(2).replace(',', '.'));
        newFee += log.fee;
      }
      setFee(newFee);
      setLogs(detail);
      message.success('查询成功');
    } catch (e) {
      message.error('查询失败');
    }
  };

  const intl = useIntl();
  return (
    <PageHeaderWrapper>
      <Card bordered={false} title="" style={{ marginBottom: 10 }} id="basicUsage">
        <ProCard gutter={[{ xs: 16, sm: 16, md: 32, lg: 32, xl: 64 }, 16]}>
          <ProCard colSpan="40%" title="费用总计" headerBordered bordered>
            <Statistic value={fee} precision={2} prefix={<PayCircleOutlined />} suffix="元" />
          </ProCard>
          <ProCard bordered>
            <div
              style={{
                width: 330,
                margin: 'auto',
              }}
            >
              {' '}
              <ProForm
                onFinish={async (values) => {
                  handleSubmit(values);
                }}
                submitter={{
                  searchConfig: {
                    submitText: '查询账单',
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
                  // label="客户身份证号"
                  tooltip="身份证长度为 18 位"
                  placeholder="请输入身份证号"
                  rules={[
                    {
                      required: true,
                      message: '请输入身份证号!',
                    },
                    // {
                    //   pattern: /^\d{18}$/,
                    //   message: '不合法的身份证号!',
                    // },
                  ]}
                />
              </ProForm>
            </div>
          </ProCard>
        </ProCard>

        <ProCard title="查看详单" collapsible defaultCollapsed>
          <Table dataSource={logs} columns={columns1} />
        </ProCard>
      </Card>
      <BackTop visibilityHeight={200} style={{ right: 50 }} />
    </PageHeaderWrapper>
  );
};
