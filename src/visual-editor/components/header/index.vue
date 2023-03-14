<template>
  <el-row type="flex" class="header">
    <!--    左侧logo start-->
    <el-col :span="6" class="flex items-center">
      <!-- 链接到个人博客页 -->
      <a href="https://www.cnblogs.com/jiawink/" target="_blank">
        <div class="logo"></div>
      </a>
      <h3 class="font-semibold">嘉雲H5低代码</h3>
    </el-col>
    <!--    左侧logo end-->
    <!--    中间操作页面部分 start-->
    <el-col class="flex items-center space-between" :span="12">
      <template v-for="(toolItem, toolIndex) in tools" :key="toolIndex">
        <div :class="[`w-1/${tools.length}`]" class="w-1/9">
          <div
            class="tool-item flex flex-col items-center cursor-pointer"
            @click="toolItem.onClick === 'runPreview' ? runPreview() : toolItem.onClick()"
          >
            <el-icon>
              <component :is="toolItem.icon" />
            </el-icon>
            <div class="title">{{ toolItem.title }}</div>
          </div>
        </div>
      </template>
    </el-col>
    <!--    中间操作页面部分 end-->
    <!--    右侧工具栏 start-->
    <el-col :span="6" class="right-tools flex flex-row-reverse items-center">
      <!-- <el-tooltip class="item" effect="dark" content="运行" placement="bottom">
        <el-button
          type="primary"
          :icon="VideoPlay"
          size="large"
          circle
          class="flex-shrink-0 !p-6px"
          @click="runPreview"
        />
      </el-tooltip> -->
      <el-dropdown>
        <div>
          <el-avatar :icon="UserFilled" />
          <arrow-down />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-popover placement="bottom" :width="140" trigger="hover">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" content="github" placement="bottom">
              <a href="https://github.com/jia-wink/Jiawink_H5-lowcode" target="_blank">
                <img :src="`${BASE_URL}github.svg`" width="40" height="40" alt="" />
              </a>
            </el-tooltip>
          </el-col>
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" content="gitee" placement="bottom">
              <a href="https://gitee.com/jiawink/Jiawink_H5-lowcode" target="_blank">
                <img :src="`${BASE_URL}gitee.svg`" width="40" height="40" alt="" />
              </a>
            </el-tooltip>
          </el-col>
        </el-row>
        <template #reference>
          <img :src="`${BASE_URL}github.svg`" width="45" height="45" alt="" />
        </template>
      </el-popover>
    </el-col>
    <!--    右侧工具栏 end-->
  </el-row>
  <preview v-model:visible="isShowH5Preview" />
</template>

<script lang="ts" setup>
  // import { VideoPlay } from '@element-plus/icons-vue';
  import { UserFilled } from '@element-plus/icons-vue';
  import { useRouter } from 'vue-router';
  import { ElLoading } from 'element-plus';
  import Preview from './preview.vue';
  import { useTools } from './useTools';
  import { useVisualData, localKey } from '@/visual-editor/hooks/useVisualData';
  import { BASE_URL } from '@/visual-editor/utils';

  defineOptions({
    name: 'PageHeader',
  });

  const isShowH5Preview = ref(false);

  const tools = useTools();

  const { jsonData } = useVisualData();

  const runPreview = () => {
    sessionStorage.setItem(localKey, JSON.stringify(jsonData));
    localStorage.setItem(localKey, JSON.stringify(jsonData));
    isShowH5Preview.value = true;
  };

  const router = useRouter();
  function loginOut() {
    const loading = ElLoading.service({
      background: 'rgba(0, 0, 0, 0)',
    });
    localStorage.removeItem('routerTo');
    router.push('/login');
    loading.close();
  }
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;

    .logo {
      width: 60px;
      height: 60px;
      background-image: url('@/assets/logo.png');
      background-repeat: no-repeat;
      background-size: contain;
    }

    .tool-item {
      .title {
        margin-top: 4px;
        font-size: 12px;
      }
    }

    .el-button {
      font-size: 22px;
    }

    .right-tools > * {
      margin-left: 16px;
    }
  }

  .space-between {
    justify-content: space-around;
  }

  .font-semibold {
    padding-left: 10px;
    font-size: 20px;
  }
</style>
