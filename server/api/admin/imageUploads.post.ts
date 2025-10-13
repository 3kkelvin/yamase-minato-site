import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { extname } from 'node:path'
import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  if (!parts || !parts.length) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }
  const part = parts.find(p => p.name === 'file')
  if (!part) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }
  if (!part.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Filename is missing' })
  }

  // 生成 UUID 檔名並保留副檔名
  const ext = extname(part.filename)
  const uuidName = `${crypto.randomUUID()}${ext}`
  const storage = useStorage('uploads')
  await storage.setItemRaw(uuidName, part.data)
  return { url: `/api/image/${uuidName}` }
})