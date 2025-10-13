<template>
  <footer class="footer">
    <div class="footer-icons">
      <a href="https://x.com/Mirai_Aisaki_" target="_blank" rel="noopener noreferrer">
        <img src="/twitter.png" alt="Twitter" />
      </a>
      <el-popover placement="top" :width="100" trigger="click">
        <template #reference>
          <img src="/booth.png" alt="booth" />
        </template>
        <div class="card-container" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;">
          <el-card class="link-card" body-style="padding:0" shadow="never">
            <a href="https://shirubenone.booth.pm/" class="link-card__inner">
              <span>音羽ノ夢</span>
            </a>
          </el-card>
          <el-card class="link-card" body-style="padding:0" shadow="never">
            <a href="https://shirubenone.booth.pm/" class="link-card__inner">
              <span>艶電ノ夢</span>
            </a>
          </el-card>
          <el-card class="link-card" body-style="padding:0" shadow="never">
            <a href="https://shirubenone.booth.pm/" class="link-card__inner">
              <span>甘音庵</span>
            </a>
          </el-card>
          <el-card class="link-card" body-style="padding:0" shadow="never">
            <a href="https://shirubenone.booth.pm/" class="link-card__inner">
              <span>導ノ音</span>
            </a>
          </el-card>
          <el-card class="link-card" body-style="padding:0" shadow="never">
            <a href="https://shirubenone.booth.pm/" class="link-card__inner">
              <span>淵姦ノ夢</span>
            </a>
          </el-card>
        </div>
      </el-popover>
    </div>
    <p>© 2025 Mirai All rights reserved.</p>
  </footer>
</template>
<script setup lang="ts">

</script>
<style scoped>
.el-footer--horizontal {
  --el-menu-horizontal-height: 100px;
}

.footer {
  height: 60px;
  background: #ffd2d2;
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
}

.footer-icons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 8px;
}

.footer-icons img {
  border-radius: 2px;
  height: 30px;
  transition: transform 0.2s ease;
}

.link-card {
  border: 1.5px solid var(--el-color-danger-light-3);
  border-radius: 10px;
  overflow: hidden;
  width: 110px;
}

.link-card__inner {
  display: flex;
  padding: 6px 20px;
  text-decoration: none;
  font-weight: 600;
  color: var(--el-color-danger-light-3);
}
</style>