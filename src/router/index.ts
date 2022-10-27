// 引入创建路由器对象的函数和 模式的函数
import { createRouter, createWebHistory } from 'vue-router';
// 引入路由对象数组
import { staticRoutes } from '@/router/routes';
// 创建路由器对象
const router = createRouter({
  history: createWebHistory(), // history模式
  routes: staticRoutes, // 路由数组
  scrollBehavior() { // 滚动的位置
    return { top: 0, left: 0 }
  },
})

// 导出路由
export default router;