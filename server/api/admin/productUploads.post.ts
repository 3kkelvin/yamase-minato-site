import { prisma } from '~~/server/utils/prisma'
import { defineEventHandler, readBody } from 'h3'
import type { AdminProductForm } from '~~/types/adminProduct'

export default defineEventHandler(async (event) => {
  const body = await readBody<AdminProductForm>(event)
  const connectOrCreateTags = body.tags.map(name => ({//所有的標籤
    where: { name },
    create: { name },
  }))

  if (body.id != null) {//若有ID 修改商品
    const product = await prisma.product.update({
      where: { id: body.id },
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
        price: body.price as number,
        url: body.url,
        releaseDate: body.releaseDate,
        refreshTime: new Date(),
        tags: {
          set: [], // 清空原標籤關聯
          connectOrCreate: connectOrCreateTags,
        },
      },
    })
    return { product }
  }

  const product = await prisma.product.create({//若無ID 新增商品
    data: {
      title: body.title,
      imageUrl: body.imageUrl,
      price: body.price as number,
      url: body.url,
      releaseDate: body.releaseDate,
      tags: {
        connectOrCreate: connectOrCreateTags
      },
    },
  })
  return { product }
})
