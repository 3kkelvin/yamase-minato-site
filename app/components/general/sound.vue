<!-- components/SmartEmbed.vue -->
<template>
  <div ref="box" class="embed-wrapper">
    <iframe
      ref="frame"
      :src="src"
      frameborder="0"
      allowfullscreen
      scrolling="no"
      style="display:block; height:215px; border:0;"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{src: string}>()

const BASE_H = 215
const box = ref<HTMLDivElement|null>(null)
const frame = ref<HTMLIFrameElement|null>(null)
let ro: ResizeObserver | null = null

function applyScale() {
  const el = box.value
  const ifr = frame.value
  if (!el || !ifr) return
  const h = el.clientHeight
  // 只在容器高度小於 BASE_H 時縮小；否則 1:1 顯示
  const scale = Math.min(1, h / BASE_H || 1)

  // 先把 iframe 的「邏輯寬度」放大到 1/scale 倍，縮放後寬度剛好 = 100%
  // 高度固定為原始 BASE_H，交給縮放處理
  ifr.style.width = `${(1 / scale) * 100}%`
  ifr.style.height = `${BASE_H}px`
  ifr.style.transformOrigin = 'top left'
  ifr.style.transform = `scale(${scale})`
}

onMounted(() => {
  applyScale()
  ro = new ResizeObserver(applyScale)
  ro.observe(box.value!)
})

onBeforeUnmount(() => {
  ro?.disconnect()
  ro = null
})
</script>

<style scoped>
.embed-wrapper {
  width: 100%;
  height: 150px;
  overflow: hidden;
  position: relative;
}
</style>