import { getCookie } from "h3"
export default defineNuxtRouteMiddleware(async (to) => {
  // 只保護 /admin 及其子頁
  console.log('[middleware] 執行時機:', import.meta.client ? 'client' : 'server')

  if (!to.path.startsWith('/admin')) return

  const adminStore = useAdminStore()

  if (import.meta.server) {//SSR階段只檢查token是否存在 CSR階段檢查pinia登入狀態 進admin頁面再onmount檢查token正確性
    const event = useRequestEvent()
    if (event) {
      const token = getCookie(event, 'admin_token')
      if (!token) {
        return navigateTo('/admin/login') // 沒 cookie 才重導
      } else {
        adminStore.setLogin(true) //有token 就同步pinia狀態
      }
    } else {
      return navigateTo('/admin/login')
    }
  } else {
    if (!adminStore.isLoggedIn) {
      return navigateTo('/admin/login')
    }
  }
})
