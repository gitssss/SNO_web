import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },

  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: 'F5负载均衡'
    },
    component: Main,
    children: [
      {
        path: 'monitor1',
        name: 'monitor1',
        meta: {
          icon: 'md-git-branch',
          title: '性能监控1'
        },
        component: () => import('@/view/components/monitor/index1.vue')
      },
      // {
      //   path: 'monitor2',
      //   name: 'monitor2',
      //   meta: {
      //     icon: 'md-git-branch',
      //     title: '性能监控2'
      //   },
      //   component: () => import('@/view/components/monitor/index2.vue')
      // },
      // {
      //   path: 'alert',
      //   name: 'alert',
      //   meta: {
      //     icon: 'md-git-branch',
      //     title: '告警列表'
      //   },
      //   component: () => import('@/view/components/alert/index.vue')
      // },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      }
    ]
  },
  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据上传'
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/update/update-table.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      icon: 'ios-stats',
      title: 'EXCEL导入导出'
    },
    component: Main,
    children: [
      {
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/view/excel/upload-excel.vue')
      },
      {
        path: 'export-excel',
        name: 'export-excel',
        meta: {
          icon: 'md-download',
          title: '导出EXCEL'
        },
        component: () => import('@/view/excel/export-excel.vue')
      }
    ]
  },
  {
    path: '',
    name: '',
    meta: {
      icon: 'ios-keypad',
      title: '网络拓扑'
    },
    component: Main,
    children: [
      {
        path: '/topology',
        name: 'topology',
        meta: {
          icon: 'ios-keypad',
          title: '骨干网'
        },
        component: () => import('@/view/cmb-topology/cmb-topology.vue')
      },
      {
        path: '/level-1-1',
        name: 'level-1-1',
        meta: {
          icon: 'ios-keypad',
          title: '深圳数据中心'
        },
        component: () => import('@/view/cmb-topology/level-1-1.vue')
      },
      {
        path: '/level-1-2',
        name: 'level-1-2',
        meta: {
          icon: 'ios-keypad',
          title: '上海数据中心'
        },
        component: () => import('@/view/cmb-topology/level-1-2.vue')
      },
      {
        path: '',
        name: '',
        meta: {
          access: ['super_admin'],
          icon: 'ios-keypad',
          showAlways: true,
          title: '第二层'
        },
        component: parentView,
        children: [
          {
            path: '/level-2-sz-op',
            name: 'level-2-sz-op',
            meta: {
              icon: 'ios-keypad',
              title: '深圳-OP'
            },
            component: () => import('@/view/cmb-topology/level-2-sz-op.vue')
          },
          {
            path: '/level-2-sh-op',
            name: 'level-2-sh-op',
            meta: {
              icon: 'ios-keypad',
              title: '上海-OP'
            },
            component: () => import('@/view/cmb-topology/level-2-sh-op.vue')
          },
          {
            path: '/level-2-outreach',
            name: 'level-2-outreach',
            meta: {
              icon: 'ios-keypad',
              title: '外联拓扑'
            },
            component: () => import('@/view/cmb-topology/level-2-outreach.vue')
          }
        ]
      }
    ]
  },
  
  {
    path: '/level-1-2',
    name: 'level-1-2',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/cmb-topology/level-1-2.vue')
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
