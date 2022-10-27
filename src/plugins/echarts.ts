// 引入echarts
import * as $echarts from 'echarts'
// 引入App类型
import type { App } from 'vue'
// 引入vue-echarts插件
import VueEcharts from 'vue-echarts'
// 注册全局组件
const vueEcharts = (app: App) => {
  app.component('v-chart', VueEcharts)
}
// 暴露echarts对象和全局组件
export {
  $echarts,
  vueEcharts
}