<template>
  <common-card title="今日销售额" :value="numberFormat(salesToday)">
    <div class="compare-wrap">
      <div class="compare">
        <div>日同比</div>
        <div class="number">{{salesGrowthLastDay}}%</div>
        <div class="decrement"></div>
      </div>
      <div class="compare">
        <div>月同比</div>
        <div class="number">{{salesGrowthLastMonth}}%</div>
        <div class="increment"></div>
      </div>
    </div>
    <template v-slot:bottom>
      <span>昨日销售额</span><span class="number">{{moneyFormat(salesLastDay)}}</span>
    </template>
  </common-card>
</template>
<script lang="ts">
export default {
  name: 'TodaySales'
}
</script>
<script lang="ts" setup>
import {useDataStore} from '@/stores/reportData'
import useFormat from '@/hooks/useFormat'
import {computed} from 'vue'
const dataStore = useDataStore()
const {numberFormat,moneyFormat} = useFormat()
// 从pinia中获取当前组件所需的数据
const salesToday = computed(()=>dataStore.reportData.salesToday) // 今日销售额
const salesLastDay = computed(()=>dataStore.reportData.salesLastDay)  // 昨日销售额
const salesGrowthLastDay = computed(()=>dataStore.reportData.salesGrowthLastDay) // 日同比
const salesGrowthLastMonth = computed(()=>dataStore.reportData.salesGrowthLastMonth) // 月同比
</script>
<style lang="scss" scoped>
.compare-wrap{
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  .compare{
    display: flex;
    flex: 1;
    align-items: center;
  }
}
</style>