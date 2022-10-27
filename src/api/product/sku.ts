// 引入request
import request from '@/utils/request'
// 引入类型
import type { SkuInfoModel, SkuInfoListModel, SkuPageListParamsModel } from './model/skuModel'
// 定义枚举类型的接口地址
enum Api {
  OnSale = '/admin/product/onSale', // 上架的接口地址
  CancelSale = '/admin/product/cancelSale', // 下架的接口地址
  DeleteSkuInfoById = '/admin/product/deleteSku', // 根据id删除sku对象的接口地址
  GetSkuInfoListBySpuId = '/admin/product/findBySpuId', // 根据spu的id获取sku对象的数组列表数据的接口地址
  GetSkuInfoById = '/admin/product/getSkuById', // 根据sku的id获取对应的sku对象的接口地址
  GetSkuInfoListByKeword = '/admin/product/inner/findSkuInfoByKeyword', // 根据关键字获取sku对象数组列表数据的接口地址
  GetSkuInfoListByIds = '/admin/product/inner/findSkuInfoBySkuIdList', // 根据id数组获取sku对象数组列表数据的接口地址
  GetSkuInfoList = '/admin/product/list', // 分页的方式获取sku列表数据的接口地址
  AddSkuInfo = '/admin/product/saveSkuInfo', // 添加sku对象的接口地址
  UpdateSkuInfo = '/admin/product/updateSkuInfo', // 修改sku对象的接口地址  
}
// 上架的接口函数
export const onSaleApi = (skuId: number) => request.get<any, null>(Api.OnSale + `/${skuId}`)
// 下架的接口函数
export const cancelSaleApi = (skuId: number) => request.get<any, null>(Api.CancelSale + `/${skuId}`)
// 根据id删除sku对象的接口函数
export const deleteSkuInfoByIdApi = (skuId: number) => request.delete<any, null>(Api.DeleteSkuInfoById + `/${skuId}`)
// 根据spu的id获取sku对象的数组列表数据的接口函数
export const getSkuInfoListBySpuIdApi = (spuId: number) => request.get<any, SkuInfoListModel>(Api.GetSkuInfoListBySpuId + `/${spuId}`)
// 根据sku的id获取对应的sku对象的接口函数
export const getSkuInfoByIdApi = (skuId: number) => request.get<any, SkuInfoModel>(Api.GetSkuInfoById + `/${skuId}`)
// 根据关键字获取sku对象数组列表数据的接口函数
export const getSkuInfoListByKewordApi = (keyword: string) => request.get<any, SkuInfoListModel>(Api.GetSkuInfoListByKeword + `/${keyword}`)
// 根据id数组获取sku对象数组列表数据的接口函数
export const getSkuInfoListByIdsApi = (ids: number[]) => request.post<any, SkuInfoListModel>(Api.GetSkuInfoListByIds, ids)
// 分页的方式获取sku列表数据的接口地址
export const getSkuInfoListApi = (page: number, limit: number) => request.get<any, SkuPageListParamsModel>(Api.GetSkuInfoList + `/${page}/${limit}`)
// 添加sku对象的接口函数
export const addSkuInfoApi = (skuInfo: SkuInfoModel) => request.post<any, null>(Api.AddSkuInfo, skuInfo)
// 修改sku对象的接口函数
export const UpdateSkuInfoApi = (skuInfo: SkuInfoModel) => request.post<any, null>(Api.UpdateSkuInfo, skuInfo)
// 添加或者修改sku数据的接口函数
export const addOrUpdateSkuInfoApi = (skuInfo: SkuInfoModel) => skuInfo.id ? UpdateSkuInfoApi(skuInfo) : addSkuInfoApi(skuInfo)
// 添加或者修改sku数据的接口函数
// export const addOrUpdateSkuInfo1 = (skuInfo:SkuInfoModel) => { 
//   if (skuInfo.id) {
//     return UpdateSkuInfo(skuInfo)
//   } else { 
//     return addSkuInfoApi(skuInfo)
//   }
// }
