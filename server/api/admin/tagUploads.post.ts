import { prisma } from '~~/server/utils/prisma'
import { defineEventHandler, readBody } from 'h3'
import type { AdminTagForm } from '~~/types/tag'

export default defineEventHandler(async (event) => {
  const body = await readBody<AdminTagForm>(event)

  if (body.id != null) {//若有ID 修改標籤
    const tag = await prisma.tag.update({
      where: { id: body.id },
      data: {
        name: body.name,
        refreshTime: new Date(),
      },
    })
    return { tag }
  }

  const tag = await prisma.tag.create({//若無ID 新增標籤
    data: {
      name: body.name,
    },
  })
  return { tag }
})
