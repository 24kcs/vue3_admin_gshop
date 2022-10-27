// 引入创建仓库对象的函数
import { defineStore } from 'pinia'
// 引入分类相关的接口函数
import { getCategory1ListApi, getCategory2ListApi, getCategory3ListApi } from '@/api/product/category'
// 引入分类相关的数据接口类型
import type { CategoryListModel, CategoryModel, CategoryIdModel, Numberable } from '@/api/product/model/categoryModel'
// 定义一个接口类型，限制state中数据的类型
export interface CategoryStateModel extends CategoryIdModel {
  category1List: CategoryListModel
  category2List: CategoryListModel
  category3List: CategoryListModel
}
// 创建仓库
export const useCategoryStore = defineStore({
  id: 'category',
  // 状态数据
  state: (): CategoryStateModel => ({
    category1Id: undefined, // 一级分类的id
    category2Id: undefined, // 二级分类的id
    category3Id: undefined, // 三级分类的id
    category1List: [], // 一级分类的列表数据
    category2List: [], // 二级分类的列表数据
    category3List: [], // 三级分类的列表数据
  }),
  // 计算属性
  getters: {
    // 获取一级分类的id
    getCategory1Id(): Numberable { return this.category1Id as number },
    // 获取二级分类的id
    getCategory2Id(): Numberable { return this.category2Id as number },
    // 获取三级分类的id
    getCategory3Id():Numberable {return this.category3Id as number },
    // 获取一级分类的列表数据
    getCategoryList1(): CategoryListModel{ return this.category1List },
    // 获取二级分类的列表数据
    getCategoryList2(): CategoryListModel{ return this.category2List },
    // 获取三级分类的列表数据
    getCategoryList3() :CategoryListModel{return this.category3List }
  },
  actions: {
    // 调用接口发送请求，获取一级分类列表数据
    async getCategory1List() { 
      this.category1List = await getCategory1ListApi()
    },
    // 调用接口发送请求，获取二级分类列表数据
    async getCategory2List(category1Id: number) { 
      // 先存储一级分类的id值
      this.category1Id = category1Id
      this.category2List = await getCategory2ListApi(category1Id)
      // 干掉二级分类的id和三级分类的id及三级分类的列表数据
      this.category2Id = undefined
      this.category3Id = undefined
      this.category3List=[]
    },
    // 调用接口发送请求，获取三级分类列表数据
    async getCategory3List(category2Id: number) { 
      // 先存储二级分类的id值
      this.category2Id = category2Id
      this.category3List = await getCategory3ListApi(category2Id)
      // 干掉三级分类的id
      this.category3Id = undefined
    },
  }
})
// 暴露出去
export default useCategoryStore
