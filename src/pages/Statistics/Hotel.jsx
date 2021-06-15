import React, { useState } from 'react';
import { Card, Table, DatePicker, BackTop, Button, Form, message, Radio } from 'antd';
import request from '../../utils/request';
import { getStatus, getWindMode, getWindSpeedName } from '../../utils/utils';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';

const columns1 = [
  {
    title: '房间号',
    dataIndex: 'room_id',
  },
  {
    title: '开机次数',
    dataIndex: 'open_cnt',
  },
  {
    title: '关机次数',
    dataIndex: 'close_cnt',
  },
  {
    title: '总费用',
    dataIndex: 'sum_fee',
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
      await request.get(`/api/report_hotel?timestamp=${values.date.unix()}&scale=${values.scale}`)
    ).data;
    console.log(newReport);
    for (let r of newReport) {
      r.room_id = '# ' + r.room_id;
      r.sum_fee = '¥ ' + r.sum_fee.toFixed(2);
    }
    console.log(newReport);
    setReport(newReport);
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
            <DatePicker
            // rules={[
            //   {
            //     type: 'object',
            //     required: true,
            //     message: '请选择查询日期!',
            //   },
            // ]}
            />
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
