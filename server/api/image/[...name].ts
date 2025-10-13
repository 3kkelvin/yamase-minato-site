import { defineEventHandler, createError, sendStream } from 'h3'
import { Readable } from 'node:stream'

export default defineEventHandler(async (event) => {
  const name = event.context.params?.name // UUID 無需 decode
  if (!name) {
    throw createError({ statusCode: 404, statusMessage: 'Name not found' })
  }
  const storage = useStorage('uploads')
  const data = await storage.getItemRaw(name)
  if (!data) {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }
  return sendStream(event, Readable.from(data))
})