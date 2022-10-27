import type { RouteRecordRaw } from "vue-router";

// 用户信息包括权限数据
export interface UserInfoState {
  token: string; // token
  avatar: string; // 头像
  name: string; // 用户的昵称

  menuRoutes: RouteRecordRaw[], // 用于生成导航菜单的路由列表
  roles: string[], // 角色名字数组
  authBtnList:string[] // 按钮标识数组
}




