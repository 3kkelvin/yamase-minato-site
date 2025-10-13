import { prisma } from '~~/server/utils/prisma'
import type { TagDeleteRequest, TagDeleteResponse } from '~~/types/tag'

export default defineEventHandler(async (event): Promise<TagDeleteResponse> => {
  const body = await readBody<TagDeleteRequest>(event)
  const { id } = body

  if (typeof id !== 'number') {
    return { success: false, message: '參數格式錯誤' }
  }

  try {
    await prisma.tag.update({
      where: { id },
      data: {
        isDelete: true,
        refreshTime: new Date()
      }
    })
    return { success: true, message: '標籤已刪除' }
  } catch (e: any) {
    return { success: false, message: '找不到標籤或資料庫錯誤' }
  }
})