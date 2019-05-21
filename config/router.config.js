export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/iosPlatform/banner', authority: ['admin', 'user'] },
      {
        path: '/explore/explore',
        name: '探索',
        authority: ['admin', 'user'],
        component: './explore/explore',
      },
      {
        path: '/androidPlatform',
        name: 'Android客户端',
        icon: 'android',
        routes: [
          {
            path: '/androidPlatform/banner',
            name: 'Banner',
            component: './androidPlatform/banner/banner',
          },
        ],
      },
      {
        path: '/h5Website',
        name: 'H5 导航网站',
        icon: 'mobile',
        routes: [
          {
            path: '/h5Website/kindsSite',
            name: '分类网址',
            component: '../components/PageComponent/KindsSites',
            routes: [
              {
                path: '/h5Website/kindsSite',
                redirect: '/h5Website/kindsSite/gradeOne',
              },
              {
                path: '/h5Website/kindsSite/gradeOne',
                name: '一级分类',
                component: './h5Website/kindsSite/gradeOne',
              },
              {
                path: '/h5Website/kindsSite/gradeTwo',
                name: '二级分类',
                component: './h5Website/kindsSite/gradeTwo',
              },
              {
                path: '/h5Website/kindsSite/gradeThree',
                name: '三级分类',
                component: './h5Website/kindsSite/gradeThree',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
