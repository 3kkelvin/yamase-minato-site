import { prisma } from '~~/server/utils/prisma'
import type { ProductStateRequest, ProductStateResponse } from '~~/types/adminProduct'

export default defineEventHandler(async (event): Promise<ProductStateResponse> => {
  const body = await readBody<ProductStateRequest>(event)
  const { id, isDelete } = body

  if (typeof id !== 'number' || typeof isDelete !== 'boolean') {
    return { success: false, message: '參數格式錯誤' }
  }

  try {
    await prisma.product.update({
      where: { id },
      data: {
        isDelete,
        refreshTime: new Date()
      }
    })
    return { success: true, message: `商品${isDelete ? '下架' : '上架'}成功` }
  } catch (e: any) {
    return { success: false, message: '找不到商品或資料庫錯誤' }
  }
})
