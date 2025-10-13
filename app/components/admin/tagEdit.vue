<template>
  <el-button @click="openDialog" type="primary" size="small">
    {{ $t('adminTag.edit') }}
  </el-button>
  <el-dialog v-model="dialogVisible" :title="$t('adminTag.edit')" width="320">
    <!-- 新增標籤 -->
    <div class="mb-3 flex items-center gap-2">
      <el-input v-model="newTag" :disabled="form.id != null" :placeholder="$t('adminTag.input')" clearable style="width: 180px" />
      <el-button type="primary" :disabled="form.id != null" @click="upload">
        {{ $t('adminTag.add') }}
      </el-button>
    </div>

    <!-- 標籤列表 -->
    <el-table :data="tags" style="width: 100%" empty-text="暫無標籤" size="small">
      <el-table-column prop="id" label="ID" width="50" />
      <el-table-column :label="$t('adminTag.name')">
        <template #default="{ row }">
          <template v-if="form.id === row.id">
            <el-input v-model="form.name" size="small" style="width: 100px" />
          </template>
          <template v-else>
            {{ row.name }}
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('adminProduct.actions')" width="100">
        <template #default="{ row }">
          <template v-if="form.id === row.id">
            <el-button link type="primary" size="small" @click="handleSubmit">
              {{ $t('adminProduct.confirm') }}
            </el-button>
          </template>
          <template v-else>
            <el-button link type="primary" size="small" @click="edit(row)">
              {{ $t('adminProduct.edit') }}
            </el-button>
          </template>
          <template v-if="form.id === row.id">
            <el-button link type="danger" size="small" @click="cancel">
              {{ $t('adminProduct.cancel') }}
            </el-button>
          </template>
          <template v-else>
            <el-button link type="danger" size="small" @click="onDelete(row)">
              {{ $t('adminProduct.deleteTitle') }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue'
import { ElMessage } from 'element-plus'
import type { AdminTagForm, Tag } from '~~/types/tag'
const tags = ref<Tag[]>([])
const dialogVisible = ref(false)
const newTag = ref<string>("")
const form = reactive<AdminTagForm>({
  id: null,
  name: '',
})

function openDialog() {
  dialogVisible.value = true
  reload()
}
// 重載入
async function reload() {
  try {
    const res = await getTagList()
    tags.value = res.data
  } catch (e: any) {
    ElMessage.error(e?.message ?? $t('adminProduct.loadFail'))
  }
}
// 新增
async function upload() {
  if (!newTag) {
    ElMessage.error($t('adminProduct.fillAll'))
    return
  }
  form.name = newTag.value
  handleSubmit()
}
// 開始編輯
async function edit(row: { id: number; name: string }) {
  form.id = row.id
  form.name = row.name
}
// 取消編輯
async function cancel() {
  form.name = ""
  form.id = null
}
// 新增、編輯標籤
async function handleSubmit() {
  if (!form.name) {
    ElMessage.error($t('adminProduct.fillAll'))
    return
  }
  try {
    const { tag } = await createTag(structuredClone(toRaw(form)))
    if (tag.id) {// 刷新、清空欄位
      ElMessage.success($t('adminProduct.addSuccess'))
      newTag.value = ""
      form.name = ""
      form.id = null
      reload()
    } else {
      ElMessage.error($t('adminProduct.addFail'))
    }
  } catch (error: any) {
    ElMessage.error(error?.data?.message || $t('adminProduct.addFail'))
  }
}
// 刪除標籤
async function onDelete(row: { id: number }) {
  try {
    await deleteTag(row.id)
    ElMessage.success($t('adminProduct.deletedSuccess'))
    reload()
  } catch (e: any) {
    ElMessage.error(e?.message ?? $t('adminProduct.deleteFail'))
  }
}
</script>
