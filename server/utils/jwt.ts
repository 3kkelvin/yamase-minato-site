import jwt from 'jsonwebtoken'
import { H3Event, createError } from 'h3'
const { jwtSecert } = useRuntimeConfig()

const secret = jwtSecert!

export interface AdminJwtPayload {
  role: 'admin'
}

/** 簽發 60 分鐘效期的 JWT */
export function signAdminJwt(): string {
  return jwt.sign({ role: 'admin' } as AdminJwtPayload, secret, {
    expiresIn: '60m'
  })
}

/** 解析並驗證；失敗就 throw 401 */
export function verifyAdminJwt(event: H3Event): AdminJwtPayload {
  const token = getCookie(event, 'admin_token')
  try {
    return jwt.verify(token || '', secret) as AdminJwtPayload
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
