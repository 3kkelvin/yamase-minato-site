<template>
  <el-card class="product-card" :body-style="{ padding: '0px' }" shadow="hover" @click="handleClick">
    <div class="img-box">
      <img :src="product.imageUrl" :alt="product.title" class="product-img" />
    </div>
    <div class="product-info">
      <div class="title">{{ product.title }}</div>
      <div class="tag">
        <div v-for="tag in product.tags" :key="tag">
          <el-tag effect="plain" type="danger" @click.stop="handleTag(tag)">{{ tag }}</el-tag>
        </div>
      </div>
      <div class="meta">
        <span class="price">¥{{ product.price }} JPY</span>
        <el-tag size="small" type="info" effect="plain" class="views">
          <el-icon style="vertical-align:middle; bottom: 2px;">
            <View />
          </el-icon>
          {{ views }}
        </el-tag>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { View } from '@element-plus/icons-vue'
import type { Product } from '~~/types/product'

const props = defineProps<{ 
  product: Product
  tagSearch?: (tag:string) => void
}>()
const views = ref(props.product.views)
// 點擊其他部分 去到商品網址 瀏覽數+1
const handleClick = async () => {
  try {
    window.open(props.product.url, '_blank')
    await trackProductClick(props.product.id)
    views.value += 1
  } catch (e) {
    ElMessage.error('error')
  }
}
//點擊標籤 調用標籤搜尋
const handleTag = async (tag:string) => {
  props.tagSearch?.(tag)
}
</script>

<style scoped>
.product-card {
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.18s cubic-bezier(.4, 2.2, .4, .8), box-shadow .2s;
  box-shadow: 0 3px 15px rgba(255, 143, 206, 0.09);
  background: linear-gradient(120deg, #fef6fd 60%, #f0f5ff 100%);
  height: auto;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px) scale(1.025);
  box-shadow: 0 6px 32px 0 rgba(255, 143, 206, 0.13);
}

.img-box {
  width: 100%;
  aspect-ratio: 560 / 404;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 14px;
  text-align: left;
}

.title {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #d1468e;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* 限制顯示兩行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* 讓即使只有一行也佔兩行高度 */
  line-height: 1.4em;
  /* 每行高度 */
  min-height: calc(1.4em * 2);
}

.tag{
  display: flex;
  flex-direction: row; 
  gap: 5px; 
  flex-wrap: wrap;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price {
  color: #e567ab;
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.views {
  margin-left: 4px;
  background: #fff0f8;
  color: #d1468e;
  border-radius: 10px;
}
</style>
