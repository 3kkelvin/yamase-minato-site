//點擊作品，觀看數+1
import { prisma } from '~~/server/utils/prisma'
export default defineEventHandler(async (event) => {
  // 取得POST body
  const body = await readBody(event)
  const id = Number(body.id)
  if (isNaN(id)) return { success: false, message: 'Invalid id' }
  
  try {
    const updated = await prisma.product.update({
      where: { id },
      data: { views: { increment: 1 }}//更新views +1
    })
    return { success: true, views: updated.views }
  } catch (error) {
    return { success: false, message: 'Product not found or error', error: String(error) }
  }
})
