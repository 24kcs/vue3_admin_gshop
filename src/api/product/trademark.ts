// 引入request
import request from '@/utils/request'
// 引入对应接口类型
import type { TrademarkModel, TrademarkListModel, TrademarkPageListModel } from './model/trademarkModel'
// 定义枚举类型的接口地址
enum Api {
  // 根据关键字获取品牌列表数组数据的接口地址
  GetTrademarkListByKeyword = '/admin/product/baseTrademark/findBaseTrademarkByKeyword',
  // 根据品牌的id获取品牌对象的接口地址
  GetTrademarkById = '/admin/product/baseTrademark/get',
  // 获取所有的品牌列表数据的接口地址
  GetTrademarkListAll = '/admin/product/baseTrademark/getTrademarkList',
  // 根据id的数组获取品牌列表数据的接口地址
  GetTrademarkListByIds = '/admin/product/baseTrademark/inner/findBaseTrademarkByTrademarkIdList',
  // 根据品牌的id删除品牌对象的接口地址
  DeleteTrademarkById = '/admin/product/baseTrademark/remove',
  // 新增品牌的接口地址
  AddTrademark = '/admin/product/baseTrademark/save',
  //修改品牌的接口地址
  UpdateTrademark = '/admin/product/baseTrademark/update',
  // 根据页码和每页的条数获取品牌对象数组列表数据的接口地址
  GetTrademarkList = '/admin/product/baseTrademark'
}
// 封装接口函数
// 根据关键字获取品牌列表数组数据的接口函数
export const getTrademarkListByKeywordApi = (keyword: string) => request.get<any, TrademarkListModel>(Api.GetTrademarkListByKeyword + `/${keyword}`)
// 根据id获取品牌对象数据的接口函数
export const getTrademarkByIdApi = (id: number) => request.get<any, TrademarkModel>(Api.GetTrademarkById + `/${id}`)
// 获取所有品牌列表数组数据的接口函数
export const getTrademarkListAllApi = () => request.get<any, TrademarkListModel>(Api.GetTrademarkListAll)
/**
 * 该函数的作用是获取品牌列表的数据(ids的方式)
 * @param ids id的数组
 * @returns 返回的是品牌列表数组数据
 */
export const getTrademarkListByIdsApi = (ids: number[]) => request.post<any, TrademarkListModel>(Api.GetTrademarkListByIds, ids)
// 根据id删除对应的品牌对象的接口函数
export const deleteTrademarkByIdApi = (id: number) => request.delete<any, null>(Api.DeleteTrademarkById + `/${id}`)
// 新增一个品牌对象的接口函数
export const addTrademarkApi = (trademark: TrademarkModel) => request.post<any, null>(Api.AddTrademark, trademark)
// 修改一个品牌对象的接口函数
export const updateTrademarkApi = (trademark: TrademarkModel) => request.put<any, null>(Api.UpdateTrademark, trademark)
// 根据页码和每页的条数获取品牌对象数组数据的接口函数
export const getTrademarkListApi = (page: number, limit: number) => request.get<any, TrademarkPageListModel>(Api.GetTrademarkList + `/${page}/${limit}`)

// 新增或者修改品牌对象
export const addOrUpdateTrademarkApi = (trademark: TrademarkModel) => {
  if (trademark.id) { // 修改
    return request.put<any, null>(Api.UpdateTrademark, trademark)
  } else { // 新增
    return request.post<any, null>(Api.AddTrademark, trademark)
  }
}
