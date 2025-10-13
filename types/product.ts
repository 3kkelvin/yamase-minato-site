export interface Product {
  id: number
  title: string
  price: number
  imageUrl: string
  url: string
  views: number
  tags: string[]
}

export interface ProductListRequest {
  limit?: number
  page?: number
  mode?: 'time' | 'price' | 'views'
  sort?: 'asc' | 'desc'
  tag?: string
}

export interface ProductListResponse {
  data: Product[]
  total: number
  page: number
  limit: number
}
