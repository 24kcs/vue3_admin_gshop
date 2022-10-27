// 定义品牌对象的接口类型
export interface TrademarkModel {
  id?: number
  tmName: string
  logoUrl: string
}
// 定义品牌对象数组的接口类型
export type TrademarkListModel = TrademarkModel[]
// 定义品牌对象分页数组的接口类型
export interface TrademarkPageListModel {
  records: TrademarkListModel
  total: number
}
// 接口类型---使用interface定义的数据的类型  接口地址----enum枚举 接口函数---函数