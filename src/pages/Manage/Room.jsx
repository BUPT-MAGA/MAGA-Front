import React from 'react';
import { Card, Table, BackTop } from 'antd';
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index';
import request from '../../utils/request';

const columns1 = [
  {
    title: '房间号',
    dataIndex: 'roomId',
  },
  {
    title: '入住状态',
    dataIndex: 'active',
  },
  {
    title: '住户身份证',
    dataIndex: 'username',
  },
];

class TableDemo extends React.Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    try {
      const data = (await request.get('/api/checkin')).data;
      console.log(data);
      this.setState({
        data: data,
      });
    } catch (e) {}
  }

  render() {
    return (
      <div>
        <CustomBreadcrumb arr={['用户管理', '住房信息']} />
        <Card
          //   bordered={false}
          title="住房信息"
          style={{ marginBottom: 10 }}
          id="roominfo"
        >
          <Table
            dataSource={this.state.data}
            columns={columns1}
            // style={styles.tableStyle}
          />
        </Card>
        <BackTop visibilityHeight={200} style={{ right: 50 }} />
      </div>
    );
  }
}

export default TableDemo;
