<template>
  <div class="product-list-wrapper">
    <el-row :gutter="22">
      <el-col v-for="prod in products" :key="prod.id" :xs="24" :sm="12" :md="6" :lg="6" style="margin-bottom:20px">
        <ProductCard :product="prod" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from '~~/types/product'
const products = ref<Product[]>([])

const fetchData = async () => {
  const res = await getProductList({
    page: 1,
    limit: 4,
    mode: 'views',   // 'time' | 'price' | 'views'
    sort: 'desc'
  })
  products.value = res.data
}
// 預設載入
onMounted(fetchData)
</script>

<style scoped>
.product-list-wrapper {
  width: 90vw;
  max-width: 1100px;
}

@media (max-width: 900px) {
  .product-list-wrapper {
    border-radius: 14px;
  }
}
</style>
