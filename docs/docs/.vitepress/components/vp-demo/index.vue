<template>
  <ClientOnly>
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <Example :path="path" />
      <ElDivider class="m-0" />
      <div class="op-btns">
        <ElTooltip content="复制代码" :show-arrow="false">
          <ElIcon :size="16" class="op-btn" @click="copyCode">
            <CopyDocument />
          </ElIcon>
        </ElTooltip>
        <ElTooltip content="查看源代码" :show-arrow="false">
          <ElIcon :size="16" class="op-btn" @click="toggleSourceVisible()">
            <View />
          </ElIcon>
        </ElTooltip>
      </div>
      <ElCollapseTransition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </ElCollapseTransition>
      <Transition name="el-fade-in-linear">
        <div v-show="sourceVisible" class="example-float-control" @click="toggleSourceVisible(false)">
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useClipboard, useToggle } from '@vueuse/core'
import { ElDivider, ElTooltip, ElIcon, ElCollapseTransition, ElMessage } from 'element-plus'
import { CopyDocument, View, CaretTop } from '@element-plus/icons-vue'

import Example from './vp-example.vue'
import SourceCode from './vp-source-code.vue'

const props = defineProps<{
  rawSource: string // 源码
  source: string
  path: string
  description?: string
}>()

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false
})

const [sourceVisible, toggleSourceVisible] = useToggle(false)

const decodedDescription = computed(() => decodeURIComponent(props.description!))

const copyCode = async () => {
  if (!isSupported) {
    ElMessage.error('复制失败')
  }
  try {
    await copy()
    ElMessage.success('已复制')
  } catch (e: any) {
    ElMessage.error(e.message)
  }
}
</script>
<style lang="scss" scoped>
.example {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);

  .m-0 {
    margin: 0;
  }

  .op-btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;
    padding: 0.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;

      /* color: var(--text-color-lighter); */
      color: #000;
      cursor: pointer;
      transition: 0.2s;

      &.github a {
        color: var(--text-color-lighter);
        transition: 0.2s;

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    position: sticky;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    background-color: var(--bg-color, #fff);
    border-top: 1px solid var(--border-color);
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;

    span {
      margin-left: 10px;
      font-size: 14px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}

.el-icon svg {
  width: 1em;
  height: 1em;
}
</style>
