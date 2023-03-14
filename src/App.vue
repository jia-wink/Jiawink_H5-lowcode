<template>
  <el-config-provider :locale="zhCn">
    <router-view #="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
  import { provide } from 'vue';
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';
  import { initVisualData, injectKey, localKey } from '@/visual-editor/hooks/useVisualData';

  const visualData = initVisualData();
  // 注入可视化编辑器所有配置
  provide(injectKey, visualData);

  const { jsonData } = visualData;

  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem(localKey, JSON.stringify(jsonData));
  });
</script>

<style lang="scss">
  @import 'style/common';

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
