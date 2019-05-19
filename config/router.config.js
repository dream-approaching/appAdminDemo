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
        path: '/androidPlatform',
        name: 'Android客户端',
        icon: 'android',
        routes: [
          {
            path: '/androidPlatform/banner',
            name: 'Banner',
            component: './androidPlatform/banner/banner',
          },
          {
            path: '/androidPlatform/searchEngine',
            name: '搜索引擎',
            component: './androidPlatform/searchEngine/searchEngine',
          },
          {
            path: '/androidPlatform/startupAd',
            name: '启动页广告',
            component: './androidPlatform/startupAd/startupAd',
          },
          {
            path: '/androidPlatform/hotSite',
            name: '热门站点',
            component: './androidPlatform/hotSite/hotSite',
          },
          {
            path: '/androidPlatform/recommendSite',
            name: '推荐网址',
            component: './androidPlatform/recommendSite/recommendSite',
          },
          {
            path: '/androidPlatform/selfUpgrade',
            name: '自升级',
            component: './androidPlatform/selfUpgrade/selfUpgrade',
          },
          {
            path: '/androidPlatform/apiVersion',
            name: '接口数据版本',
            component: './androidPlatform/apiVersion/apiVersion',
          },
          {
            path: '/androidPlatform/androidVersion',
            name: '安卓版本',
            component: './androidPlatform/androidVersion/androidVersion',
          },
          {
            path: '/androidPlatform/bookmark',
            name: '右屏书签',
            component: './androidPlatform/bookmark/bookmark',
          },
          {
            path: '/androidPlatform/kindsSite',
            name: '分类站点',
            component: './androidPlatform/kindsSite/kindsSite',
          },
          {
            path: '/androidPlatform/homepageSite',
            name: '主页站点',
            component: './androidPlatform/homepageSite/homepageSite',
          },
          {
            path: '/androidPlatform/landscapeSite',
            name: '布景站点',
            component: './androidPlatform/landscapeSite/landscapeSite',
          },
          {
            path: '/androidPlatform/hotUpdate',
            name: '热更新',
            component: './androidPlatform/hotUpdate/hotUpdate',
          },
        ],
      },
      {
        path: '/iosPlatform',
        name: 'IOS客户端',
        icon: 'apple',
        routes: [
          {
            path: '/iosPlatform/banner',
            name: 'Banner',
            component: './iosPlatform/banner/banner',
          },
          {
            path: '/iosPlatform/searchEngine',
            name: '搜索引擎',
            component: './iosPlatform/searchEngine/searchEngine',
          },
          {
            path: '/iosPlatform/startupAd',
            name: '启动页广告',
            component: './iosPlatform/startupAd/startupAd',
          },
          {
            path: '/iosPlatform/hotSite',
            name: '热门站点',
            component: './iosPlatform/hotSite/hotSite',
          },
          {
            path: '/iosPlatform/recommendSite',
            name: '推荐网址',
            component: './iosPlatform/recommendSite/recommendSite',
          },
          {
            path: '/iosPlatform/selfUpgrade',
            name: '自升级',
            component: './iosPlatform/selfUpgrade/selfUpgrade',
          },
          {
            path: '/iosPlatform/apiVersion',
            name: '接口数据版本',
            component: './iosPlatform/apiVersion/apiVersion',
          },
          {
            path: '/iosPlatform/iosVersion',
            name: 'IOS版本',
            component: './iosPlatform/iosVersion/iosVersion',
          },
          {
            path: '/iosPlatform/bookmark',
            name: '右屏书签',
            component: './iosPlatform/bookmark/bookmark',
          },
          {
            path: '/iosPlatform/kindsSite',
            name: '分类站点',
            component: './iosPlatform/kindsSite/kindsSite',
          },
        ],
      },
      {
        path: '/h5Website',
        name: 'H5 导航网站',
        icon: 'mobile',
        routes: [
          {
            path: '/h5Website/banner',
            name: 'Banner',
            component: './h5Website/banner/banner',
          },
          {
            path: '/h5Website/searchEngine',
            name: '搜索引擎',
            component: './h5Website/searchEngine/searchEngine',
          },
          {
            path: '/h5Website/hotSite',
            name: '热门站点',
            component: './h5Website/hotSite/hotSite',
          },
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
          {
            path: '/h5Website/shortVideo',
            name: '短视频',
            component: './h5Website/shortVideo/shortVideo',
          },
        ],
      },
      {
        path: '/pcWebsite',
        name: 'PC 导航网站',
        icon: 'desktop',
        routes: [
          {
            path: '/pcWebsite/banner',
            name: 'Banner',
            component: './pcWebsite/banner/banner',
          },
          {
            path: '/pcWebsite/searchEngine',
            name: '搜索引擎',
            component: './pcWebsite/searchEngine/searchEngine',
          },
          {
            path: '/pcWebsite/hotSite',
            name: '热门站点',
            component: './pcWebsite/hotSite/hotSite',
          },
          {
            path: '/pcWebsite/kindsSite',
            name: '分类网址',
            component: '../components/PageComponent/KindsSites',
            routes: [
              {
                path: '/pcWebsite/kindsSite',
                redirect: '/pcWebsite/kindsSite/gradeOne',
              },
              {
                path: '/pcWebsite/kindsSite/gradeOne',
                name: '一级分类',
                component: './pcWebsite/kindsSite/gradeOne',
              },
              {
                path: '/pcWebsite/kindsSite/gradeTwo',
                name: '二级分类',
                component: './pcWebsite/kindsSite/gradeTwo',
              },
              {
                path: '/pcWebsite/kindsSite/gradeThree',
                name: '三级分类',
                component: './pcWebsite/kindsSite/gradeThree',
              },
            ],
          },
        ],
      },
      {
        path: '/generalSetting',
        name: '公共管理',
        icon: 'setting',
        routes: [
          {
            path: '/generalSetting/hotWords',
            name: '热词',
            component: './generalSetting/hotWords/hotWords',
          },
          {
            path: '/generalSetting/keyword',
            name: '关键词联想',
            component: './generalSetting/keyword/keyword',
          },
          {
            path: '/generalSetting/channel',
            name: '渠道',
            component: './generalSetting/channel/channel',
          },
          {
            path: '/generalSetting/information',
            name: '资讯频道',
            component: './generalSetting/information/information',
          },
          {
            path: '/generalSetting/switchAndroid',
            name: '开关(Android)',
            component: './generalSetting/switchAndroid/switchAndroid',
          },
          {
            path: '/generalSetting/switchIos',
            name: '开关(IOS)',
            component: './generalSetting/switchIos/switchIos',
          },
          {
            path: '/generalSetting/switchSimple',
            name: '开关(极简)',
            component: './generalSetting/switchSimple/switchSimple',
          },
          {
            path: '/generalSetting/configuration',
            name: '配置项',
            component: './generalSetting/configuration/configuration',
          },
          {
            path: '/generalSetting/messagePush',
            name: '消息推送',
            component: './generalSetting/messagePush/messagePush',
          },
          {
            path: '/generalSetting/browerManage',
            name: '浏览器管理',
            component: './generalSetting/browerManage/browerManage',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
