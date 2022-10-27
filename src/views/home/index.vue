<template>
  <div class="home">
    <top-view /> <!--头部组件-->
    <middle-view /> <!--中间部分组件-->
    <bottom-view /> <!--底部组件-->
  </div>
</template>

<script lang="ts">
export default {
  name: 'Home',
}
</script>
<script lang="ts" setup>
    // 引入头部组件
import TopView from './components/TopView.vue'
// 引入中间的组件
import MiddleView from './components/MiddleView.vue'
// 引入底部组件
import BottomView from './components/BottomView.vue'
// 引入可视化数据的仓库
import { useDataStore } from '@/stores/reportData';
// 引入组件的钩子
import { onMounted } from 'vue';
// 获取数据可视化的仓库对象
const dataStore = useDataStore()
// 页面加载后调用接口,发送异步请求,获取数据
onMounted(() => dataStore.getData())
</script>

<style scoped>
  .home {
    width: 100%;
    padding: 20px;
    background: #eee;
  }
</style>
