// 定义用户信息对象(管理员对象)
export interface UserModel {
  id?: string; // 用户id
  roleName?: string[]; // 用户的角色数组名字
  username: string; // 用户名字
  nickName: string; // 昵称
  password: string; // 密码
}

// 管理员用户列表
export type UserListModel = UserModel[];

// 管理员用户分页列表
export interface UserPageListModel {
  items: UserListModel; // 用户列表数据
  total: number; // 总条数
}
