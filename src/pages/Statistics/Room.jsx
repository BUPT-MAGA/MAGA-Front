import React, { useState } from 'react';
import { InputNumber, Card, Table, DatePicker, BackTop, Button, Form, message, Radio } from 'antd';
import request from '../../utils/request';
import { getStatus, getWindMode, getWindSpeedName } from '../../utils/utils';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { CreditCardOutlined, NumberOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';

const columns1 = [
  {
    title: '房间号',
    dataIndex: 'room_id',
  },
  {
    title: '温控请求次数',
    dataIndex: 'num_request',
  },
  {
    title: '总费用',
    dataIndex: 'total_fee',
  },
];

const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const worker = {
  // room_id:
  date: moment(),
  scale: 3,
};

export default () => {
  const [report, setReport] = useState([]);

  const handleSubmit = async (values) => {
    console.log(values);
    console.log(values.date.unix());
    // try {
    const newReport = (
      await request.get(
        `/api/report_room?timestamp=${values.date.unix()}&scale=${values.scale}&room_id=${
          values.room_id
        }`,
      )
    ).data;
    console.log(newReport);
    // for (let r of newReport) {
    // r.total_fee = r.total_fee.toFixed(2);
    // }
    // setReport(newReport);
    message.success('获取报表成功');
    // } catch (e) {
    // message.error('获取报表失败');
    // }
  };

  return (
    <PageHeaderWrapper>
      <Card bordered={false} style={{ marginBottom: 10 }} id="basicUsage">
        <Form name="time_related_controls" onFinish={handleSubmit} initialValues={worker}>
          <Form.Item name="scale" label="">
            <Radio.Group>
              <Radio value={1}>日报表</Radio>
              <Radio value={2}>周报表</Radio>
              <Radio value={3}>月报表</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="date" label="选择日期" {...config}>
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="room_id"
            label="房间号码"
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
          >
            <InputNumber />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            查询报表
          </Button>
        </Form>
        <Table style={{ marginTop: 32 }} dataSource={report} columns={columns1} />
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" disabled={false} onClick={window.print}>
            打印
          </Button>
        </Form.Item>
      </Card>
      <BackTop visibilityHeight={200} style={{ right: 50 }} />
    </PageHeaderWrapper>
  );
};
