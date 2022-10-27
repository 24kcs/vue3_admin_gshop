// 设置token的key
const TokenKey = 'vue_admin_gshop'
// 从缓存中读取token信息
export function getToken() {
  return localStorage.getItem(TokenKey)
}
// 把token信息存储到缓存中
export function setToken(token: string) {
  return localStorage.setItem(TokenKey, token)
}
// 移除token
export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
