import React from 'react';
import { Card, Table, BackTop } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from '../../utils/request';

const columns1 = [
  {
    title: '房间号',
    dataIndex: 'room_id',
  },
  {
    title: '入住状态',
    dataIndex: 'status',
  },
  {
    title: '住户身份证',
    dataIndex: 'user_id',
  },
];

class TableDemo extends React.Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    try {
      const data = (await request.get('/api/room_info')).data;
      console.log(data);
      this.setState({
        data: data,
      });
    } catch (e) {}
  }

  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false} title="" style={{ marginBottom: 10 }} id="basicUsage">
          <Table dataSource={this.state.data} columns={columns1} />
        </Card>
        <BackTop visibilityHeight={200} style={{ right: 50 }} />
      </PageHeaderWrapper>

      // <div>
      //   <CustomBreadcrumb arr={['用户管理', '住房信息']} />
      //   <Card
      //     title="住房信息"
      //     style={{ marginBottom: 10 }}
      //     id="roominfo"
      //   >
      //     <Table
      //       dataSource={this.state.data}
      //       columns={columns1}
      //     />
      //   </Card>
      //   <BackTop visibilityHeight={200} style={{ right: 50 }} />
      // </div>
    );
  }
}

export default TableDemo;
