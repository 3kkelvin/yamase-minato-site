<template>
  <GeneralAge />
  <div class="vertical">
    <div class="container">
      <div class="left_box">
        <img style="height: 100%;" src="/tachie.png" alt="全身画像">
      </div>

      <div class="right_box">
        <div class="intro">
          <h1>
            愛崎未来
            <span>Aisaki Mirai</span>
          </h1>
          <p class="catch">「{{ $t('intro.hello') }}」</p>
          <p class="txt">
            {{ $t('intro.text1') }}<br>
            {{ $t('intro.text2') }}<br>
            {{ $t('intro.text3') }}<br>
            {{ $t('intro.text4') }}<br>
          </p>
          <div>
            <GeneralSound src="https://chobit.cc/embed/cvzyw/4j3sg0jq" />
          </div>
          <div>
            <el-row :gutter="16" class="link-grid">
              <el-col :xs="24" :sm="12">
                <el-card class="link-card" body-style="padding:0" shadow="never">
                  <a href="https://x.com/Mirai_Aisaki_" class="link-card__inner">
                    <span>愛崎未来 - X</span>
                    <span class="arrow">›</span>
                  </a>
                </el-card>
              </el-col>
              
              <el-col :xs="24" :sm="12">
                <el-card class="link-card" body-style="padding:0" shadow="never">
                  <a href="https://shirubenone.booth.pm/" class="link-card__inner">
                    <span>音羽ノ夢 - BOOTH</span>
                    <span class="arrow">›</span>
                  </a>
                </el-card>
              </el-col>

              <el-col :xs="24" :sm="12">
                <el-card class="link-card" body-style="padding:0" shadow="never">
                  <a href="https://shirubenone.booth.pm/" class="link-card__inner">
                    <span>艶電ノ夢 - BOOTH</span>
                    <span class="arrow">›</span>
                  </a>
                </el-card>
              </el-col>

              <el-col :xs="24" :sm="12">
                <el-card class="link-card" body-style="padding:0" shadow="never">
                  <a href="https://shirubenone.booth.pm/" class="link-card__inner">
                    <span>甘音庵 - BOOTH</span>
                    <span class="arrow">›</span>
                  </a>
                </el-card>
              </el-col>

              <el-col :xs="24" :sm="12">
                <el-card class="link-card" body-style="padding:0" shadow="never">
                  <a href="https://shirubenone.booth.pm/" class="link-card__inner">
                    <span>導ノ音 - BOOTH</span>
                    <span class="arrow">›</span>
                  </a>
                </el-card>
              </el-col>

              <el-col :xs="24" :sm="12">
                <el-card class="link-card" body-style="padding:0" shadow="never">
                  <a href="https://shirubenone.booth.pm/" class="link-card__inner">
                    <span>淵姦ノ夢 - BOOTH</span>
                    <span class="arrow">›</span>
                  </a>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="intro">
      <h1 style="color: rgb(6, 63, 92);">{{ $t('menu.product') }}</h1>
    </div>
    <ProductSimpleList />
    <el-card class="link-card" body-style="padding:0" shadow="never" style="margin-bottom: 40px;">
      <NuxtLink :to="localePath('/product')" class="link-card__inner">
        <span style="font-size: 24px">{{ $t('intro.seemore') }}</span>
        <span class="arrow">›</span>
      </NuxtLink>
    </el-card>
    
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath()
</script>
<style scoped>
.vertical {
  max-width: 1100px;
  width: 94%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  display: flex;
}

.left_box {
  width: 34%;
  padding-left: 15vw;
  height: 70vh;
  margin-top: 60px;
}

.right_box {
  width: 60%;
  color: rgb(6, 63, 92);
  margin-top: 30px;
}

@media (max-width: 600px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .left_box {
    display: flex;
    justify-content: center;
    width: auto;
    height: 70vh;
    padding-left: 0;
  }

  .right_box {
    width: 100%;
    margin-top: 20px;
    height: auto;
  }
}

.intro h1 {
  font-size: 48px;
  font-weight: bold;
  line-height: 1.3em;
  margin-bottom: 30px;
}

.intro h1 span {
  display: block;
  font-size: 0.5em;
  line-height: 1em;
}

.catch {
  font-size: 20px;
  font-weight: bold;
  line-height: 1.5em;
}

.txt {
  font-size: 16px;
  font-weight: bold;
  line-height: 1.6em;
}

.link-grid {
  margin-top: 8px;
}

.link-grid .el-col {
  margin-bottom: 12px;
}

.link-card {
  border: 1.5px solid var(--el-color-danger-light-3);
  border-radius: 10px;
  overflow: hidden;
}

.link-card__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 18px;
  text-decoration: none;
  font-weight: 600;
  color: var(--el-color-danger-light-3);
}

.link-card:hover {
  box-shadow: 0 0 0 3px rgba(255, 92, 255, 0.12) inset;
}

.arrow {
  font-size: 18px;
  line-height: 1;
  opacity: .85;
}
</style>
