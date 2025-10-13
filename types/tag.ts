export interface Tag {
  id: number
  name: string
}

export interface AdminTagForm {
  id: number | null
  name: string
}

export interface TagListResponse {
  data: Tag[]
}

//刪除
export interface TagDeleteRequest {
  id: number
}
export interface TagDeleteResponse {
  success: boolean
  message?: string
}
