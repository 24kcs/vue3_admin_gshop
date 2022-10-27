<template>
  <el-card class="sku-list">
    <!--表格-->
    <el-table row-key="id" v-loading="loading" :data="skuInfoList" stripe style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="skuName" label="名称" />
      <el-table-column prop="skuDesc" label="描述" />
      <el-table-column prop="skuDefaultImg" label="默认图片" width="150">
        <template #default="{row,$index}">
          <el-image :src="row.skuDefaultImg" style="width:80px;height:80px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(千克)" />
      <el-table-column prop="price" label="价格(元)" />
      <el-table-column label="操作" width="250">
        <template #default="{row,$index}">
          <el-button size="small" type="info" :icon="Top" v-if="row.isSale===0" @click="onOrCancelSale(row,1)"></el-button>
          <el-button size="small" type="success" :icon="Bottom" v-else @click="onOrCancelSale(row,0)"></el-button>
          <el-button size="small" type="primary" :icon="Edit" @click="ElMessage.warning('正在开发中...')"></el-button>
          <el-button size="small" type="info" :icon="InfoFilled" @click="showSkuInfo(row)"></el-button>
          <el-button size="small" type="danger" :icon="Delete" @click="deleteSkuInfo(row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination v-model:currentPage="current" v-model:page-size="pageSize" :page-sizes="[10,20,30]" :small="small" background layout="prev, pager, next, jumper,->, sizes, total" :total="total" @size-change="getSkuInfoList(1,$event)" @current-change="getSkuInfoList(val,pageSize)" style="margin-top:20px" />
    <!--抽屉-->
    <el-drawer v-model="isShowSkuInfo" title="测试" :with-header="false" size="50%">
      <!--名称-->
      <el-row>
        <el-col :span="5">名称:</el-col>
        <el-col :span="16">{{skuInfo?.skuName}}</el-col>
      </el-row>
      <!--描述-->
      <el-row>
        <el-col :span="5">描述:</el-col>
        <el-col :span="16">{{skuInfo?.skuDesc}}</el-col>
      </el-row>
      <!--价格(元)-->
      <el-row>
        <el-col :span="5">价格(元):</el-col>
        <el-col :span="16">{{skuInfo?.price}}</el-col>
      </el-row>
      <!--平台属性-->
      <el-row>
        <el-col :span="5">平台属性:</el-col>
        <el-col :span="18">
          <div v-if="skuInfo?.skuAttrValueList&&skuInfo?.skuAttrValueList.length>0">
            <el-tag type="success" v-for="(attr,index) in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right:5px">{{attr.attrName}}-{{attr.valueName}}</el-tag>
          </div>
          <div v-else>无数据</div>
        </el-col>
      </el-row>
      <!--销售属性-->
      <el-row>
        <el-col :span="5">销售属性:</el-col>
        <el-col :span="18">
          <div v-if="skuInfo?.skuSaleAttrValueList&&skuInfo?.skuSaleAttrValueList.length>0">
            <el-tag type="success" v-for="(attr,index) in skuInfo.skuSaleAttrValueList" :key="attr.id" style="margin-right:5px">{{attr.saleAttrName}}-{{attr.saleAttrValueName}}</el-tag>
          </div>
          <div v-else>无数据</div>
        </el-col>
      </el-row>
      <!--商品图片-->
      <el-row>
        <el-col :span="5">商品图片:</el-col>
        <el-col :span="16">
          <el-carousel class="sku-carousel" trigger="click" height="400px" style="width:400px">
            <el-carousel-item v-for="(item,index) in skuInfo?.skuImageList" :key="item.id">
             <el-image :src="item.imgUrl" style="width:100%;height:100%"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </el-card>
</template>
<script lang="ts">
export default {
  name: 'Sku'
}
</script>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
// 引入相关的接口类型
import type {
  SkuInfoModel,
  SkuInfoListModel
} from '@/api/product/model/skuModel'
// 引入相关的接口函数
import {
  getSkuInfoListApi,
  onSaleApi,
  cancelSaleApi,
  deleteSkuInfoByIdApi,
  getSkuInfoByIdApi
} from '@/api/product/sku'
import { Top, Bottom, Edit, InfoFilled, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
// 加载的标识
const loading = ref<boolean>(false)
const current = ref<number>(1) // 页码
const pageSize = ref<number>(10) // 每页的条数
const total = ref<number>(0) // 总条数
// sku对象数组
const skuInfoList = ref<SkuInfoListModel>([])
// 是否显示抽屉组件的标识
const isShowSkuInfo = ref<boolean>(false)
const skuInfo = ref<SkuInfoModel>()

// 定义方法,用来获取sku列表数据
const getSkuInfoList = async (
  page: number = current.value,
  limit: number = pageSize.value
) => {
  loading.value = true
  current.value = page
  pageSize.value = limit
  const result = await getSkuInfoListApi(page, limit)
  loading.value = false
  skuInfoList.value = result.records
  total.value = result.total
}
// 界面加载后获取sku列表数据
onMounted(() => {
  getSkuInfoList()
})

// 上下架
const onOrCancelSale = async (row: SkuInfoModel, flagNum: number) => {
  flagNum === 1
    ? await onSaleApi(row.id as number)
    : await cancelSaleApi(row.id as number)
  ElMessage.success(flagNum === 1 ? '上架成功' : '下架成功')
  getSkuInfoList() // 更新
}

// 删除sku对象
const deleteSkuInfo = async (skuId: number) => {
  await deleteSkuInfoByIdApi(skuId as number)
  ElMessage.success('删除成功')
  getSkuInfoList()
}

// 显示sku对象的抽屉内容
const showSkuInfo = async (row: SkuInfoModel) => {
  isShowSkuInfo.value = true
  // 调用一个接口,根据sku的id获取skuInfo对象的数据
  skuInfo.value = await getSkuInfoByIdApi(row.id as number)
}
</script>













<style lang="scss">
.sku-list {
  .el-drawer__body {
    overflow: auto;
    &::-webkit-scrollbar {
      //&: 父级引用
      display: none;
    }
  }
}
</style>
<style lang="scss" scoped>
/* 
  scoped样式: 作用域样式
    能影响当前组件的所有标签及子组件的根标签, 不能影响子组件的所有子标签
  修改子组件(自己的或第三方的)内部的子组件的样式
    如果用上了scoped了, 必须使用'深度作用域选择器'   ::v-deep写在选择器左侧
    如果不用scoped, 不需要使用'深度作用域选择器', 但最好放在组件的根类名下
*/
.sku-list {
  .el-row {
    margin: 10px 0;
    .el-col-5 {
      text-align: right;
      margin-right: 10px;
      font-size: 20px;
    }
    .el-col-16 {
      line-height: 26px;
    }
  }
  /* 
    修改第三方组件样式
      1. 让Drawer形成竖直滚动
      2. 修改carousel的指示器的样式
      <div  class="el-carousel__indicator is-acttive">
        <button></button>
      </div>
    */
  :deep(.el-carousel__indicator) {
    button {
      background-color: pink;
      width: 10px;
      height: 10px;
      border-radius: 10px;
    }
    &.is-active {
      button {
        background-color: hotpink;
      }
    }
  }
}
</style>