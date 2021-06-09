import React, { useState } from 'react';
import { Card, Table, DatePicker, BackTop, Button, Form, message, Radio } from 'antd';
import request from '../../utils/request';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const columns1 = [
  {
    title: '房间号',
    dataIndex: 'room_id',
  },
  {
    title: '使用空调次数',
    dataIndex: 'turnOnCount',
  },
  {
    title: '最常用目标温度',
    dataIndex: 'favTargetTemp',
  },
  {
    title: '最常用风速',
    dataIndex: 'favSpeed',
  },
  {
    title: '达到目标温度次数',
    dataIndex: 'pauseCount',
  },
  {
    title: '被调度次数',
    dataIndex: 'scheduledCount',
  },
  {
    title: '详单记录数',
    dataIndex: 'detailCount',
  },
  {
    title: '总费用',
    dataIndex: 'totalFee',
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

const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

export default () => {
  const [scale, setScale] = useState(1);
  const [report, setReport] = useState([]);

  const handleSubmit = async (values) => {
    console.log(values);
    console.log(values.date.format('x'));
    try {
      const newReport = (await request.get(`/api/report/hotel?scale=${scale}`)).data;
      console.log(newReport);
      for (let r of newReport) {
        r.totalFee = r.totalFee.toFixed(2);
        r.favSpeed = getWindSpeedName(r.favSpeed);
      }
      console.log(newReport);
      setReport(newReport);
      message.success('获取报表成功');
    } catch (e) {
      message.error('获取报表失败');
    }
  };

  return (
    <PageHeaderWrapper>
      <Card bordered={false} style={{ marginBottom: 10 }} id="basicUsage">
        {/* <ProFormRadio.Group
                label=""
                name="invoiceType"
                initialValue="月报表"
                options={['日报表', '普票', '无票']}
              /> */}
        <Form name="time_related_controls" onFinish={handleSubmit}>
          <Form.Item name="scale" label="">
            {/* <Radio.Group onChange={} value={scale}> */}
            <Radio.Group>
              <Radio value={1}>日报表</Radio>
              <Radio value={2}>周报表</Radio>
              <Radio value={3}>月报表</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="date" label="选择日期">
            <DatePicker />
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
