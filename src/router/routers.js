import Main from '@/components/main'

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
    path: '/dashboard',
    name: 'nav_dashboard',
    component: Main,
    meta: {
      hideInBread: true,
      title: '管理中心'
    },
    children: [
      {
        path: 'index',
        name: 'nav_dashboard_index',
        meta: {
          icon: 'md-globe',
          title: '管理中心'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/profile',
    name: 'nav_profile',
    component: Main,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: 'index',
        name: 'nav_profile_index',
        meta: {
          icon: 'md-person',
          title: '个人资料'
        },
        component: () => import('@/view/admin-user/profile.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/emporium',
    name: 'nav_emporium',
    meta: {
      icon: 'ios-leaf',
      title: '百货商场'
    },
    component: Main,
    children: [
      {
        path: 'emporiums',
        name: 'nav_emporium_list',
        meta: {
          icon: 'ios-keypad',
          title: '商场列表'
        },
        component: () => import('@/view/emporium/list.vue')
      },
      {
        path: 'merchants',
        name: 'nav_merchant_list',
        meta: {
          icon: 'logo-buffer',
          title: '商家列表'
        },
        component: () => import('@/view/emporium/merchants.vue')
      }
    ]
  },
  {
    path: '/product',
    name: 'nav_product',
    meta: {
      icon: 'ios-basket',
      title: '产品管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'nav_product_list',
        meta: {
          icon: 'ios-shirt',
          title: '商品列表'
        },
        component: () => import('@/view/product/list.vue')
      },
      {
        path: 'type_list',
        name: 'nav_product_type',
        meta: {
          icon: 'ios-color-filter',
          title: '商品类型'
        },
        component: () => import('@/view/product-type/list.vue')
      },
      {
        path: 'add',
        name: 'nav_product_add',
        meta: {
          hideInMenu: true,
          icon: 'md-add',
          title: '添加商品'
        },
        component: () => import('@/view/product/add.vue')
      },
      {
        path: 'edit',
        name: 'nav_product_edit',
        meta: {
          hideInMenu: true,
          icon: 'md-edit',
          title: '编辑商品'
        },
        component: () => import('@/view/product/edit.vue')
      },
      {
        path: 'attr_list',
        name: 'nav_attributes',
        meta: {
          hideInMenu: true,
          icon: 'md-add',
          title: '商品属性'
        },
        component: () => import('@/view/attribute/list.vue')
      },
      {
        path: 'attr_add',
        name: 'nav_attr_add',
        meta: {
          hideInMenu: true,
          icon: 'md-add',
          title: '添加属性'
        },
        component: () => import('@/view/attribute/add.vue')
      },
      {
        path: 'attr_edit',
        name: 'nav_attr_edit',
        meta: {
          hideInMenu: true,
          icon: 'md-add',
          title: '更新属性'
        },
        component: () => import('@/view/attribute/edit.vue')
      }
    ]
  },
  {
    path: '/members',
    name: 'nav_members',
    meta: {
      icon: 'ios-people',
      title: '会员管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'nav_member_list',
        meta: {
          icon: 'md-people',
          title: '会员列表'
        },
        component: () => import('@/view/member/list.vue')
      },
      {
        path: '/account',
        name: 'nav_member_acc',
        meta: {
          icon: 'md-card',
          title: '会员帐户'
        },
        component: () => import('@/view/member/list.vue')
      }
    ]
  },
  {
    path: '/content',
    name: 'nav_content',
    meta: {
      icon: 'ios-paper',
      title: '内容管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'nav_article_list',
        meta: {
          icon: 'ios-document',
          title: '文章列表'
        },
        component: () => import('@/view/content/article_list.vue')
      },
      {
        path: 'article_add',
        name: 'nav_article_add',
        meta: {
          hideInMenu: true,
          icon: 'md-add',
          title: '发布文章'
        },
        component: () => import('@/view/content/article_add.vue')
      },
      {
        path: 'article_edit',
        name: 'nav_article_edit',
        meta: {
          hideInMenu: true,
          icon: 'ios-create',
          title: '编辑文章'
        },
        component: () => import('@/view/content/article_edit.vue')
      },
      {
        path: 'category',
        name: 'nav_cates',
        meta: {
          icon: 'ios-cube',
          title: '分类列表'
        },
        component: () => import('@/view/content/article_cats.vue')
      }
    ]
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
