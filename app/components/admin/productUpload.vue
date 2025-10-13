<template>
  <el-button @click="dialogVisible = true" type="primary">
    {{ $t('adminProduct.add') }}
  </el-button>
  <el-dialog v-model="dialogVisible" :title="props.product.id ? $t('adminProduct.editTitle') : $t('adminProduct.create')" width="400">
    <el-form :model="form" label-width="80px" @submit.prevent="handleSubmit">
      <el-form-item :label="$t('adminProduct.title')">
        <el-input v-model="form.title" :placeholder="$t('adminProduct.titlePlaceholder')" :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" />
      </el-form-item>
      <el-form-item :label="$t('adminProduct.image')">
        <el-upload :show-file-list="false" :on-change="handleImageChange" :before-upload="beforeImageUpload" action="" :http-request="dummyRequest">
          <el-button type="primary">{{ $t('adminProduct.selectImage') }}</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <img v-if="form.imageUrl" :src="form.imageUrl" style="max-width: 100%; margin-top:10px;" />
      </el-form-item>
      <el-form-item :label="$t('adminProduct.tag')">
        <AdminTagEdit />
        <el-select v-model="form.tags" multiple placeholder="Select" style="width: 240px" @visible-change="reloadTags">
          <el-option v-for="tag in tags" :key="tag.name" :label="tag.name" :value="tag.name" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('adminProduct.price')">
        <el-input v-model.number="form.price" type="number" :placeholder="$t('adminProduct.pricePlaceholder')" />
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="form.url" :placeholder="$t('adminProduct.urlPlaceholder')" />
      </el-form-item>
      <el-form-item :label="$t('adminProduct.releaseDate')">
        <el-date-picker v-model="form.releaseDate" type="date" placeholder="選擇日期" style="width: 100%;" />
      </el-form-item>
    </el-form>
    <div class="dialog-footer" style="text-align:center;">
      <el-button @click="dialogVisible = false">{{ $t('adminProduct.cancel') }}</el-button>
      <el-button type="primary" @click="handleSubmit">{{ $t('adminProduct.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue'
import { ElMessage } from 'element-plus'
import type { AdminProductForm } from '~~/types/adminProduct'
import type { Tag } from '~~/types/tag'

const props = defineProps<{
  reload: () => void
  dialogClosed: () => void
  editDialogVisible: boolean
  product: AdminProductForm
}>()

const dialogVisible = ref(false)
const tags = ref<Tag[]>([])
const form = reactive<AdminProductForm>({
  id: null,
  title: '',
  imageUrl: '',
  price: null,
  url: '',
  releaseDate: new Date(),
  tags: []
})

watch(// 監聽父組件改變編輯商品內容時 帶入表單內容
  () => props.product,
  (newVal) => { Object.assign(form, structuredClone(toRaw(newVal))) },
  { deep: true }
)
watch(// 監聽父組件編輯商品狀態true時 打開dialog
  () => props.editDialogVisible,
  (newVal) => { 
    //reloadTags()
    if (newVal) dialogVisible.value = newVal 
  }
)
watch(// 監聽子組件編輯商品狀態false時 呼叫父組件同步、子組件再跟父組件同步
  () => dialogVisible.value,
  (newVal) => {
    //reloadTags()
    if (!newVal) {
      props.dialogClosed()
      Object.assign(form, structuredClone(toRaw(props.product)))
    }
  }
)
//
async function reloadTags() {
  try {
    const res = await getTagList()
    tags.value = res.data
  } catch (e: any) {
    ElMessage.error(e?.message ?? $t('adminProduct.loadFail'))
  }
}
// 偽 action，因為我們自己處理上傳
const dummyRequest = () => Promise.resolve()
// 圖片上傳處理
async function handleImageChange(file: any) {
  try {
    const { url } = await uploadImage(file.raw)
    form.imageUrl = url
  } catch (error: any) {
    ElMessage.error(error?.data?.message || $t('adminProduct.uploadFail'))
  }
}
// 限制上傳格式
function beforeImageUpload(file: File) {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    ElMessage.error($t('adminProduct.uploadOnlyImage'))
  }
  return isImage
}
// 上傳商品
async function handleSubmit() {
  if (!form.title || !form.imageUrl || !form.price || !form.url) {
    ElMessage.error($t('adminProduct.fillAll'))
    return
  }
  try {
    const { product } = await createProduct(structuredClone(toRaw(form)))
    if (product.id) {// 刷新、關閉懸浮視窗、清空表單
      form.id? ElMessage.success($t('adminProduct.editSuccess')) : ElMessage.success($t('adminProduct.addSuccess'))
      props.reload()
      dialogVisible.value = false
      props.dialogClosed()
    } else {
      ElMessage.error($t('adminProduct.addFail'))
    }
  } catch (error: any) {
    ElMessage.error(error?.data?.message || $t('adminProduct.addFail'))
  }
}
</script>
