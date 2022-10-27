<template>
  <el-card shadow="always">
    <CategorySelector />
  </el-card>
  <el-card shadow="always" style="margin-top:10px">
    <!--Spu列表组件-->
    <SpuList v-if="showStatus===ShowStatus.SPU_LIST" @setCurrentShowStatus="setCurrentShowStatus" @setCurrentSpuInfo="setCurrentSpuInfo" />
    <!--添加或者修改Spu的组件-->
    <SpuForm v-else-if="showStatus===ShowStatus.SPU_ADD" @setCurrentShowStatus="setCurrentShowStatus" :currentSpu=currentSpuInfo />
    <!--添加SKU的组件-->
    <SkuForm v-else="showStatus===ShowStatus.SKU_ADD" @setCurrentShowStatus="setCurrentShowStatus" :spu="{id:currentSpuInfo.id,spuName:currentSpuInfo.spuName}" />
  </el-card>
</template>
<script lang="ts">
export default {
  name: 'Spu'
}
</script>
<script lang="ts" setup>
import CategorySelector from '@/components/CategorySelector/index.vue'
// 引入SpuList组件---展示spu对象数组列表数据
import SpuList from './components/SpuList.vue'
// 引入SpuForm组件---添加或者修改Spu的
import SpuForm from './components/SpuForm.vue'
// 引入SkuForm组件---添加Sku的
import SkuForm from './components/SkuForm.vue'
import { ref } from 'vue'
import { ShowStatus } from './types'
import type { SpuModel } from '@/api/product/model/spuModel'
const showStatus = ref<ShowStatus>(ShowStatus.SPU_LIST)
// 修改显示或者隐藏的标识
const setCurrentShowStatus = (val: ShowStatus) => {
  showStatus.value = val
}

// 初始化一个spu对象数据,把更新这个数据的方法,传入到SpuList组件内部,该组件内部点击修改spu按钮的时候,调用该方法,修改spu对象数据
// 父级组件把修改后的数据传入到SpuForm组件中
const initSpuInfo = () => ({
  tmId: undefined, // 品牌的id
  spuName: '', // spu的名字
  description: '', // spu的描述
  spuSaleAttrList: [], // spu的销售属性对象数组
  spuImageList: [] // spu的图片对象数组
})
// 定义一个对象用来存储spuInfo对象的初始数据
const currentSpuInfo = ref<SpuModel>(initSpuInfo())
// 定义一个方法,用来修改spuInfo对象数据
const setCurrentSpuInfo = (val: SpuModel = initSpuInfo()) => {
  currentSpuInfo.value = val
}
</script>
<style scoped>
</style>