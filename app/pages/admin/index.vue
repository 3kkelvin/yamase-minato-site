<template>
  <!--<p class="mt-4 text-xs text-gray-500">Pinia 狀態：{{ adminStore.isLoggedIn ? '已登入' : '未登入' }}</p>-->
  <AdminProductList />
</template>
<script setup lang="ts">
//待辦：資料備份 回復 SQL指令執行
import { useAdminStore } from '~/stores/admin'
const adminStore = useAdminStore()
import auth from '~/middleware/auth'
definePageMeta({
  middleware: auth
})

onMounted(async () => {
  try {
    await pingAdmin() // 如果沒報錯，token 有效，什麼都不用做
  } catch (error: any) {
    if (error?.status === 401) {
      await logoutAdmin()            // 伺服器清 cookie
      adminStore.setLogin(false)     // pinia 狀態設未登入
      navigateTo('/admin/login')     // 重導
    }
  }
})
</script>
