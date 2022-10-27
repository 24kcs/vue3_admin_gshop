<template>
  <!--按钮-->
  <el-button type="primary" :icon="Plus" @click="showAddSpu">添加SPU</el-button>
  <!--表格-->
  <el-table row-key="id" v-loading="loading" :data="spuInfoList" stripe style="width: 100%;margin-top:20px" border>
    <el-table-column type="index" label="序号" width="80" align="center">
      <template #default="{row,$index}">{{pageSize*(current-1)+$index+1}}</template>
    </el-table-column>
      <el-table-column prop="spuName" label="SPU名称" />
      <el-table-column prop="description" label="SPU描述" />
      <el-table-column label="操作">
        <template #default="{row,$index}">
          <el-button size="small" type="primary" :icon="Plus" title="添加SKU" @click="showAddSku(row)"></el-button>
          <el-button size="small" type="primary" :icon="Edit" title="修改SPU" @click="showUpdateSpu(row)"></el-button>
          <el-button size="small" type="info" :icon="InfoFilled" title="查看SKU" @click="showSkuInfoList(row)"></el-button>
          <el-button size="small" type="danger" :icon="Delete" title="删除SPU" @click="deleteSpuInfo(row.id)"></el-button>
        </template>
      </el-table-column>
  </el-table>
  <!--分页-->
  <el-pagination v-model:currentPage="current" v-model:page-size="pageSize" :page-sizes="[3,6,9]" :small="small" background layout="prev, pager, next, jumper,->, sizes, total" :total="total" @size-change="getSpuInfoList(1,val)" @current-change="getSpuInfoList(val,pageSize)" style="margin-top:20px" />
  <!--sku列表的对话框-->
  <el-dialog v-model="dialogVisible" :title="`${spuInfo?.spuName}=> SKU列表`">
    <el-table :data="skuInfoList">
      <el-table-column property="skuName" label="名称" />
      <el-table-column property="price" label="价格(元)" />
      <el-table-column property="weight" label="重量(千克)" />
      <el-table-column label="默认图片">
        <template v-slot="{row,$index}">
          <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg" />
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script lang="ts">
export default {
  name: 'SpuList'
}
</script>
<script lang="ts" setup>
import { Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
// 引入ref,watch,reactive等等
import { ref, reactive, watch } from 'vue'
// 引入spu相关的接口类型
import type { SpuModel, SpuListModel } from '@/api/product/model/spuModel'
// 引入spu相关的api接口函数
import { getSpuInfoListApi,deleteSpuInfoByIdApi } from '@/api/product/spu'
// 引入分类的仓库
import { useCategoryStore } from '@/stores/category'
// 引入类型
import type { SkuInfoListModel } from '@/api/product/model/skuModel'
// 引入sku相关的接口函数
import { getSkuInfoListBySpuIdApi } from '@/api/product/sku'
// 引入显示或者隐藏的界面的枚举类型
import { ShowStatus } from '../types'
import {ElMessage} from 'element-plus'
// 分类仓库对象
const categoryStore = useCategoryStore()
// 定义页码
const current = ref<number>(1)
// 定义每页的条数
const pageSize = ref<number>(3)
// 定义总条数
const total = ref<number>(0)
// 定义spuInfo数组列表数据
const spuInfoList = ref<SpuListModel>([])
// 定义loading,加载的效果
const loading = ref<boolean>(false)

// 用来显示或者隐藏sku列表的对话框的标识
const dialogVisible = ref<boolean>(false)
// spu对象
const spuInfo = ref<SpuModel>()
// skuInfo的列表数组数据
const skuInfoList = ref<SkuInfoListModel>([])

// 接收父级组件传递进来的自定义事件
const emits = defineEmits(['setCurrentShowStatus','setCurrentSpuInfo'])

// 获取spu对象列表数据
const getSpuInfoList = async (
  page: number = current.value,
  limit: number = pageSize.value
) => {
  loading.value = true // 加载的效果
  current.value = page
  pageSize.value = limit
  // 调用接口,传入参数
  const result = await getSpuInfoListApi({
    page,
    limit,
    category3Id: categoryStore.getCategory3Id as number
  })
  loading.value = false // 关闭加载效果
  // 直接赋值
  spuInfoList.value = result.records // 数组数据更新
  total.value = result.total // 总条数
}
// 三级分类的id变化就开始调用上面的方法
watch(
  () => categoryStore.category3Id,
  (category3Id) => {
    // 判断
    if (!category3Id) {
      current.value = 1 // 页码
      pageSize.value = 3 // 每页的条数
      total.value = 0 // 总条数
      spuInfoList.value = [] // spu列表数据
      return
    }
    getSpuInfoList()
  },
  { immediate: true }
)

// 点击查看sku按钮点击事件的回调函数
const showSkuInfoList = async (row: SpuModel) => {
  // 显示对话框
  dialogVisible.value = true
  // 保存spu对象的数据
  spuInfo.value = row
  // 调用接口,获取数据
  skuInfoList.value = await getSkuInfoListBySpuIdApi(row.id as number)
}

//

// 点击按钮添加SPU的回调函数
const showAddSpu = () => {
  // 显示SpuForm组件界面
  emits('setCurrentShowStatus', ShowStatus.SPU_ADD)
    emits('setCurrentSpuInfo')
}
// 点击按钮添加SKU的回调函数
const showAddSku = (row: SpuModel) => {
  // 显示SkuForm组件界面
  emits('setCurrentShowStatus', ShowStatus.SKU_ADD)
  // 把spu的id和名字传递过去
  emits('setCurrentSpuInfo',{
    id:row.id,
    spuName:row.spuName
  })
}
// 点击按钮修改SPU的回调函数
const showUpdateSpu = (row: SpuModel) => {
  
  // 显示SpuForm组件界面
  emits('setCurrentShowStatus', ShowStatus.SPU_ADD)
  // 分发父级组件传递过来的自定义事件
  emits('setCurrentSpuInfo',{
    ...row,
    spuImageList:[],
    spuSaleAttrList:[]
  })
}
// 删除spu
const deleteSpuInfo=async(spuId:number)=>{
  await deleteSpuInfoByIdApi(spuId)
  ElMessage.success('删除成功')
  getSpuInfoList()
}
</script>
<style scoped>
</style>
