import { PrismaClient, Prisma } from '~~/app/generated/prisma'

declare global {
  var _prisma: PrismaClient | undefined
}
// 初始化一次就好
export const prisma = globalThis._prisma ?? new PrismaClient({
  log: ['error', 'warn']
})
export type { Prisma }
if (process.env.NODE_ENV !== 'production') {
  globalThis._prisma = prisma
}
