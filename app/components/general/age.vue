<template>
  <div v-if="!adminStore.skipAgePage">
    <div class="age-confirm-overlay" aria-label="age verification section">
      <div v-if="!under18" class="age-confirm-card">
        <h2>{{ $t('age.title') }}</h2>
        <p>
          {{ $t('age.text1') }}<br />
          {{ $t('age.text2') }}
        </p>
        <div class="button-group">
          <button class="btn confirm" @click="handleConfirm">{{ $t('age.over18') }}</button>
          <button class="btn cancel" @click="handleReject">{{ $t('age.under18') }}</button>
        </div>
      </div>

      <div v-else class="age-confirm-card">
        <h2>{{ $t('age.refuse') }}</h2>
        <p>
          {{ $t('age.textRefuse') }}<br />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAdminStore } from '~/stores/admin'

const adminStore = useAdminStore()
const under18 = ref(false)

// 點擊「已滿 18 歲」
const handleConfirm = () => {
  adminStore.skip()
}

// 點擊「未滿 18 歲」
const handleReject = () => {
  under18.value = true
}
</script>

<style scoped>
.age-confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  /* 半透明背景，只是視覺區隔，不阻擋 SEO 抓取 */
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  pointer-events: auto;
}

.age-confirm-card {
  pointer-events: auto;
  /* 開放這個區塊可互動 */
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  padding: 20px 30px;
  max-width: 360px;
  text-align: center;
}

.age-confirm-card h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.age-confirm-card p {
  color: #333;
  line-height: 1.5;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.btn.confirm {
  background-color: #2e7d32;
  color: #fff;
}

.btn.confirm:hover {
  background-color: #256428;
}

.btn.cancel {
  background-color: #888;
  color: #fff;
}

.btn.cancel:hover {
  background-color: #666;
}
</style>
