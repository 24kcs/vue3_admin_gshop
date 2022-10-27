// 定义平台属性值对象接口类型
export interface AttrValueModel {
  id?: number // id
  valueName: string // 属性值的名字 
  attrId: number // 所对应的平台属性对象的id
  isShowEdit?: boolean // 用来标识当前的属性值是查看模式还是编辑模式
}
// 定义平台属性值对象数组接口类型
export type AttrValueListModel = AttrValueModel[]
// 定义平台属性对象接口类型
export interface AttrModel {
  id?: number // id
  attrName: string // 名字
  categoryId: number // 分类的id
  categoryLevel: number // 分类的级别
  attrValueList: AttrValueListModel // 平台属性值对象数组
}
// 定义平台属性对象数组接口类型
export type AttrListModel = AttrModel[]