<template>
  <div class="list-tabs__item">
    <el-tabs>
      <el-tab-pane
          v-for="(item,index) in list"
          :key="index"
          :label="item.title">
        <el-scrollbar max-height="300px">
          <div class="container"
               @click="clickItem(content,index1)"
               v-for="(content,index1) in item.content"
               :key="index1">
            <div class="avatar" v-if="content.avatar">
              <el-avatar size="small" :src="content.avatar"></el-avatar>
            </div>
            <div class="content">
              <div class="title" v-if="content.title">
                <div>{{ content.title }}</div>
                <el-tag v-if="content.tag" size="small" :type="content.tagType">{{ content.tag }}</el-tag>
              </div>
              <div class="time" v-if="content.desc">{{ content.desc }}</div>
              <div class="time" v-if="content.time">{{ content.time }}</div>
            </div>
          </div>
          <div class="actions">
            <div
                class="a-item"
                :class="{'border': index !== actions.length}"
                v-for="(action,index) in actions"
                :key="index"
                @click="clickAction(action,index)">
              <div class="a-icon" v-if="action.icon">
                <component :is="`el-icon-${toLine(action.icon)}`"></component>
              </div>
              <div class="a-text">
                {{ action.text }}
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, PropType } from 'vue'
import { ActionOptions, ListItem, ListOptions } from './types'
import { toLine } from '../../../util'

const props = defineProps({
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true
  },
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => []
  }
})

const emits = defineEmits(['clickItem', 'clickAction'])

const clickItem = (item: ListItem, index: number) => {
  emits('clickItem', { item, index })
}

const clickAction = (item: ActionOptions, index: number) => {
  emits('clickAction', { item, index })
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;

  &:hover {
    background-color: #e6f6ff;
    cursor: pointer;
  }

  .avatar {
    flex: 1;
  }

  .content {
    flex: 3;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}

.actions {
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;

  .a-item {
    height: 50px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .a-icon {
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
  }
}

.border {
  border-right: 1px solid #eee;
}
</style>
