//取得所有商品
import { prisma, type Prisma } from '~~/server/utils/prisma'
import type { ProductListRequest, ProductListResponse } from '~~/types/product'

export default defineEventHandler(async (event): Promise<ProductListResponse> => {
  const body = await readBody<ProductListRequest>(event)
  const limit = Number(body.limit) || 10
  const page = Number(body.page) || 1
  const mode = body.mode || 'time'
  const sort = body.sort || 'desc'
  const tag = body.tag

  let where: Prisma.ProductWhereInput = { isDelete: false }
  if (tag) { // 如果有傳入標籤
    where = {
      ...where,
      tags: {
        some: {
          name: tag,
          isDelete: false,
        },
      },
    };
  }

  // 排序
  let orderBy: Prisma.ProductOrderByWithRelationInput[] = [{ id: 'desc' }]
  if (mode === 'price') orderBy = [{ price: sort }, { id: 'desc' }]
  else if (mode === 'views') orderBy = [{ views: sort }, { id: 'desc' }]
  else orderBy = [{ releaseDate: sort }, { id: 'desc' }]

  // 查詢
  const productsRaw = await prisma.product.findMany({
    where,
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      title: true,
      price: true,
      imageUrl: true,
      url: true,
      views: true,
      tags: {
        where: { isDelete: false },
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  const products = productsRaw.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    imageUrl: p.imageUrl,
    url: p.url,
    views: p.views,
    tags: (p.tags ?? []).map((t) => t.name),
  }))

  // 取得總數
  const total = await prisma.product.count({
    where: { isDelete: false }
  })

  return {
    data: products,
    total,
    page,
    limit
  }
})
