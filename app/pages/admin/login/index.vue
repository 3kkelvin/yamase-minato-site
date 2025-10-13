<template>
  <div style="display:flex; align-items:center; justify-content:center; flex-direction: column; width: 100%; padding:0px;">
    <el-card style="max-width: 420px; width: 100%;" shadow="always">
      <template #header>
        <div style="display:flex; align-items:center; justify-content:center; gap:8px;">
          <span style="font-weight:700; font-size:18px;">{{ $t('login.title') }}</span>
        </div>
      </template>

      <el-form @submit.prevent="login" label-position="top">
        <el-form-item :label="$t('login.passwordLabel')">
          <el-input v-model="password" type="password" :placeholder="$t('login.passwordPlaceholder')" show-password clearable
            @keydown.enter="login" />
        </el-form-item>

        <el-button type="primary" size="large" round style="width:100%;" @click="login">
          {{ $t('login.submit') }}
        </el-button>

        <div style="margin-top:12px;">
          <el-alert v-if="error" type="error" :closable="false" show-icon :title="error" />
        </div>
      </el-form>
    </el-card>

    <div style="margin-top:16px; text-align:center;">
      <el-tag :type="adminStore.isLoggedIn ? 'success' : 'info'">
        {{ $t('login.piniaStatus') }}{{ adminStore.isLoggedIn ? $t('login.loggedIn') : $t('login.notLoggedIn') }}
      </el-tag>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAdminStore } from '~/stores/admin'
const adminStore = useAdminStore()
const password = ref('')
const error = ref('')

async function login() {
  error.value = ''
  try {
    await adminLogin(password.value)
    adminStore.setLogin(true)
    await navigateTo('/admin') // 進入真正管理頁
  } catch (e) {
    error.value = '密碼錯誤'
  }
}
</script>
