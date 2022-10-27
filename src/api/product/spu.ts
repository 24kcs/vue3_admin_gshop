// 引入request
import request from '@/utils/request'
// 引入类型
import type { BaseSaleAttrListModel, SpuModel, SpuListModel, SpuPageListModel, SpuPageListParamsModel, SpuSaleAttrListModel, SpuImageListModel } from './model/spuModel'
// 定义枚举类型的地址
enum Api {
  // 获取基础的销售属性数组数据的接口地址
  GetBaseSaleAttrList = '/admin/product/baseSaleAttrList',
  // 根据id删除对应的spu对象的接口地址
  DeleteSpuInfoById = '/admin/product/deleteSpu',
  // 根据关键字获取spu对象数组数据的接口地址
  GetSpuInfoListByKeyword = '/admin/product/findSpuInfoByKeyword',
  // 根据id获取spu的对象数据的接口地址
  GetSpuInfoById = '/admin/product/getSpuInfo',
  // 根据id的数组获取对应的spu对象数组数据的接口地址
  GetSpuInfoListByIds = '/admin/product/inner/findSpuInfoBySpuIdList',
  // 添加spu的接口地址
  AddSpuInfo = '/admin/product/saveSpuInfo',
  // 修改spu的接口地址
  UpdateSpuInfo = '/admin/product/updateSpuInfo',
  // 根据页码和每页的条数及三级分类的id获取spu对象数组数据的接口地址
  GetSpuInfoList = '/admin/product',
  // 根据spu的id获取对应的图片列表数据的接口地址
  GetSpuImageListBySpuId = '/admin/product/spuImageList',
  // 根据spu的id获取对应的销售属性列表数据的接口地址
  GetSpuSaleAttrListBySpuId = '/admin/product/spuSaleAttrList'
}
// 获取基础的销售属性数组数据的接口函数
export const getBaseSaleAttrListApi = () => request.get<any, BaseSaleAttrListModel>(Api.GetBaseSaleAttrList)
// 根据id删除对应的spu对象的接口函数
export const deleteSpuInfoByIdApi = (spuId: number) => request.delete<any, null>(Api.DeleteSpuInfoById + `/${spuId}`)
// 根据关键字获取spu对象数组数据的接口函数
export const getSpuInfoListByKeywordApi = (keyword: string) => request.get<any, SpuListModel>(Api.GetSpuInfoListByKeyword + `/${keyword}`)
// 根据id获取spu的对象数据的接口函数
export const getSpuInfoByIdApi = (spuId: number) => request.get<any, SpuModel>(Api.GetSpuInfoById + `/${spuId}`)
// 根据id的数组获取对应的spu对象数组数据的接口函数
export const getSpuInfoListByIdsApi = (ids: number[]) => request.post<any, SpuListModel>(Api.GetSpuInfoListByIds, ids)
// 添加spu的接口函数
export const addSpuInfoApi = (spuInfo: SpuModel) => request.post<any, null>(Api.AddSpuInfo, spuInfo)
// 修改spu的接口函数
export const updateSpuInfoApi = (spuInfo: SpuModel) => request.post<any, null>(Api.UpdateSpuInfo, spuInfo)
// 根据页码和每页的条数及三级分类的id获取spu对象数组数据的接口函数
export const getSpuInfoListApi = ({ page, limit, category3Id }: SpuPageListParamsModel) => request.get<any, SpuPageListModel>(Api.GetSpuInfoList + `/${page}/${limit}`, { params: { category3Id } })
// 根据spu的id获取对应的图片列表数据的接口函数
export const getSpuImageListBySpuIdApi = (spuId: number) => request.get<any, SpuImageListModel>(Api.GetSpuImageListBySpuId + `/${spuId}`)
// 根据spu的id获取对应的销售属性列表数据的接口函数
export const getSpuSaleAttrListBySpuIdApi = (spuId: number) => request.get<any, SpuSaleAttrListModel>(Api.GetSpuSaleAttrListBySpuId + `/${spuId}`)
// 添加或者修改spu
// export const addOrUpdateSpuInfo = (spuInfo: SpuModel) => { 
//   // 第一种写法
//   // if (spuInfo.id) {
//   //   // 修改
//   //   return updateSpuInfoApi(spuInfo)
//   // } else { 
//   //   // 添加
//   //   return addSpuInfoApi(spuInfo)
//   // }
//   // 第二种写法
//   return spuInfo.id?updateSpuInfoApi(spuInfo):addSpuInfoApi(spuInfo)
// }
// 第三种写法
export const addOrUpdateSpuInfoApi = (spuInfo: SpuModel) => spuInfo.id ? updateSpuInfoApi(spuInfo) : addSpuInfoApi(spuInfo)