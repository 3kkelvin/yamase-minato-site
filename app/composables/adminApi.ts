import type { AdminProduct, AdminProductForm, AdminProductListRequest, AdminProductListResponse } from '~~/types/adminProduct'
import type { AdminTagForm, Tag } from '~~/types/tag'
//登入
export async function adminLogin(password: string): Promise<void> {
  await $fetch('/api/admin/login', {
    method: 'POST',
    body: { password },
  })
}
//檢查登入
export async function pingAdmin(): Promise<void> {
  await $fetch('/api/admin/ping', { 
    method: 'POST' 
  })
}
//登出
export async function logoutAdmin(): Promise<void> {
  await $fetch('/api/admin/logout', { 
    method: 'POST' 
  })
}
//取得商品
export async function getAdminProductList(query: AdminProductListRequest): Promise<AdminProductListResponse> {
  return await $fetch('/api/admin/productList', {
    method: 'POST',
    body: query,
  })
}
//圖片上傳
export async function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData()
  formData.append('file', file)
  return await $fetch('/api/admin/imageUploads', {
    method: 'POST',
    body: formData,
  })
}
//商品上傳、編輯
export async function createProduct(payload: AdminProductForm): Promise<{ product: AdminProduct }> {
  return await $fetch('/api/admin/productUploads', {
    method: 'POST',
    body: payload,
  })
}
//商品上下架
export async function toggleProductState(id: number, isDelete: boolean): Promise<void> {
  await $fetch('/api/admin/productState', {
    method: 'POST',
    body: { id, isDelete },
  });
}
//商品真刪除
export async function deleteProduct(id: number): Promise<void> {
  await $fetch('/api/admin/productDelete', {
    method: 'POST',
    body: { id },
  });
}
//標籤新增、編輯
export async function createTag(payload: AdminTagForm): Promise<{ tag: Tag }> {
  return await $fetch('/api/admin/tagUploads', {
    method: 'POST',
    body: payload,
  })
}
//標籤真刪除
export async function deleteTag(id: number): Promise<void> {
  await $fetch('/api/admin/tagDelete', {
    method: 'POST',
    body: { id },
  });
}