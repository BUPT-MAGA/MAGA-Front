export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/settings',
                name: '系统设置',
                icon: 'setting',
                component: '../layouts/BlankLayout',
                routes: [
                    {
                        name: '主控信息',
                        path: '/settings/hostinfo',
                        component: './settings/Hostinfo'
                    },
                    {
                        name: '主控设置',
                        path: '/settings/hostset',
                        component: './settings/Hostset'
                    },
                ]
              },
              {
                path: '/manage',
                name: '用户管理',
                icon: 'user',
                component: '../layouts/BlankLayout',
                routes: [
                    {
                        name: '用户入住',
                        path: '/manage/checkin',
                        component: './Manage/Checkin'
                    },
                    {
                        name: '用户退房',
                        path: '/manage/checkout',
                        component: './Manage/Checkout'
                    },
                    {
                        name: '用户账单',
                        path: '/manage/bill',
                        component: './Manage/Bill'
                    },
                    {
                        name: '住房信息',
                        path: '/manage/room',
                        component: './Manage/Room'
                    }
                ]
              },
              {
                path: '/monitor',
                name: '实时监控',
                icon: 'AreaChartOutlined',
                component: './Monitor',
              },
              {
                path: '/statistics',
                name: '统计报表',
                icon: 'pie-chart',
                component: './Statistics',
              },
              {
                path: '/list',
                name: 'list.table-list',
                icon: 'table',
                component: './TableList',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
