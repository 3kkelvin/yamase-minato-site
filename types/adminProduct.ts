import type { Product } from './product'

//後台商品上傳 同時也是request
export interface AdminProductForm {
  id: number | null
  title: string
  imageUrl: string
  price: number | null
  url: string
  releaseDate: Date
  tags: string[]
}
//後台商品 同時也是response
export interface AdminProduct extends Product {
  releaseDate: Date
  createTime: Date
  refreshTime: Date 
  isDelete: boolean
}
//後台列表
export interface AdminProductListRequest {
  page?: number
  limit?: number
  search?: string // 標題搜尋
  isDelete?: boolean // isDelete; true=下架, false=上架
  sortBy?: 'price' | 'views' | 'createTime' | 'refreshTime' | 'id' | 'releaseDate'
  sortOrder?: 'asc' | 'desc'
}
export interface AdminProductListResponse {
  data: AdminProduct[]
  total: number
}
//上下架
export interface ProductStateRequest {
  id: number
  isDelete: boolean
}
export interface ProductStateResponse {
  success: boolean
  message?: string
}
//刪除
export interface ProductDeleteRequest {
  id: number
}
export interface ProductDeleteResponse {
  success: boolean
  message?: string
}
