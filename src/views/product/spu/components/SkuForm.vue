<template>
  <el-form label-width="120px" ref="formRef" :model="skuInfo" :rules="rules">
    <!--SPU名称-->
    <el-form-item label="SPU名称">{{spu.spuName}}</el-form-item>
    <!--SKU名称-->
    <el-form-item label="SKU名称" prop="skuName">
      <el-input type="text" placeholder="请输入SKU名称" v-model="skuInfo.skuName"></el-input>
    </el-form-item>
    <!--价格(元)-->
    <el-form-item label="价格(元)" prop="price">
      <el-input type="number" placeholder="请输入SKU价格" v-model="skuInfo.price"></el-input>
    </el-form-item>
    <!--重量(千克)-->
    <el-form-item label="重量(千克)" prop="weight">
      <el-input type="number" placeholder="请输入SKU重量" v-model="skuInfo.weight"></el-input>
    </el-form-item>
    <!--规格描述-->
    <el-form-item label="规格描述" prop="skuDesc">
      <el-input type="textarea" rows="4" placeholder="请输入SKU描述" v-model="skuInfo.skuDesc"></el-input>
    </el-form-item>
    <!--平台属性-->
    <el-form-item label="平台属性" prop="skuAttrValueList">
      <el-form inline>
        <!--第一个平台属性-->
        <el-form-item v-for="(attr,index) in attrList" :key="attr.id" :label="attr.attrName" style="margin-bottom:10px">
          <el-select placeholder="请选择" v-model="skuInfo.skuAttrValueList[index]">
            <el-option v-for="(val,index) in attr.attrValueList" :key="val.id" :value="val.id+'_'+attr.id" :label="val.valueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!--销售属性-->
    <el-form-item label="销售属性" prop="skuSaleAttrValueList">
      <el-form inline>
        <!--第一个销售属性-->
        <el-form-item v-for="(attr,index) in spuSaleAttrList" :key="attr.id" :label="attr.saleAttrName" style="margin-bottom:10px">
          <el-select placeholder="请选择" v-model="skuInfo.skuSaleAttrValueList[index]">
            <el-option v-for="(val,index) in attr.spuSaleAttrValueList" :key="val.id" :value="val.id" :label="val.saleAttrValueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!--图片列表-->
    <el-form-item label="图片列表" prop="skuImageList">
      <el-table ref="tableRef" row-key="id" :data="spuImageList" stripe style="width: 100%" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="图片">
          <template #default="{row,$index}">
            <el-image :src="row.imgUrl" style="width:100px;height:100px"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{row,$index}">
            <el-tag type="success" v-if="row.isDefault==='1'">默认</el-tag>
            <el-button size="small" v-else type="primary" @click="setDefault(row)">设置为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <!--两个按钮-->
    <el-form-item>
      <el-button type="primary" @click="saveSkuInfo">保存</el-button>
      <el-button @click="$emit('setCurrentShowStatus',ShowStatus.SPU_LIST)">取消</el-button>
    </el-form-item>
  </el-form>

  <!--  -->
</template>
<script lang="ts">
export default {
  name: 'SkuForm'
}
</script>
<script lang="ts" setup>
// 引入显示或者隐藏的界面的枚举类型
import { ShowStatus } from '../types'
import { reactive, ref, onMounted, nextTick } from 'vue'
import type { SkuInfoModel } from '@/api/product/model/skuModel'

// 引入平台属性对象数组类型
import type { AttrListModel } from '@/api/product/model/attrModel'
// 引入销售属性对象数组和图片对象数组的类型
import type {
  SpuSaleAttrListModel,
  SpuImageListModel,
  SpuImageModel
} from '@/api/product/model/spuModel'
// 引入获取平台属性对象数组的接口函数
import { getAttrInfoListApi } from '@/api/product/attr'
// 引入获取spu下的销售属性对象数组和spu下的图片对象数组的接口函数
import {
  getSpuSaleAttrListBySpuIdApi,
  getSpuImageListBySpuIdApi
} from '@/api/product/spu'
import { useCategoryStore } from '@/stores/category'
import type { ElTable, FormInstance, FormRules } from 'element-plus'
import { addOrUpdateSkuInfoApi } from '@/api/product/sku'
import { ElMessage } from 'element-plus'
// 接收父级组件传递进来的自定义事件
const emits = defineEmits(['setCurrentShowStatus'])
// 定义一个接口
interface Props {
  spu: {
    id: number
    spuName: string
  }
}
// 接收父级组件传递过来的数据
const props = defineProps<Props>()
// 定义skuInfo对象
const skuInfo = reactive<SkuInfoModel>({
  isSale: 1, // 上下架的标识
  tmId: undefined, // 品牌的id
  skuName: '', // 名字
  skuDesc: '', // 描述
  skuDefaultImg: '', // 默认图片的地址
  price: 0, // 价格
  weight: 0, // 重量
  skuAttrValueList: [], // 平台属性数组
  skuImageList: [], // 图片数组
  skuSaleAttrValueList: [] // 销售属性数组
})

