<template>
  <common-card title="今日交易用户数" :value="numberFormat(orderUser)">
    <v-chart :option="getOption()" autoresize></v-chart>
    <template #bottom>
      <span>退货率</span>
      <span class="number">{{returnRate}}%</span>
    </template>
  </common-card>
</template>
<script lang="ts">
export default {
  name: 'TodayUsers'
}
</script>
<script lang="ts" setup>
import { useDataStore } from '@/stores/reportData'
import useFormat from '@/hooks/useFormat'
import { computed } from 'vue'
// 获取仓库对象
const dataStore = useDataStore()
// 获取格式化数据的方法
const { numberFormat, moneyFormat } = useFormat()
const orderUser = computed(() => dataStore.reportData.orderUser) // 今日交易用户数
const returnRate = computed(() => dataStore.reportData.returnRate) // 退货率
const orderUserTrend = computed(() => dataStore.reportData.orderUserTrend || []) // 实时交易量
const orderUserTrendAxis = computed(
  () => dataStore.reportData.orderUserTrendAxis || []
) // 横轴数据

const getOption = () => {
  return {
    // 横轴
    xAxis: {
      data: orderUserTrendAxis.value
    },
    // 纵轴
    yAxis: { show: false },
    // 系列组件
    series: {
      name: '实时交易量',
      type: 'bar',
      data: orderUserTrend.value,
      barWidth: '60%'
    },
    color: '#3398db', // 颜色
    // 四周的距离
    grid: { left: 0, top: 0, right: 0, bottom: 0 },
    // 提示框
    tooltip: {
      trigger: 'axis',
      // 计算提示框显示的位置
      position: function (
        point: any,
        params: any,
        dom: any,
        rect: any,
        size: any
      ) {
        // 固定在顶部
        let x = 0 // 自己要计算的鼠标的横坐标
        let pointX = point[0] // 可以获取的鼠标的横坐标
        let boxWidth = size.contentSize[0] // dom的宽度
        x = boxWidth > pointX ? 5 : pointX - boxWidth
        return [x, -40]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>