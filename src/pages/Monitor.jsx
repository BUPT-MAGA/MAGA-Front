import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Spin, Table, BackTop, message, Slider, InputNumber } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from '../utils/request';
import { getStatus, getWindSpeedName } from '../utils/utils';
import { ProFormSlider } from '@ant-design/pro-form';

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
    title: '模式',
    dataIndex: 'wind_mode',
  },
  {
    title: '风速',
    dataIndex: 'wind_speed',
  },
  {
    title: '当前温度',
    dataIndex: 'current_temp',
  },
  {
    title: '目标温度',
    dataIndex: 'target_temp',
  },
];

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default () => {
  const [data, setData] = useState([]);
  const [refreshRate, setRefreshRate] = useState(4000);
  const [loading, setLoading] = useState(false);

  useInterval(() => {
    updateInfo();
    console.log('refreshing...');
  }, refreshRate);

  const updateInfo = async () => {
    setLoading(true);
    try {
      let newData = (await request.get('/api/room_status')).data;
      console.log(newData);
      for (let r of newData) {
        r.wind_speed = getWindSpeedName(r.wind_speed);
        r.status = getStatus(r.status);
        r.wind_mode = getWindSpeedName(r.wind_mode);
        r.current_temp = r.current_temp.toFixed(1) + '°C';
        r.target_temp = r.target_temp.toFixed(1) + '°C';
      }
      setData(newData);
    } catch (e) {
      message.error('刷新失败');
    }
    await timeout(500);
    setLoading(false);
  };

  const onSlideChange = (value) => {
    console.log(value);
    setRefreshRate(value * 1000);
  };

  return (
    <PageHeaderWrapper>
      <Col span={1}>刷新频率</Col>
      <Row>
        <Col span={6}>
          <Slider
            min={0.5}
            max={60}
            value={refreshRate / 1000}
            onChange={onSlideChange}
            marks={{
              1: '1s',
              60: '60s',
            }}
          />
        </Col>
        <Col span={2}>
          <InputNumber
            min={0.5}
            max={60}
            style={{ margin: '0 16px' }}
            value={refreshRate / 1000}
            onChange={onSlideChange}
            formatter={(value) => `${value}s`}
            parser={(value) => value.replace('s', '')}
          />
        </Col>
        <Col span={1}>
          <Spin spinning={loading} tip="Loading..." />
        </Col>
      </Row>
      <Table dataSource={data} columns={columns1} style={{ marginTop: 32 }} />
      <BackTop visibilityHeight={200} style={{ right: 50 }} />
    </PageHeaderWrapper>
  );
};