// 调用三个接口,获取所有的平台属性数据/spu下的销售属性数据/spu下的图片列表数据
// 用来接收所有平台属性数据的
const attrList = ref<AttrListModel>([])
// 用来接收spu下所拥有的销售属性数据
const spuSaleAttrList = ref<SpuSaleAttrListModel>([])
// 用来接收spu下所拥有的图片列表数据
const spuImageList = ref<SpuImageListModel>([])
const categoryStore = useCategoryStore()
// 用来存储table对象
const tableRef = ref<InstanceType<typeof ElTable>>()
// 获取form标签对象的
const formRef = ref<FormInstance>()
// 表单的验证规则
const rules = reactive<FormRules>({
  // sku的名称
  skuName: [{ required: true, message: '必须输入SKU名称', trigger: 'blur' }],
  // skuu的价格
  price: [{ required: true, message: '必须输入SKU的价格', trigger: 'blur' }],
  // sku的重量
  weight: [{ required: true, message: '必须输入SKU的重量', trigger: 'blur' }],
  // sku的描述
  skuDesc: [
    { required: true, message: '必须输入SKU描述信息', trigger: 'blur' }
  ],
  // sku的平台属性
  skuAttrValueList: [
    {
      type: 'array',
      required: true,
      message: '必须至少选择一个平台属性',
      trigger: 'change'
    }
  ],
  // sku的销售属性
  skuSaleAttrValueList: [
    {
      type: 'array',
      required: true,
      message: '必须至少选择一个销售属性',
      trigger: 'change'
    }
  ],
  // 图片
  skuImageList: [
    {
      type: 'array',
      required: true,
      message: '必须至少设置一个默认图片',
      trigger: 'change'
    }
  ]
})

// 界面加载完毕后,获取所有的平台属性数据
onMounted(async () => {
  attrList.value = await getAttrInfoListApi({
    category1Id: categoryStore.getCategory1Id,
    category2Id: categoryStore.getCategory2Id,
    category3Id: categoryStore.getCategory3Id
  })
})
// 界面加载完毕后,获取spu下所拥有的销售属性数组数据
onMounted(async () => {
  spuSaleAttrList.value = await getSpuSaleAttrListBySpuIdApi(props.spu.id)
})
// 界面记载完毕后,获取spu下所拥有的图片对象数组数据
onMounted(async () => {
  spuImageList.value = await getSpuImageListBySpuIdApi(props.spu.id)
  // 所有的图片都是非默认效果
  spuImageList.value?.forEach((item) => {
    item.isDefault = '0'
  })
  // 设置第一个图片是默认的效果
  spuImageList.value[0].isDefault = '1'
  // 设置表格中第一行的内容是选中的状态效果
  nextTick(() => {
    tableRef.value?.toggleRowSelection(spuImageList.value[0], true)
  })
  // 存储当前的这个图片的地址
  skuInfo.skuDefaultImg = spuImageList.value[0].imgUrl
})

// 设置某个图片为默认的
const setDefault = (row: SpuImageModel) => {
  // 遍历数组,设置每个图片为非默认状态
  spuImageList.value.forEach((item) => {
    item.isDefault = '0'
    tableRef.value?.toggleRowSelection(item, false)
  })
  // 当前的这个图片是默认的
  row.isDefault = '1'
  tableRef.value?.toggleRowSelection(row, true)
  // 存储当前的这个图片的地址
  skuInfo.skuDefaultImg = row.imgUrl
}

// 图片选中就执行的回调的函数
const handleSelectionChange = (val: SpuImageListModel) => {
  // 存储选中的图片数组
  skuInfo.skuImageList = val as SpuImageListModel
}

// 保存skuInfo对象
const saveSkuInfo = () => {
  formRef.value?.validate(async (valid) => {
    if (!valid) return false
    await addOrUpdateSkuInfoApi({
      ...skuInfo,
      spuId: props.spu.id, // spu的id
      category3Id: categoryStore.getCategory3Id, // 三级分类的id
      // 过滤平台属性数据
      skuAttrValueList: skuInfo.skuAttrValueList.map((item) => {
        // 把属性值id和属性id中间的_干掉
        const [valueId, attrId] = (item as any).split('_')
        return {
          valueId: +valueId,
          attrId: +attrId
        }
      }),
      // 过滤销售属性数据
      skuSaleAttrValueList: skuInfo.skuSaleAttrValueList.map((item) => ({
        saleAttrValueId: +item
      })),
      skuImageList: skuInfo.skuImageList.map((item) => ({
        imgName: item.imgName, // 图片名字
        imgUrl: item.imgUrl, // 图片地址
        isDefault: item.isDefault, // 是否默认的标识
        spuImgId: item.id // spu的图片的id
      }))
    })
    // 提示信息
    ElMessage.success('操作成功')
    // 关闭界面
    emits('setCurrentShowStatus', ShowStatus.SPU_LIST)
  })
}
</script>
<style scoped>
</style>