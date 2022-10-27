// 定义登录成功返回的token信息的对象类型
export interface LoginResponseModel { 
  token:string
}
// 定义登录成功后获取的用户信息数据的对象类型
export interface LoginUserResponseModel { 
  routes: string[] // 路由名字数组信息
  buttons: string[] // 按钮标识名字数组信息
  roles: string[] // 用户角色列表数组信息
  name: string // 用户名字信息
  avatar:string // 头像信息
}