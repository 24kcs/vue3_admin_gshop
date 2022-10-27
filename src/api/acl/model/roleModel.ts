// 角色
export interface RoleModel {
  id?: string; // id
  roleName: string; // 角色名字

  // 页面需要
  originRoleName?: string // 页面是否需要的标识
  edit?: boolean // 是否可进行编译
}

// 角色列表
export type RoleListModel = RoleModel[];

// 角色分页列表
export interface RolePageListModel {
  items: RoleListModel;
  total: number;
}

// 某个用户的角色列表
export interface UserRoleListModel {
  // 所有角色列表
  allRolesList: RoleListModel;
  // 分配的角色列表
  assignRoles: RoleListModel;
}
