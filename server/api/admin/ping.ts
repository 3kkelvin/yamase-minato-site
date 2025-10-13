export default defineEventHandler((event) => {
  //verifyAdminJwt(event)   //驗證函式 debug用
  return { ok: true }
})
