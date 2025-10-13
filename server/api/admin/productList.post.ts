import { prisma, type Prisma } from '~~/server/utils/prisma'
import type { AdminProductListRequest, AdminProductListResponse } from '~~/types/adminProduct'

export default defineEventHandler(async (event): Promise<AdminProductListResponse> => {
  const body = await readBody<AdminProductListRequest>(event)

  const page = Math.max(1, Number(body.page ?? 1))
  const limit = Math.min(100, Math.max(1, Number(body.limit ?? 20)))
  const search = (body.search ?? '').trim()
  const sortBy = (body.sortBy ?? 'refreshTime') as AdminProductListRequest['sortBy']
  const sortOrder = (body.sortOrder ?? 'desc') as Prisma.SortOrder

  // where 條件
  const where: Prisma.ProductWhereInput = {}
  if (search) {
    where.title = { contains: search }
  }
  if (typeof body.isDelete === 'boolean') {
    where.isDelete = body.isDelete
  }

  // orderBy
  let orderBy: Prisma.ProductOrderByWithRelationInput[] = [{ id: 'desc' }]
  switch (sortBy) {
    case 'price':
      orderBy = [{ price: sortOrder }, { id: 'desc' }]
      break
    case 'views':
      orderBy = [{ views: sortOrder }, { id: 'desc' }]
      break
    case 'releaseDate':
      orderBy = [{ releaseDate: sortOrder }, { id: 'desc' }]
      break
    case 'createTime':
      orderBy = [{ createTime: sortOrder }, { id: 'desc' }]
      break
    case 'refreshTime':
      orderBy = [{ refreshTime: sortOrder }, { id: 'desc' }]
      break
    case 'id':
    default:
      orderBy = [{ id: sortOrder }]
      break
  }

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
      releaseDate: true,
      createTime: true,
      refreshTime: true,
      isDelete: true,
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
    releaseDate: p.releaseDate,
    createTime: p.createTime,
    refreshTime: p.refreshTime,
    isDelete: p.isDelete,
    tags: (p.tags ?? []).map((t) => t.name),
  }))

  const total = await prisma.product.count({
    where: { isDelete: false }
  })

  return {
    data: products,
    total,
  }
})
