<template>
  <div style="width: 100%;">
    <el-card style="margin-left: 1%; margin-right: 1%; background-color: rgba(255, 255, 255, 0.7);">
      {{ query.isDelete }}
      <template #header>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap">
          <!-- 左邊 -->
          <div style="display:flex; gap:0px; align-items:center; flex-wrap:wrap">
            <el-input v-model="query.search" :placeholder="$t('adminProduct.searchPlaceholder')" clearable
              style="max-width:200px" @keyup.enter.native="reload" @clear="reload">
              <template #prefix>
                <el-icon><i-ep-search /></el-icon>
              </template>
            </el-input>
            <el-button type="primary" @click="reload">{{ $t('adminProduct.search') }}</el-button>
            <div style="font-size:14px; margin-left: 8px; color:#909399">
              {{ $t('adminProduct.total', { count: total }) }}
            </div>
          </div>
          <!-- 右邊 -->
          <AdminProductUpload :editDialogVisible="editDialogVisible" :product="productForm" :reload="reload"
            :dialogClosed="dialogClosed" />
        </div>
      </template>

      <el-table :data="products" style="width: 100%; border-radius: 12px" size="small" v-loading="loading"
        @sort-change="onSortChange" @filter-change="onFilterChange">
        <el-table-column prop="id" label="ID" width="60" sortable="custom" />
        <el-table-column prop="imageUrl" :label="$t('adminProduct.image')" min-width="100">
          <template #default="{ row }">
            <el-image :src="row.imageUrl" :preview-src-list="[row.imageUrl]" fit="cover"
              style="width: 90px; height: 60px; border-radius: 10px;" lazy preview-teleported>
              <template #error>
                <div style="color: #e567ab; font-size: 13px;">{{ $t('adminProduct.imageLoadError') }}</div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" :label="$t('adminProduct.title')" min-width="220" />
        <el-table-column prop="price" :label="$t('adminProduct.price')" min-width="70" sortable="custom">
          <template #default="{ row }">¥ {{ row.price?.toLocaleString?.() ?? row.price }}</template>
        </el-table-column>
        <el-table-column prop="views" :label="$t('adminProduct.views')" min-width="80" sortable="custom" />
        <el-table-column prop="url" label="URL" min-width="50">
          <template #default="{ row }">
            <a :href="row.url" target="_blank" rel="noopener" @click.stop
              style="color: #409eff; text-decoration: underline; cursor: pointer;">
              URL
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="isDelete" :label="$t('adminProduct.status')" min-width="90" :filters="[
          { text: $t('adminProduct.published'), value: 'false' },
          { text: $t('adminProduct.unpublished'), value: 'true' }
        ]" :filter-multiple="false" column-key="status">
          <template #default="{ row }">
            <el-tag :type="!row.isDelete ? 'success' : 'info'">{{ !row.isDelete ? $t('adminProduct.published') :
              $t('adminProduct.unpublished') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="releaseDate" :label="$t('adminProduct.releaseDate')" min-width="105" sortable="custom">
          <template #default="{ row }">{{ formatDate(row.releaseDate) }}</template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('adminProduct.createdTime')" min-width="110" sortable="custom">
          <template #default="{ row }">{{ formatDateTime(row.createTime) }}</template>
        </el-table-column>
        <el-table-column prop="refreshTime" :label="$t('adminProduct.updatedTime')" min-width="110" sortable="custom">
          <template #default="{ row }">{{ formatDateTime(row.refreshTime) }}</template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('adminProduct.actions')" :min-width="isNarrow ? 65 : 130">
          <template #default="{ row }">
            <div class="action-buttons">
              <!-- 編輯 -->
              <el-button link type="primary" size="small" @click="openDialog(row)">
                {{ $t('adminProduct.edit') }}
              </el-button>
              <!-- 上下架 -->
              <el-button link :type="row.isDelete ? 'success' : 'warning'" size="small" @click="onToggleState(row)">
                {{ row.isDelete ? $t('adminProduct.published') : $t('adminProduct.unpublished') }}
              </el-button>
              <!-- 刪除 -->
              <el-popconfirm :title="$t('adminProduct.delete')" @confirm="onDelete(row)">
                <template #reference>
                  <el-button link type="danger" size="small">
                    {{ $t('adminProduct.deleteTitle') }}
                  </el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div style="display:flex; justify-content:flex-end; margin-top:12px;">
        <el-pagination small layout="prev, pager, next, sizes, jumper" :total="total" :page-size="query.limit"
          :current-page="query.page" :page-sizes="[10, 20, 50, 100]"
          @current-change="(p: number) => { query.page = p; reload(); }"
          @size-change="(s: number) => { query.limit = s; query.page = 1; reload(); }" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import type { AdminProduct, AdminProductForm } from '~~/types/adminProduct'

const isNarrow = ref(false)
const products = ref<AdminProduct[]>([])
const total = ref(0)
const loading = ref(true)
const editDialogVisible = ref(false)
const productForm = reactive<AdminProductForm>({//給子組件表單用 資料初始化統一在本層進行 
  id: null,
  title: '',
  imageUrl: '',
  price: null,
  url: '',
  releaseDate: new Date(),
  tags: []
})

const query = ref({
  page: 1,
  limit: 20,
  search: '' as string | undefined,
  isDelete: undefined as string | undefined, // 'true' | 'false' | undefined
  sortBy: 'id' as 'price' | 'views' | 'createTime' | 'refreshTime' | 'id' | 'releaseDate',
  sortOrder: 'desc' as 'asc' | 'desc',
})
function formatDate(v: any) {
  if (!v) return ''
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return String(v)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function formatDateTime(v: any) {
  if (!v) return ''
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return String(v)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}
//刷新列表資料
async function reload() {
  loading.value = true
  try {
    const isDelete = query.value.isDelete === 'true' ? true : query.value.isDelete === 'false' ? false : undefined
    const res = await getAdminProductList({ ...query.value, isDelete })
    products.value = res.data
    total.value = res.total
  } catch (e: any) {
    ElMessage.error(e?.message ?? $t('adminProduct.loadFail'))
  } finally {
    loading.value = false
  }
}
//排序按鈕
function onSortChange({ prop, order }: { column: any, prop: string, order: 'ascending' | 'descending' | null }) {
  if (!order) {
    query.value.sortBy = 'id'
    query.value.sortOrder = 'desc'
  } else {
    query.value.sortBy = prop as 'price' | 'views' | 'createTime' | 'refreshTime' | 'id' | 'releaseDate'
    query.value.sortOrder = order === 'ascending' ? 'asc' : 'desc'
  }
  query.value.page = 1
  reload()
}
//篩選按鈕
function onFilterChange(filters: Record<string, any>) {
  if ('status' in filters) {
    const status = filters['status']?.[0] as 'true' | 'false' | undefined
    query.value.isDelete = status
    query.value.page = 1
    reload()
  }
}
//上下架
async function onToggleState(row: { id: number; isDelete: boolean }) {
  const next = !row.isDelete
  try {
    await toggleProductState(row.id, next)
    ElMessage.success(next ? $t('adminProduct.unpublishedSuccess') : $t('adminProduct.publishedSuccess'))
    reload()
  } catch (e: any) {
    ElMessage.error(e?.message ?? $t('adminProduct.toggleFail'))
  }
}
//真刪除
async function onDelete(row: { id: number }) {
  try {
    await deleteProduct(row.id)
    ElMessage.success($t('adminProduct.deletedSuccess'))
    reload?.()
  } catch (e: any) {
    ElMessage.error(e?.message ?? $t('adminProduct.deleteFail'))
  }
}
//開啟dialog、初始化表單內容
function openDialog(row: AdminProductForm) {
  productForm.id = row.id
  productForm.title = row.title
  productForm.imageUrl = row.imageUrl
  productForm.price = row.price
  productForm.url = row.url
  productForm.releaseDate = row.releaseDate
  productForm.tags = row.tags
  editDialogVisible.value = true
}
//子組件已關閉dialog、父組件同步、清空表單內容
function dialogClosed() {
  editDialogVisible.value = false
  productForm.id = null
  productForm.title = ''
  productForm.imageUrl = ''
  productForm.price = null
  productForm.url = ''
}
onMounted(() => {
  reload();
  const apply = () => {
    const narrow = window.innerWidth < 1300
    isNarrow.value = narrow
  }
  apply()
  window.addEventListener('resize', apply, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('resize', apply))
});
</script>
<style scoped>
/* 預設維持橫向排列 */
.action-buttons {
  display: flex;
  gap: 4px;
}

/* 小於 1300px 改為直向排列 */
@media (max-width: 1300px) {
  .action-buttons {
    flex-direction: column;
    align-items: flex-start !important; /* 按鈕靠左 */
  }
  .el-button+.el-button {
     margin-left: 0px;  
  }
}
</style>
