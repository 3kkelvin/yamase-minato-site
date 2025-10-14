<template>
  <el-menu mode="horizontal" :default-active="$route.path" :ellipsis="false" background-color="#97CBFF"
    text-color="#333" style="border-bottom-width: 0px" active-text-color="#4676ce" class="el-menu-demo"
    @select="onSelect">
    <!-- 1) Logo：用 margin-right:auto 撐開左右 -->
    <el-menu-item :index="localePath('/')">
      <NuxtLink :to="localePath('/')">
        <img style="height: 50px; margin-bottom: 5px;" src="/title.png" alt="logo" />
      </NuxtLink>
    </el-menu-item>

    <!-- 2) 左側導覽（正常 menu item） -->
    <el-menu-item index="/product" class="menu-text">
      <NuxtLink :to="localePath('/product')" style="text-decoration: none;">{{ $t('menu.product') }}</NuxtLink>
    </el-menu-item>
    <el-menu-item index="/intro" class="menu-text">
      <NuxtLink :to="localePath('/')" style="text-decoration: none;">{{ $t('menu.intro') }}</NuxtLink>
    </el-menu-item>

    <!-- 3) 右側語言下拉：用原生 el-sub-menu -->
    <el-sub-menu index="lang">
      <template #title>
        <span class="menu-text">{{ currentLangLabel }}</span>
      </template>
      <el-menu-item class="lang-text" index="lang:jp">日本語</el-menu-item>
      <el-menu-item class="lang-text" index="lang:en">English</el-menu-item>
      <el-menu-item class="lang-text" index="lang:zh-tw">繁體中文</el-menu-item>
      <el-menu-item class="lang-text" index="lang:zh-cn">简体中文</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
const currentLangLabel = computed(() => {
  switch (locale.value) {
    case 'jp':
      return '日本語'
    case 'en':
      return 'English'
    case 'zh-tw':
      return '繁體中文'
    case 'zh-cn':
      return '简体中文'
    default:
      return locale.value
  }
})

function onSelect(key: string) {
  if (key.startsWith('lang:')) {
    console.log(key.split(':')[1])
    setLocale(key.split(':')[1] as "jp" | "en" | "zh-tw" | "zh-cn")
  }
}
</script>

<style scoped>
.header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-menu {
  border-bottom: none;
  display: flex;
  align-items: center;
  width: 100%;
}

.menu-text {
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
}

.lang-text {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
}

.el-menu--horizontal>.el-menu-item:nth-child(3) {
  margin-right: auto;
}
</style>
