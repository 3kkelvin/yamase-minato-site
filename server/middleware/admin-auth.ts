import { verifyAdminJwt } from "../utils/jwt";

export default eventHandler((event) => {
  if (
    event.path?.startsWith('/api/admin') &&
    !event.path?.startsWith('/api/admin/login') &&
    !event.path?.startsWith('/api/admin/logout')
  ) {
    verifyAdminJwt(event)
    // 驗證失敗會 throw，request 終止並回 401
  }
})
