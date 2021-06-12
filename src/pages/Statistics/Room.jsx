import React, { useState } from 'react';
import { InputNumber, Card, Table, DatePicker, BackTop, Button, Form, message, Radio } from 'antd';
import request from '../../utils/request';
import { getStatus, getWindMode, getWindSpeedName } from '../../utils/utils';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { CreditCardOutlined, NumberOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ChartCard, Bar, Field, MiniArea, MiniBar, MiniProgress } from 'ant-design-pro/lib/Charts';
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

const MONTH_FORMAT = 'YYYY-MM';
const DAY_FORMAT = 'YYYY-MM-DD';

export default () => {
  // const [report, setReport] = useState([]);
  const [fees, setFees] = useState([]);
  const [openCntSum, setOpenCntSum] = useState(0);
  const [openCnts, setOpenCnts] = useState([]);

  const handleSubmit = async (values) => {
    console.log(values);
    console.log(values.date.unix());
    // try {
    const report = (
      await request.get(
        `/api/report_room?timestamp=${values.date.unix()}&span=12&scale=${values.scale}&room_id=${
          values.room_id
        }`,
      )
    ).data;
    console.log(report);
    let newFees = [];
    let newOpenCnts = [];
    let newOpenCntSum = 0;
    for (let key in report) {
      // r.total_fee = r.total_fee.toFixed(2);
      const val = report[key];
      key = parseInt(key);
      const date_formatted = moment.unix(key).format(values.scale == 3 ? MONTH_FORMAT : DAY_FORMAT);
      newFees.push({
        x: `${date_formatted}`,
        y: val.sum_fee,
      });
      newOpenCnts.push({
        x: `${date_formatted}`,
        y: val.open_cnt,
      });
      newOpenCntSum += val.open_cnt;
    }
    setFees(newFees);
    setOpenCnts(newOpenCnts);
    setOpenCntSum(newOpenCntSum);
    console.log(newFees);
    // setReport(newReport);
    message.success('获取报表成功');
    // } catch (e) {
    // message.error('获取报表失败');
    // }
  };

  let salesData = [];
  for (let i = 0; i < 6; i += 1) {
    salesData.push({
      x: `${i + 1}月`,
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }

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


        <Bar style={{ margin: '0 16px' }} height={200} title="消费额总计" data={fees} />

        <ChartCard title="温控请求总次数" total={openCntSum} contentHeight={134}>
          {/* <NumberInfo
          subTitle={<span>本周访问</span>}
          total={numeral(12321).format('0,0')}
          status="up"
          subTotal={17.1}
        /> */}
          <MiniArea line height={45} title="温控请求次数" data={openCnts} />
        </ChartCard>

        {/* <Table style={{ marginTop: 32 }} dataSource={report} columns={columns1} /> */}

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
