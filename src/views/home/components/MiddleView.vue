<template>
  <el-card class="middle-view">
    <template #header>
      <!--菜单-->
      <el-menu :default-active="state.activeIndex" class="el-menu-demo" mode="horizontal" @select="val=>state.activeIndex=val">
        <el-menu-item index="1">销售额</el-menu-item>
        <el-menu-item index="2">访问量</el-menu-item>
      </el-menu>
      <div class="right">
        <!--选择项-->
        <el-radio-group v-model="state.time1" label="size control">
          <el-radio-button label="今日">今日</el-radio-button>
          <el-radio-button label="本周">本周</el-radio-button>
          <el-radio-button label="本月">本月</el-radio-button>
          <el-radio-button label="今年">今年</el-radio-button>
        </el-radio-group>
        <!--日期选择-->
        <el-date-picker v-model="state.time2" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" :size="size" />
      </div>
    </template>
    <!--内容区域-->
    <div class="content">
      <v-chart autoresize :option="getOption()"></v-chart>
      <div class="list-wrap">
        <div class="title">{{state.activeIndex==='1'?'门店销售额排名':'门店访问量排名'}}</div>
        <div class="list">
          <div class="list-item" v-for="(item,index) in rankData" :key="item.no">
            <div class="no" :class="{'top-no':item.no<=3}">{{item.no}}</div>
            <div class="name">{{item.name}}</div>
            <div class="count">{{item.count}}</div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script lang="ts">
export default {
  name: 'MiddleView'
}
</script>
<script lang="ts" setup>
import { reactive,computed } from 'vue'
import {useDataStore} from '@/stores/reportData'
const state = reactive({
  activeIndex: '1',
  time1: '本周',
  time2: ''
})
const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]
const dataStore = useDataStore()
// 获取相关数据
// 销售额的横轴数据
const orderFullYearAxis = computed(()=>dataStore.reportData.orderFullYearAxis||[])
// 销售额数据
const orderFullYear = computed(()=>dataStore.reportData.orderFullYear||[])
// 访问量的横轴数据
const userFullYearAxis = computed(()=>dataStore.reportData.userFullYearAxis||[])
// 访问量数据
const userFullYear = computed(()=>dataStore.reportData.userFullYear||[])
// 销售额的排行
const orderRank = computed(()=>dataStore.reportData.orderRank||[])
// 访问量的排行
const userRank = computed(()=>dataStore.reportData.userRank||[])
// 计算销售额排行和访问量排行的数据
const rankData =computed(()=>state.activeIndex==='1'?orderRank.value:userRank.value)
const getOption=()=>{
  const text = state.activeIndex==='1'?'销售趋势':'访问量趋势'
  return {
    // 标题
    title:{
      text, // 标题内容
      textStyle:{color:'#333',fontSize:14}, // 标题样式
      left:10 // 标题位置
    },
    // 横轴
    xAxis:{
      data:state.activeIndex==='1'?orderFullYearAxis.value:userFullYearAxis.value,
        axisTick :{show:true, alignWithLabel:true} // 刻度的设置
    },
    // 纵轴,线的样式及颜色
    yAxis:{splitLine:{show:true, lineStyle:{type:'dotted',color:'#02a774'}}},
    // 系列组件
    series:[
      {
        type:'bar',
        data:state.activeIndex==='1'?orderFullYear.value:userFullYear.value,
         barWidth:'35%' // 柱条宽度
      }
    ],
    // 四周的距离
    grid:{left:50,top:50,right:50,bottom:50},
    // 提示框
    tooltip:{},
    color:'#3398db'
  }
}
</script>
<style lang="scss" scoped>
.middle-view {
  margin-top: 20px;
  :deep(.el-card__header) {
    border-bottom: none;
    padding: 0 20px;
    position: relative;
    .right{
      position: absolute;
      top:0;
      right: 20px;
      height: 100%;
      display: flex;
      align-items: center;
      .el-date-editor{
        margin-left: 20px;
      }
    }
  }

  .content{
    display: flex;
    height: 270px;
    .echarts{
      flex: 5;
    }
    .list-wrap{
      flex: 2;
      .title{
        font-size: 14px;
        color: #333;
        font-weight: 500;
        margin-top: 20px;
      }
      .list{
        margin-top: 15px;
        .list-item{
          display: flex;
          align-items: center;
          height: 20px;
          font-size: 12px;
          margin: 6px 20px 6px 0;
          .no{
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            &.top-no{
              border-radius: 50%;
              background-color: #000;
              color: #fff;
            }
          }
          .name{
            margin-left: 10px;
          }
          .count{
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>