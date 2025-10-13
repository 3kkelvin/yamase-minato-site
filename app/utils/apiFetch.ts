import { $fetch } from 'ofetch'

export async function apiFetch<T = any>(url: string, opts: any = {}) {
  try {
    return await $fetch<T>(url, {
      credentials: 'include',
      ...opts
    })
  } catch (e: any) {
    // 自動攔截 401 跳頁
    if (import.meta.client && e?.response?.status === 401) {
      window.location.href = '/admin/login'
    }
    throw e
  }
}
