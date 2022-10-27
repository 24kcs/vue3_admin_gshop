<template>
  <common-card title="今日订单" :value="numberFormat(orderToday)">
    <div style="width:100%;height:100%" ref="chartRef"></div>
    <!-- <template v-slot:bottom> -->
    <template #bottom>
      <span>昨日订单量</span>
      <span class="number">{{moneyFormat(orderLastDay)}}</span>
    </template>
  </common-card>
</template>
<script lang="ts">
export default {
  name: 'TodayOrders'
}
</script>
<script lang="ts" setup>
import { useDataStore } from '@/stores/reportData'
import useFormat from '@/hooks/useFormat'
import { computed, ref, onMounted, watch } from 'vue'
// 引入echarts对象
import { $echarts } from '@/plugins/echarts'
// echarts实例对象类型
import type { EChartsType } from 'echarts'
// 获取仓库对象
const dataStore = useDataStore()
// 获取格式化数据的方法
const { numberFormat, moneyFormat } = useFormat()
const orderToday = computed(() => dataStore.reportData.orderToday) // 今日订单
const orderLastDay = computed(() => dataStore.reportData.orderLastDay) // 昨日订单量
const orderTrend = computed(() => dataStore.reportData.orderTrend || []) // 实时订单量数据
const orderTrendAxis = computed(() => dataStore.reportData.orderTrendAxis || []) // 实时订单量的横轴数据
// 用来收集div图表容器对象的
const chartRef = ref()
// 创建echarts对象实例
let chart: EChartsType
const getOption = () => {
  return {
    // 横轴
    xAxis: {
      data: orderTrendAxis.value, //x轴所需要的数据
      boundaryGap: false // 两边没有留白
    },
    // 纵轴
    yAxis: { show: false }, // 不显示y轴的刻度
    // 系列组件
    series: [
      {
        name: '实时订单量', // tooltip中需要显示的
        type: 'line', // 线性图
        data: orderTrend.value,
        areaStyle: { color: 'purple' }, // 区域的颜色
        lineStyle: { opacity: 0 }, // 线条样式,设置为透明
        itemStyle: { opacity: 0 }, // 折线拐点的样式,设置为透明
        smooth: true // 平滑曲线显示
      }
    ],
    // 提示框组件
    tooltip: { trigger: 'axis', confine: true }, // 触发的时机和限制提示框在图表中
    // 四周的距离
    grid: { left: 0, top: 0, right: 0, bottom: 0 }
  }
}
// 界面挂载完毕
onMounted(() => {
  chart = $echarts.init(chartRef.value)
  // 进行配置
  chart.setOption(getOption())

  // 页面挂载完毕后,绑定一个窗口大小改变的事件
  window.addEventListener('resize', () => {
    chart && chart.resize()
  })
})
// 监视
watch(orderToday, () => {
  // 如果数据变化了,重新的绘制图表
  chart.setOption(getOption())
})
</script>
<style lang="scss" scoped>
</style>