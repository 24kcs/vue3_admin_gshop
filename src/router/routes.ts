// 路由对象的类型
import type { RouteRecordRaw } from 'vue-router';
/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      hidden：        是否隐藏此路由
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

/**
 * 静态路由（默认路由/常量路由）
 */
export const staticRoutes: Array<RouteRecordRaw> = [
  // 登录Login的路由
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  // 注册404的路由
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true
    }
  },
  // 注册首页的路由
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '首页',
        icon: 'ele-HomeFilled',
      }
    }]
  }
];
/**
 * 定义动态路由
 */
export const allAsyncRoutes: Array<RouteRecordRaw> = [
  // 权限管理路由
  {
    name: 'Acl',
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    redirect: '/acl/user/list',
    meta: { title: '权限管理', icon: 'ele-Setting' },
    children: [
      {
        name: 'User',
        path: '/acl/user/list',
        component: () => import('@/views/acl/user/index.vue'),
        meta: { title: '用户管理' }
      },
      {
        name: 'Role',
        path: '/acl/role/list',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
        },
      },
      {
        name: 'RoleAuth',
        path: '/acl/role/auth',
        component: () => import('@/views/acl/role/roleAuth.vue'),
        meta: {
          title: '角色管理',
          hidden: true,
          activeMenu: '/acl/role/list',
        },
      },
      {
        name: 'Permission',
        path: '/acl/permission/list',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
        }
      }
    ]
  },

  // 注册商品管理路由
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/layout/index.vue'),
    redirect: '/product/category/list',
    meta: {
      title: '商品管理',
      icon: 'ele-ShoppingBag',
    },
    children: [
      {
        path: 'category/list',
        name: 'Category',
        component: () => import('@/views/product/category/index.vue'),
        meta: { title: '分类管理' }
      },
      {
        path: 'trademark/list',
        name: 'Trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: { title: '品牌管理' }
      },
      {
        path: 'attr/list',
        name: 'Attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: { title: '平台属性管理' }
      },
      {
        path: 'spu/list',
        name: 'Spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: { title: 'SPU管理' }
      },
      {
        path: 'sku/list',
        name: 'Sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: { title: 'SKU管理' }
      }
    ]
  },
  // Test管理
  {
    name: 'Test',
    path: '/test',
    component: () => import('@/layout/index.vue'),
    redirect: '/test/test1/list', // 重新定向,
    meta: {
      title: 'Test管理',
      icon: 'ele-Setting'
    },
    children: [
      {
        name: 'test1',
        path: '/test/test1/list',
        component: () => import('@/views/test/test1/index.vue'),
        meta: { title: 'Test1' }
      },
      {
        name: 'test2',
        path: '/test/test2/list',
        component: () => import('@/views/test/test2/index.vue'),
        meta: { title: 'Test2' }
      },
    ]
  }

];
/* 匹配任意的路由 必须最后注册 */
export const anyRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)',
  name: 'Any',
  redirect: '/404',
  meta: {
    hidden: true
  }
}