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
        routes: [
          {
            path: '/login',
            redirect: 'user/login',
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
                    name: 'checkin',
                    path: '/manage/checkin',
                    component: './Manage/checkin',
                  },
                  {
                    name: 'checkout',
                    path: '/manage/checkout',
                    component: './Manage/checkout',
                  },
                  {
                    name: 'bill',
                    path: '/manage/bill',
                    component: './Manage/bill',
                  },
                  {
                    name: 'room',
                    path: '/manage/room',
                    component: './Manage/room',
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
                    name: 'hotel',
                    path: '/statistics/hotel',
                    component: './Statistics/hotel',
                  },
                  {
                    name: 'room',
                    path: '/statistics/room',
                    component: './Statistics/room',
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
