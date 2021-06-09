import React, { useState } from 'react';
import { Card, Table, BackTop, Radio, Form, Switch, InputNumber, Row, Col } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import ProCard from '@ant-design/pro-card';
import styles from './index.less';
import logo from '../../assets/logo-full.png';

const columns1 = [
  {
    title: '温控模式',
    dataIndex: 'mode',
    key: 'mode',
  },
  {
    title: '缺省温度',
    dataIndex: 'temperature',
    key: 'temperature',
  },
  {
    title: '高风费率',
    dataIndex: 'costhigh',
    key: 'costhigh',
  },
  {
    title: '中风费率',
    dataIndex: 'costmid',
    key: 'costmid',
  },
  {
    title: '低风费率',
    dataIndex: 'costlow',
    key: 'costlow',
  },
  {
    title: '服务对象个数',
    dataIndex: 'service',
    key: 'service',
  },
];

const data1 = [
  {
    key: '1',
    mode: '制冷（18-26度）',
    temperature: 26,
    costhigh: 3,
    costmid: 2,
    costlow: 1,
    service: 3,
  },
];

const onFormLayoutChange = async (values) => {
  console.log(values);
};

const onTemperatureChange = async (value) => {
  console.log(value);
};

export default () => {
  // const intl = useIntl();
  const [mode, setMode] = useState(0);
  const [temperature, setTemerature] = useState(20);

  return (
    <PageHeaderWrapper>
      <ProCard style={{ marginTop: 8 }} gutter={8} ghost layout="center">
        <ProCard colSpan="50%" layout="center" bordered>
          <ProCard colSpan="60%">
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
            </Link>
          </ProCard>
          <ProCard>
            <Row>
              <span className={styles.title}>MAGA</span>
            </Row>
            <Row>
              <FormattedMessage
                id="pages.layouts.userLayout.title"
                defaultMessage="MAGA: Make Aircon Great Again"
              />
            </Row>
          </ProCard>
        </ProCard>
        <ProCard layout="center" bordered>
          <Form layout="horizontal" onValuesChange={onFormLayoutChange}>
            <Form.Item name="switch" label="系统开关" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="mode" label="温控模式">
              <Radio.Group value={mode}>
                <Radio.Button value={0}>供暖</Radio.Button>
                <Radio.Button value={1}>制冷</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="temperature" label="缺省温度">
              <InputNumber
                min={18}
                max={30}
                value={temperature}
                onChange={onTemperatureChange}
                formatter={(value) => `${value}°C`}
                parser={(value) => value.replace('°C', '')}
              />
            </Form.Item>
            <Form.Item name="fee" label="计费标准">
              <InputNumber
                min={18}
                max={30}
                value={temperature}
                onChange={onTemperatureChange}
                formatter={(value) => `${value}元`}
                parser={(value) => value.replace('元', '')}
              />
            </Form.Item>
            <Form.Item name="slaveCount" label="从机数量">
              <InputNumber
                min={18}
                max={30}
                value={temperature}
                onChange={onTemperatureChange}
                formatter={(value) => `${value}台`}
                parser={(value) => value.replace('台', '')}
              />
            </Form.Item>
          </Form>
        </ProCard>
      </ProCard>
    </PageHeaderWrapper>
  );
};
