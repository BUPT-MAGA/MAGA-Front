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
        redirect: '/user/login',
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
              // {
              // path: '/',
              // redirect: '/settings',
              // },
              //   {
              //     path: '/list',
              //     name: 'list.table-list',
              //     icon: 'table',
              //     component: './TableList',
              //   },
              {
                path: '/settings',
                name: 'settings',
                icon: 'setting',
                component: './settings',
              },
              {
                path: '/manage',
                name: 'manage',
                icon: 'user',
                component: '../layouts/BlankLayout',
                routes: [
                  {
                    name: '用户入住',
                    path: '/manage/checkin',
                    component: './Manage/Checkin',
                  },
                  {
                    name: '用户退房',
                    path: '/manage/checkout',
                    component: './Manage/Checkout',
                  },
                  {
                    name: '用户账单',
                    path: '/manage/bill',
                    component: './Manage/Bill',
                  },
                  {
                    name: '住房信息',
                    path: '/manage/room',
                    component: './Manage/Room',
                  },
                ],
              },
              {
                path: '/monitor',
                name: 'monitor',
                icon: 'AreaChartOutlined',
                component: './Monitor',
              },
              {
                path: '/statistics',
                name: 'report',
                icon: 'pie-chart',
                component: '../layouts/BlankLayout',
                routes: [
                  {
                    name: '酒店报表',
                    path: '/statistics/hotel',
                    component: './Statistics/Hotel',
                  },
                  {
                    name: '房间报表',
                    path: '/statistics/room',
                    component: './Statistics/Room',
                  },
                ],
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
