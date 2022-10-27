// spu的销售属性值对象的接口类型
export interface SpuSaleAttrValueModel {
  id?: number // id
  spuId?: number // spu的id
  saleAttrName?: string // 销售属性对象的名字
  isChecked?: boolean // 是否需要
  baseSaleAttrId: number // 销售属性对象的id
  saleAttrValueName: string // 销售属性值的名字
}
// spu的销售属性值对象数组的接口类型
export type SpuSaleAttrValueListModel = SpuSaleAttrValueModel[]
// spu的销售属性对象的接口类型
export interface SpuSaleAttrModel {
  id?: number // id
  spuId?: number // spu的id
  spuSaleAttrValueList: SpuSaleAttrValueListModel // 销售属性值对象数组
  saleAttrName: string // 销售属性名字
  baseSaleAttrId: number // 所属的id
  isShowEdit?:boolean
}
// spu的销售属性对象数组的接口类型
export type SpuSaleAttrListModel = SpuSaleAttrModel[]
// spu的图片对象的接口类型
export interface SpuImageModel {
  id?: number // id
  spuId?: number // spu的id
  imgName: string // 图片的名字
  imgUrl: string // 图片的地址

  name?: string // 上传图片的名字
  url?: string // 上传图片的地址
  response?: { // 上传图片响应的数据
    data: string
  }
  isDefault?: string // 是否是默认的图片
}
// spu的图片对象数组的接口类型
export type SpuImageListModel = SpuImageModel[]
// spu的对象的接口类型
export interface SpuModel {
  id?: number // id
  category3Id?: number // 三级分类的id
  tmId?: number // 品牌的id
  spuName: string // spu的名字
  description: string // spu的描述
  spuSaleAttrList: SpuSaleAttrListModel // spu的销售属性对象数组
  spuImageList: SpuImageListModel // spu的图片对象数组
}
// spu的对象数组的接口类型
export type SpuListModel = SpuModel[]
// 基础的销售属性对象的接口类型
export interface BaseSaleAttrModel {
  id?: number // id
  name: string // 名字
}
// 基础的销售属性对象数组的接口类型
export type BaseSaleAttrListModel = BaseSaleAttrModel[]
// spu对象数组的分页形式的接口类型
export interface SpuPageListModel {
  records: SpuListModel // spu对象数组数据
  total: number // 总条数据
}

// 定义spu分页接口函数所需要的参数的接口类型
export interface SpuPageListParamsModel {
  page: number
  limit: number
  category3Id: number
}