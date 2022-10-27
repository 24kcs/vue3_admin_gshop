<template>
  <common-card title="累计用户数" :value="numberFormat(usersTotal)">
    <v-chart :option="getOption()" autoresize></v-chart>
    <template #bottom>
      <div class="user-total-list">
        <div>日同比</div>
        <div class="number">{{userGrowthLastDay}}%</div>
        <div class="increment"></div>
        <div class="right">月同比</div>
        <div class="number">{{userGrowthLastMonth}}%</div>
        <div class="decrement"></div>
      </div>
    </template>
  </common-card>
</template>
<script lang="ts">
export default {
  name: 'TotalUsers'
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
const usersTotal = computed(() => dataStore.reportData.usersTotal) // 累计用户数
const usersLastDay = computed(() => dataStore.reportData.usersLastDay) // 昨天的用户数
const usersLastMonth = computed(() => dataStore.reportData.usersLastMonth) // 上个月用户数
const userGrowthLastDay = computed(() => dataStore.reportData.userGrowthLastDay) // 日同比
const userGrowthLastMonth = computed(
  () => dataStore.reportData.userGrowthLastMonth
) // 月同比

const getOption = () => {
  return {
    xAxis: { show: false, min: 0, max: usersTotal.value },
    yAxis: { show: false, type: 'category' },
    series: [
      {
        name: '累计用户数',
        type: 'bar',
        data: [(usersTotal.value as number) - (usersLastMonth.value as number)],
        barWidth: 10, // 柱条的宽度
        showBackground: true, // 开启背景色
        backgroundStyle: { color: '#eee' }, // 背景颜色
        itemStyle: {
          color: 'yellowgreen' // 柱条的颜色
        },
        // 文字内容
        label: {
          show: true, // 显示文本
          formatter: '|', // 文本内容
          position: 'right', // 显示位置
          color:'yellowgreen' // 文本颜色
        }
      }
    ],
    grid: { left: 0, top: 0, right: 0, bottom: 0 },
    tooltip: { trigger: 'axis' }
  }
}
</script>
<style lang="scss" scoped>
.user-total-list {
  display: flex;
  align-items: center;
  .right {
    margin-left: 10px;
  }
}
</style>