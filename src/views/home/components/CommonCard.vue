<template>
  <el-card class="common-card">
    <!--标题-->
    <div class="title">{{title}}</div>
    <!--数据-->
    <div class="value">{{value}}</div>
    <!--图表使用默认插槽-->
    <div class="chart"><slot></slot></div>
    <!--线-->
    <div class="line"></div>
    <!--底部使用了具名插槽(命名插槽)-->
    <div class="bottom"><slot name="bottom"></slot></div>
  </el-card>
</template>
<script lang="ts">
export default {
  name: 'CommonCard'
}
</script>
<script lang="ts" setup>
defineProps(['title','value'])
</script>
<style lang="scss" scoped>
.common-card{
  .title{
    font-size: 12px;
    color: #999;
  }
  .value{
    font-size: 25px;
    letter-spacing: 1px;
    margin: 5px 0;
  }
  .chart{
    height: 50px;
  }
  .line{
    border: 1px solid #eee;
    margin: 10px 0;
  }
  .bottom{
    font-size: 12px;
    color: #666;
  }
}
</style>