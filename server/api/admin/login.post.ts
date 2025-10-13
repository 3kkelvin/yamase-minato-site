import { signAdminJwt } from "~~/server/utils/jwt"
const { adminPassword } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const { password } = await readBody<{ password: string }>(event)

  if (password !== adminPassword) {// 驗證密碼
    throw createError({ statusCode: 401, statusMessage: 'Wrong password' })
  }

  const token = signAdminJwt()

  setCookie(event, 'admin_token', token, {// 簽發token
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60, // 60 分
    path: '/',
  })

  return { ok: true }
})
