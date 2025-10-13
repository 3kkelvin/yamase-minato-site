<template>
  <div class="layout">
    <template v-if="isMobile">
      <GeneralMobileHeader/>
    </template>
    <template v-else>
      <GeneralHeader/>
    </template>

    <main class="main">
      <!-- slot = 各頁面的內容 -->
      <slot />
    </main>

    <GeneralFooter />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth <= 600
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>
<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* 高度至少佔滿視窗 */
}
.main {
  display: flex;
  justify-content: center;
  flex: 1; /* 內容區撐開剩餘空間 */
  background-image: url('/bg.png');
  background-repeat: no-repeat;
  background-size: auto;           /* 原始尺寸，不拉伸 */
  background-position: center top; /* 或其他定位 */
  background-attachment: fixed;
}
</style>
