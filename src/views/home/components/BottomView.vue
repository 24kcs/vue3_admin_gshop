<template>
  <div class="bottom-view">
    <!--左边-->
    <el-card class="view" shadow="hover">
      <template #header>
        <div>关键词搜索</div>
      </template>
      <div class="search-view">
        <!--两个小图表-->
        <div class="chart-wrap">
          <!--第一个图表-->
          <div class="chart">
            <div class="title">搜索用户数</div>
            <div class="count">113,918</div>
            <v-chart :option="getLineOption('userList','搜索用户数')"></v-chart>
          </div>
          <div class="chart">
            <div class="title">搜索量</div>
            <div class="count">214,215</div>
            <v-chart :option="getLineOption('countList','搜索量')"></v-chart>
          </div>
        </div>
        <!--表格和分页-->
        <div class="search-table">
          <!--表格-->
          <el-table :data="tableData" style="margin-top:20px">
            <el-table-column prop="rankNo" label="排名" />
            <el-table-column prop="word" label="关键字" />
            <el-table-column prop="count" label="搜索数量" />
            <el-table-column prop="user" label="搜索用户数" />
            <el-table-column prop="range" label="搜索占比" />
          </el-table>
          <!--分页-->
          <el-pagination v-model:currentPage="current" v-model:page-size="pageSize" layout="prev, pager, next" :total="tableAllData.length" style="margin-top:10px;font-weight:700" />
        </div>
      </div>
    </el-card>
    <!--右边-->
    <el-card class="view" shadow="hover">
      <template #header>
        <div>分类销售排行</div>
        <el-radio-group v-model="selectRadio" size="small">
          <el-radio-button label="品类">品类</el-radio-button>
          <el-radio-button label="商品">商品</el-radio-button>
        </el-radio-group>
      </template>
      <div class="search-view">
        <v-chart :option="getPieOption()" autoresize></v-chart>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BottomView'
}
</script>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useDataStore } from '@/stores/reportData'
import useFormat from '@/hooks/useFormat'
const selectRadio = ref('品类')
const dataStore = useDataStore()
const { numberFormat } = useFormat()
// 关键字搜索 数据
const searchWord = computed(() => dataStore.reportData.searchWord || [])
// 分类销售排行 数据
const saleRank = computed(() => dataStore.reportData.saleRank)
// 计算表格的数据
const tableAllData = computed(() => {
  // 判断数据是否存在
  if (!searchWord.value) return []
  // 数据存在
  return searchWord.value.map((item, index) => ({
    ...item,
    rankNo: index + 1, // 排名
    range: ((item.user / item.count) * 100).toFixed(2) + '%' // 占比
  }))
})
const current = ref(1) // 页码
const pageSize = ref(5) // 每页的条数
// 计算分页的表格数据
const tableData = computed(() => {
  return tableAllData.value.slice(
    (current.value - 1) * pageSize.value,
    current.value * pageSize.value
  )
})

