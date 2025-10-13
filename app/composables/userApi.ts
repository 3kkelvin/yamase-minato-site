import type { ProductListRequest, ProductListResponse } from '~~/types/product'
import type { TagListResponse } from '~~/types/tag'
//瀏覽次數
export async function trackProductClick(id: number): Promise<void> {
  await $fetch('/api/click', {
    method: 'POST',
    body: { id }
  })
}
//取得商品列表
export async function getProductList(query: ProductListRequest): Promise<ProductListResponse> {
  return await $fetch<ProductListResponse>('/api/productList', {
    method: 'POST',
    body: query,
  })
}

//取得標籤列表
export async function getTagList(): Promise<TagListResponse> {
  return await $fetch<TagListResponse>('/api/tagList', {
    method: 'POST',
  })
}