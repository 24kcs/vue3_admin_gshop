<template>
  <el-form inline>
    <el-form-item label="一级分类">
      <!--select下拉框中的value属性中存储的是option选项中的数据的value值-->
      <el-select v-model="category1Id" placeholder="请选择" :disabled="isDisabled">
        <el-option v-for="(c1,index) in categoryStore.category1List" :key="c1.id" :label="c1.name" :value="c1.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select v-model="category2Id" placeholder="请选择" :disabled="isDisabled">
        <el-option v-for="(c2,index) in categoryStore.category2List" :key="c2.id" :label="c2.name" :value="c2.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select v-model="categoryStore.category3Id" placeholder="请选择" :disabled="isDisabled">
        <el-option v-for="(c3,index) in categoryStore.category3List" :key="c3.id" :label="c3.name" :value="c3.id" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
export default {
  name: 'CategorySelector'
}
</script>
<script lang="ts" setup>
// 引入分类的仓库对象的函数
import { useCategoryStore } from '@/stores/category'
import { onMounted, computed } from 'vue'
// 获取分类的仓库对象
const categoryStore = useCategoryStore()
// 界面加载完毕后，获取一级分类列表数据
onMounted(() => {
  categoryStore.getCategory1List()
})
// 计算属性一级分类的id
const category1Id = computed({
  get() {
    return categoryStore.getCategory1Id as number
  },
  set(val: number) {
    // 直接获取二级分类的数据
    categoryStore.getCategory2List(val)
  }
})
// 计算属性二级分类的id
const category2Id = computed({
  get() {
    return categoryStore.getCategory2Id as number
  },
  set(val: number) {
    // 直接获取二级分类的数据
    categoryStore.getCategory3List(val)
  }
})
// 接收父级组件传递进来的数据
defineProps({
  isDisabled:{
    type:Boolean,
    default:false
  }
})
</script>
<style scoped>
</style>