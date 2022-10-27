// 引入App类型
import type { App } from 'vue' 
// 引入按钮的标识数组
import { useUserInfoStore } from '@/stores/userInfo'
// 暴露出去一个函数
export default (app:App) => { 
  // 自定义指令
  app.directive('has', {
    // 生命周期钩子  <p v-has="xxx"></p>
    mounted(el, binding) { 
      // 按钮上使用v-has指令,传进来的是一个按钮的标识 <button v-has="'btn.Attr.xxxxx'">添加属性</button>
      // 获取按钮标识数组
      const userInfoStore = useUserInfoStore()
      // 判断按钮标识数组中是否有传入进来的字符串标识信息
      if (!userInfoStore.authBtnList.includes(binding.value)) { 
        // 自杀
        el.parentNode.removeChild(el)
      }
    }
  })
}