// 计算线性图表所需的数据
const lineData = computed(() => {
  const data = {
    wordList: [] as string[], // 关键字数组数据
    userList: [] as number[], // 用户搜索数数组数据
    countList: [] as number[], // 搜索量数组数据
    totalUsers: 0, // 总的用户数
    totalCount: 0 // 总的搜索量
  }
  searchWord.value.forEach((item) => {
    data.wordList.push(item.word)
    data.userList.push(item.user)
    data.countList.push(item.count)
    data.totalUsers += item.user
    data.totalCount += item.count
  })
  return data
})
// 计算饼图所需的数据
const pieChartData = computed(() => {
  const data = {
    categoryList: [] as any, // 品类数组
    categoryTotal: 0, // 品类的总数
    goodsList: [] as any, // 商品数组
    goodsTotal: 0 // 商品总数
  }
  // 先判断数据是否存在
  if (saleRank.value) {
    // 解构出品类和商品的两个对象
    // 再从品类对象category中解构出axisX 并且改名为axisX11,还解构出data1
    // 继续冲商品对象goods中解构出axisX 并且改名为axisX2,还解构出data1改名为data2
    const {
      category: { axisX: axisX1, data1 },
      goods: { axisX: axisX2, data1: data2 }
    } = saleRank.value
    // 计算品类category中的data1数组中的总数据(目的:1.为了显示总数,2.为了计算占比)
    const total1 = data1.reduce((pre, item) => pre + item, 0)
    data.categoryTotal = total1 as number // 品类的总数计算完毕
    axisX1.forEach((item, index) => {
      const percent = ((data1[index] / total1) * 100).toFixed(2) // 比例
      data.categoryList.push({
        name: item + '|' + percent + '%',
        value: data1[index],
        percent, // 占比
        labelName: item
      })
    })
    // 计算商品goods中的data2数组中的总数据
    const total2 = data2.reduce((pre, item) => pre + item, 0)
    data.goodsTotal = total2 as number // 品类的总数计算完毕
    axisX2.forEach((item, index) => {
      const percent = ((data2[index] / total2) * 100).toFixed(2) // 比例
      data.goodsList.push({
        name: item + '|' + percent + '%',
        value: data2[index],
        percent, // 占比
        labelName: item
      })
    })
  }
  return data
})
// 两个小图表的配置
const getLineOption = (listName: 'userList' | 'countList', name: string) => {
  return {
    // 横轴数据
    xAxis: {
      data: lineData.value.wordList, // 横轴是关键字数组数据
      boundaryGap: false // 两边不留白
    },
    // 纵轴数据
    yAxis: { show: false },
    // 系列组件
    series: [
      {
        type: 'line',
        data: lineData.value[listName],
        smooth: true, // 圆滑一些
        itemStyle: { opacity: 0 }, // 拐点
        areaStyle: { color: '#c7e7ff' },
        lineStyle: { color: '#5fbbff' } // 线的颜色
      }
    ],
    // 提示框
    tooltip: { trigger: 'axis' },
    // 四周距离
    grid: { left: 0, top: 0, right: 0, bottom: 0 }
  }
}

const getPieOption = () => {
  // 解构出品类和商品的数组数据和品类总数和商品总数
  const { categoryList, categoryTotal, goodsList, goodsTotal } =
    pieChartData.value
  // 获取图表所需的数据
  const data = selectRadio.value === '品类' ? categoryList : goodsList
  // 子标题的内容
  const total = selectRadio.value === '品类' ? categoryTotal : goodsTotal
  return {
    // 标题
    title: [
      {
        // 主标题
        text: `${selectRadio.value}分布`, // 标题内容
        textStyle: { fontSize: 14, color: '#666' }, // 标题的字体大小和颜色
        left: 20, // 左侧位置
        top: 20 // 右侧位置
      },
      // 副标题
      {
        text: '累计订单量',
        subtext: total,
        textStyle: { fontSize: 14, color: '#999' }, // 副标题的字体大小和颜色
        subtextStyle: { fontSize: 28, color: '#333' }, // 子标题的字体大小和颜色
        left: '34.5%', // 左侧位置
        top: '42.5%', // 上面的位置
        textAlign: 'center'
      }
    ],
    // 图例组件
    legend: {
      orient: 'vertical', // 朝向
      top: 'middle',
      left: '72%'
    },
    // 系列组件
    series: [
      {
        name: `${selectRadio.value}分布`,
        type: 'pie',
        data,
        center: ['35%', '50%'], // 圆心的位置
        radius: ['35%', '50%'],
        avoidLabelOverlap: false, // 不启用防止标签重叠策略
        itemStyle: {
          // 设置周围的边框的样式
          borderRadius: 2,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          // 图表中的文字标签
          show: true,
          position: 'outside',
          // 显示的文字内容====坑
          formatter: function (params: any) {
            return params.data.labelName
          }
        },
        labelLine: {
          show: true,
          length: 7, // 第一条线
          length2: 5 // 第二条线
        }
      }
    ],
    // 提示框
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return `${params.seriesName}<br/>
        ${params.marker}${params.data.labelName}<br/>
        ${params.marker}数量:${params.value}<br/>
        ${params.marker}占比:${params.percent}%<br/>
        `
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bottom-view {
  margin-top: 20px;
  display: flex;
  .view {
    flex: 1;
    &:first-child {
      margin-right: 10px;
    }
    &:last-child {
      margin-left: 10px;
    }
    :deep(.el-card__header) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
    }
    .search-view {
      display: flex;
      flex-direction: column;
      height: 450px;
      .chart-wrap {
        display: flex;
        .chart {
          flex: 1;
          &:first-child {
            margin-right: 5px;
          }
          &:last-child {
            margin-left: 5px;
          }
          .title {
            font-size: 14px;
            color: #999;
          }
          .count {
            font-size: 22px;
            color: #333;
            font-weight: 500;
            letter-spacing: 2px;
          }
          .echarts {
            height: 50px;
          }
        }
      }
    }
  }
}
</style>