import React, { useState } from 'react';
import { Card, Table, BackTop, Button, Form, message, Radio } from 'antd';
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

export default () => {
  const [scale, setScale] = useState(1);
  const [report, setReport] = useState([]);

  const handleSubmit = async (e) => {
    setScale(e.target.value);
    try {
      const newReport = (await request.get(`/api/report/room?scale=${scale}`)).data;
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
        <Form.Item name="radio-group" label="">
          <Radio.Group onChange={handleSubmit} value={scale}>
            <Radio value={1}>日报表</Radio>
            <Radio value={2}>周报表</Radio>
            <Radio value={3}>月报表</Radio>
          </Radio.Group>
        </Form.Item>
        <Table dataSource={report} columns={columns1} />
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
