// 引入创建上下文对象的函数
import { createApp } from 'vue'
// 引入pinia
import pinia from './stores'
// 引入elementPlus组件库
import ElementPlus from 'element-plus'
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 引入组件库样式
import 'element-plus/dist/index.css'
// 引入App组件
import App from './App.vue'
// 引入路由器
import router from './router'
// 引入全局样式
import './styles/index.scss'
// 引入图标组件
import ElSvg from './components/SvgIcon/ElSvg'
// 引入路由守卫相关内容
import './permission'
// 引入自定义指令
import has from './directives/has'
// 引入vue-charts数据可视化插件
import { vueEcharts } from './plugins/echarts'
// 引入mockjs
import './mockServer'
// 引入公共组件
import CommonCard from '@/views/home/components/CommonCard.vue'
// 创建上下文实例对象
const app = createApp(App)
// 注册全局的公共组件
app.component(CommonCard.name, CommonCard)
// 使用图标组件
ElSvg(app)
// 挂载
app.use(pinia)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(has)
  .use(vueEcharts)
  .mount('#app')
