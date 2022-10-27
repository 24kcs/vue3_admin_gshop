<template>
  <el-row :gutter="10" class="top-view">
    <el-col :span="6">
      <TodaySales />
    </el-col>
    <el-col :span="6">
      <TodayOrders />
    </el-col>
    <el-col :span="6">
      <TodayUsers />
    </el-col>
    <el-col :span="6">
      <TotalUsers />
    </el-col>
  </el-row>
</template>
<script lang="ts">
export default {
  name: 'TopView'
}
</script>
<script lang="ts" setup>
import TodaySales from './TodaySales.vue'
import TodayOrders from './TodayOrders.vue'
import TodayUsers from './TodayUsers.vue'
import TotalUsers from './TotalUsers.vue'
</script>
<style lang="scss">
.top-view {
  // 一些数据的样式
  .number {
    font-size: 12px;
    font-weight: 700;
    margin: 0 5px;
  }
  // 上箭头
  .increment {
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent green transparent;
  }
  // 下箭头
  .decrement {
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
    border-color: red transparent transparent transparent;
  }
}
</style>