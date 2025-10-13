<template>
  <div class="product-list-wrapper">
    <div class="controls">
      <el-select v-model="mode" style="width: 120px" placeholder="排序依據">
        <el-option :label="$t('sort.newest')" value="time" />
        <el-option :label="$t('sort.price')" value="price" />
        <el-option :label="$t('sort.popular')" value="views" />
      </el-select>
      <el-select v-model="sort" style="width: 120px">
        <el-option :label="$t('sort.asc')" :value="0" />
        <el-option :label="$t('sort.desc')" :value="1" />
      </el-select>
      <el-tag v-if="tag" closable size="large" @close="tagCancel" type="danger">{{ tag }}</el-tag>
    </div>

    <el-row :gutter="22">
      <el-col v-for="prod in products" :key="prod.id" :xs="24" :sm="12" :md="8" :lg="6" style="margin-bottom:20px">
        <ProductCard :product="prod" :tagSearch="tagSearch"/>
      </el-col>
    </el-row>

    <div class="pager">
      <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="limit" :total="total"
        @current-change="handlePageChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Product } from '~~/types/product'

const products = ref<Product[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(12)

const mode = ref<'time' | 'price' | 'views'>('time')
const sort = ref(1) // 0:asc, 1:desc
const tag = ref("")

const fetchData = async () => {
  const res = await getProductList({
    page: page.value,
    limit: limit.value,
    mode: mode.value,   // 'time' | 'price' | 'views'
    sort: sort.value === 0 ? 'asc' : sort.value === 1 ? 'desc' : undefined,
    tag: tag.value? tag.value : undefined
  })
  products.value = res.data
  total.value = res.total
}

// 預設載入
onMounted(fetchData)
watch([page, mode, sort, tag], fetchData)

const handlePageChange = (p: number) => {
  page.value = p
}

const tagSearch = (t: string) => {
  tag.value = t
}
const tagCancel = () => {
  tag.value = ""
}
</script>

<style scoped>
.product-list-wrapper {
  width: 90vw;
  max-width: 1100px;
  padding: 32px 16px 10px 16px;
  min-height: 60vh;
}

.controls {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 18px;
}

.pager {
  display: flex;
  justify-content: center;
  margin-top: 26px;
  margin-bottom: 14px;
}

@media (max-width: 900px) {
  .product-list-wrapper {
    padding: 18px 2px 6px 2px;
    border-radius: 14px;
  }
}
</style>
