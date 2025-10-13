<template>
  <el-menu mode="horizontal" :default-active="$route.path" :ellipsis="false" background-color="#ffA5A5"
    text-color="#333" style="border-bottom-width: 0px" active-text-color="#FF5CB3" class="el-menu-demo"
    @select="onSelect">
    <!-- 1) Logo：用 margin-right:auto 撐開左右 -->
    <el-menu-item :index="localePath('/')">
      <NuxtLink :to="localePath('/')">
        <img style="height: 50px; margin-bottom: 5px;" src="/title.png" alt="logo" />
      </NuxtLink>
    </el-menu-item>

    <el-sub-menu index="mobile">
      <template #title>
        <img src="/rowx3.svg" alt="Custom Icon" style="width: 50px; height: 50px;" />
      </template>
      <el-menu-item index="mobile-/product">
        <NuxtLink class="nuxtlink" :to="localePath('/product')">{{ $t('menu.product') }}</NuxtLink>
      </el-menu-item>
      <el-menu-item index="mobile-/intro">
        <NuxtLink class="nuxtlink" :to="localePath('/')">{{ $t('menu.intro') }}</NuxtLink>
      </el-menu-item>
      <el-sub-menu index="mobile-lang">
        <template #title>
          <span class="nuxtlink">{{ currentLangLabel }}</span>
        </template>
        <el-menu-item class="nuxtlink" index="lang:jp">日本語</el-menu-item>
        <el-menu-item class="nuxtlink" index="lang:en">English</el-menu-item>
        <el-menu-item class="nuxtlink" index="lang:zh-tw">繁體中文</el-menu-item>
        <el-menu-item class="nuxtlink" index="lang:zh-cn">简体中文</el-menu-item>
      </el-sub-menu>
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

.nuxtlink {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
}

.el-menu--horizontal>.el-menu-item:nth-child(1) {
  margin-right: auto;
}

.el-menu.el-menu--horizontal {
  flex-wrap: nowrap;
  overflow-x: hidden;
  max-width: 100vw;
}
</style>
