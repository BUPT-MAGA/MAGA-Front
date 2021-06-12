import React, { useState, useEffect } from 'react';
import { Card, Table, BackTop, Radio, Form, Switch, InputNumber, Row, Col, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import ProCard from '@ant-design/pro-card';
import styles from './index.less';
import logo from '../../assets/logo-full.png';
import request from '../../utils/request';

class Settings extends React.Component {
  // const intl = useIntl();
  state = {
    switch: true,
    mode: 2,
    temp: 99,
    fee: 100,
    slave: 100,
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  onSwitchChange = async (value) => {
    console.log(value);
    const target = value === true ? 2 : 1;
    const MSG = value === true ? '启动成功！' : '关闭成功！';
    request
      .get(`/api/settings/switch?action=${target}`)
      .then((response) => {
        console.log(response), message.success(MSG);
      })
      .catch((err) => {
        this.componentDidMount();
        console.log(err.response), message.error('操作失败！');
      });
  };

  onModeChange = async (value) => {
    const target = value.target.value;
    const MSG = target === 1 ? '供暖模式启动' : '制冷模式启动！';
    request
      .get(`/api/settings/mode?mode=${target}`)
      .then((response) => {
        console.log(response), message.success(MSG);
      })
      .catch((err) => {
        this.componentDidMount();
        console.log(err.response), message.error('切换失败！');
      });
  };

  onTempChange = async (value) => {
    const MSG = `默认温度：${value}°C`;
    request
      .get(`/api/settings/temp?temp=${value}`)
      .then((response) => {
        console.log(response), message.success(MSG);
      })
      .catch((err) => {
        this.componentDidMount();
        console.log(err.response), message.error('错误温度范围！');
      });
  };

  onFeeChange = async (value) => {
    console.log(value);
    const MSG = `计费标准：${value}元`;
    request
      .get(`/api/settings/fee?fee=${value}`)
      .then((response) => {
        console.log(response), message.success(MSG);
      })
      .catch((err) => {
        this.componentDidMount();
        console.log(err.response), message.error('范围错误！');
      });
  };

  onSlaveChange = async (value) => {
    console.log(value);
    const MSG = `从机数量：${value}台`;
    request
      .get(`/api/settings/slave?slave=${value}`)
      .then((response) => {
        console.log(response), message.success(MSG);
      })
      .catch((err) => {
        this.componentDidMount();
        console.log(err.response), message.error('范围错误！');
      });
  };

  async componentDidMount() {
    const initData = (await request.get('/api/settings/init')).data;
    console.log('init values');
    console.log(initData);
    this.setState(initData, () => {
      this.formRef.current.setFieldsValue({
        switch: this.state.switch,
        mode: this.state.mode,
        temp: this.state.temp,
        fee: this.state.fee,
        slave: this.state.slave,
      });
    });
    console.log(this.state);
  }

  render() {
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
            <Form
              layout="horizontal"
              initialValues={{
                switch: this.state.switch,
                mode: this.state.mode,
                temp: this.state.temp,
                fee: this.state.fee,
                slave: this.state.slave,
              }}
              ref={this.formRef} //这里注册一下ref
            >
              <Form.Item name="switch" label="系统开关">
                <Switch onChange={this.onSwitchChange} />
              </Form.Item>
              <Form.Item name="mode" label="温控模式">
                <Radio.Group onChange={this.onModeChange}>
                  <Radio value={0}>供暖</Radio>
                  <Radio value={1}>制冷</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="temp" label="缺省温度">
                <InputNumber
                  min={18}
                  max={30}
                  onChange={this.onTempChange}
                  formatter={(value) => `${value}°C`}
                  parser={(value) => value.replace('°C', '')}
                />
              </Form.Item>
              <Form.Item name="fee" label="计费标准">
                <InputNumber
                  min={1}
                  max={100}
                  onChange={this.onFeeChange}
                  formatter={(value) => `${value}元`}
                  parser={(value) => value.replace('元', '')}
                />
              </Form.Item>
              <Form.Item name="slave" label="从机数量">
                <InputNumber
                  min={1}
                  max={100}
                  onChange={this.onSlaveChange}
                  formatter={(value) => `${value}台`}
                  parser={(value) => value.replace('台', '')}
                />
              </Form.Item>
            </Form>
          </ProCard>
        </ProCard>
      </PageHeaderWrapper>
    );
  }
}

export default Settings;
