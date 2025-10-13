import { prisma } from '~~/server/utils/prisma'
import type { ProductDeleteRequest, ProductDeleteResponse } from '~~/types/adminProduct'

export default defineEventHandler(async (event): Promise<ProductDeleteResponse> => {
  const body = await readBody<ProductDeleteRequest>(event)
  const { id } = body

  if (typeof id !== 'number') {
    return { success: false, message: '參數格式錯誤' }
  }

  try {
    await prisma.product.delete({
      where: { id }
    })
    return { success: true, message: '商品已刪除' }
  } catch (e: any) {
    return { success: false, message: '找不到商品或資料庫錯誤' }
  }
})
