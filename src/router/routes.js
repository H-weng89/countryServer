import Login from '../pages/login/SourceDataDetail.vue'

export default [{
  path: '/',
  name: 'Login',
  component: Login
},
{
  path: '/main',
  component: () => import('../pages/mainPages/SourceDataDetail.vue'),
  children: [{
    path: '/',
    component: () => import('../pages/mainPages/SourceDataList/Home.vue'),
    meta: {
      isKeep: true
    }

  },
  {
    path: 'my',
    component: () => import('../pages/mainPages/SourceDataList/MyPage.vue'),
    meta: {
      isKeep: true
    }
  }
  ],
  meta: {
    isKeep: true
  }

},
{
  path: '/viewWra',
  component: () => import('../layouts/layout.vue'),
  children: [{
    path: 'apply',
    component: () => import('../pages/apply/Apply.vue'),
    meta: {
      title: '用证申请',
      hasCountry: true
    }
  },
  {
    path: 'historyList',
    component: () => import('../pages/historyList/HistoryList.vue'),
    meta: {
      title: '用证记录',

      mark: 'history'
    }
  },
  {
    path: 'applicationList',
    component: () => import('../pages/applicationList/ApplicationList.vue'),
    meta: {
      title: '我的申请',

      mark: 'application'
    }
  },
  {
    path: 'checkList',
    component: () => import('../pages/checkList/CheckList.vue'),
    meta: {
      title: '我的审批',

      mark: 'application'
    }
  },
  {
    path: 'myInfo',
    component: () => import('../pages/myInfo/MyInfo.vue'),
    meta: {
      title: '个人信息'

    }
  },
  {
    path: 'myMessage',
    component: () => import('../pages/myMessage/MyMessage'),
    meta: {
      title: '我的信息'
    }
  },
  {
    path: 'applicationDetail',
    component: () => import('../pages/applicationDetail/ApplicationDetail.vue'),
    meta: {
      title: '申请详情',
      mark: 'application'
    }
  },
  {
    path: 'checkDetail',
    component: () => import('../pages/checkDetail/CheckDetail.vue'),
    meta: {
      title: '申请详情',
      mark: 'application'
    }
  },
  {
    path: 'historyDetail',
    component: () => import('../pages/histroyDetail/HistoryDetail.vue'),
    meta: {
      title: '记录详情',
      mark: 'history'
    }
  }

  ]
}

]
