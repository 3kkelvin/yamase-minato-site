//取得所有商品
import { prisma } from '~~/server/utils/prisma'
import type { TagListResponse, Tag } from '~~/types/tag'

export default defineEventHandler(async (event): Promise<TagListResponse> => {
  // 查詢
  const tags = await prisma.tag.findMany({
    where: { isDelete: false },
    select: {
      id: true,
      name: true,
    }
  }) as Tag[]

  return { data: tags }
})