// 引入request
import request from '@/utils/request'
// 引入三级分类相关的类型
import type { CategoryModel, CategoryListModel } from './model/categoryModel'
// 定义枚举类型的接口地址
enum Api { 
  GetCategory1List='/admin/product/getCategory1', // 获取一级分类列表数据的地址
  GetCategory2List='/admin/product/getCategory2', // 获取一级分类列表数据的地址
  GetCategory3List='/admin/product/getCategory3' // 获取一级分类列表数据的地址
}
// 定义分类相关的接口函数
// 获取一级分类列表数据的接口函数
export const getCategory1ListApi = () => request.get<any, CategoryListModel>(Api.GetCategory1List)
// 获取二级分类列表数据的接口函数
export const getCategory2ListApi = (category1Id: number) => request.get<any, CategoryListModel>(Api.GetCategory2List + `/${category1Id}`)
// 获取三级分类列表数据的接口函数
export const getCategory3ListApi = (category2Id:number)=>request.get<any,CategoryListModel>(Api.GetCategory3List+`/${category2Id}`)