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
import { CreditCardOutlined, NumberOutlined } from '@ant-design/icons';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from '../../utils/request';
import { Typography, Alert } from 'antd';

const { Title } = Typography;

const columns1 = [
  {
    title: '时间戳',
    dataIndex: 'timestamp',
  },
  {
    title: '房间号',
    dataIndex: 'roomId',
  },
  {
    title: '事件类型',
    dataIndex: 'eventType',
  },
  {
    title: '模式',
    dataIndex: 'windMode',
  },
  {
    title: '风速',
    dataIndex: 'windSpeed',
  },
  {
    title: '当前温度',
    dataIndex: 'curTemp',
  },
  {
    title: '目标温度',
    dataIndex: 'targetTemp',
  },
  {
    title: '耗电量',
    dataIndex: 'fee',
    key: 'watts',
  },
  {
    title: '费用',
    dataIndex: 'fee',
    key: 'fee',
  },
];

function getWindSpeedName(s) {
  switch (s) {
    case 0:
      return '低风';
    case 1:
      return '中风';
    case 2:
      return '高风';
    default:
      return '未知';
  }
}

export default () => {
  const [fee, setFee] = useState(0);
  const [logs, setLogs] = useState([]);

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      let detail = (await request.get(`/api/detail/${values.username}`)).data;
      for (let log of detail.logs) {
        log.curTemp = log.curTemp.toFixed(2);
        log.fee = log.fee.toFixed(2);
        log.timestamp = new Date(log.timestamp).toTimeString();
        log.windSpeed = getWindSpeedName(log.windSpeed);
      }
      setFee(detail.fee);
      setLogs(detail.logs);
    } catch (e) {
      message.error('查询失败');
    }
  };

  const intl = useIntl();
  return (
    <PageHeaderWrapper>
      <Card bordered={false} title="" style={{ marginBottom: 10 }} id="basicUsage">
        <div
          style={{
            width: 330,
            margin: 'auto',
          }}
        ></div>

        <Row style={{ marginBottom: 10 }}>
          <Col span={10}>
            <Card>
              <Statistic
                title="费用总计"
                value={fee}
                precision={2}
                prefix={<Icon type="pay-circle" />}
                suffix="元"
              />
            </Card>
          </Col>
          <Col>
            <ProForm
              onFinish={async (values) => {
                handleSubmit(values);
                message.success('查询成功');
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
                name="username"
                label="客户身份证号"
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
          </Col>
        </Row>

        <Alert
          message={intl.formatMessage({
            id: '费用详单',
            defaultMessage: '费用详单',
          })}
          type="success"
          showIcon
          // banner
          // style={{
          // margin: -12,
          // marginBottom: 24,
          // }}
        />
        <Table dataSource={logs} columns={columns1} />
      </Card>
      <BackTop visibilityHeight={200} style={{ right: 50 }} />
    </PageHeaderWrapper>
  );
};
