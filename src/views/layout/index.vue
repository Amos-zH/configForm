<template>
  <div id="zh-layout">
    <!-- 头部 -->
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <div class="logo" />
        <a-menu
          v-model:selectedKeys="selectedSystem"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout>
        <!-- 主体左侧 -->
        <a-layout-sider v-model:collapsed="collapsed" collapsible width="200">
          <a-menu
            v-model:selectedKeys="selectedMenu"
            v-model:openKeys="openMenu"
            theme="dark"
            mode="inline"
            @click="menuClick"
            >
            <template v-for="item in menuList" :key="item.id">
              <a-menu-item v-if="(!item.children || item.children.length <= 0)" :key="item.path" :title="item.name">
                <span>{{ item.name }}</span>
              </a-menu-item>
              <template v-else>
                <a-sub-menu :key="item.path" :title="item.name">
                  <template #title>
                    <span>
                      <span>{{ item.name }}</span>
                    </span>
                  </template>
                  <template v-for="sub in item.children" :key="sub.id">
                    <a-menu-item v-if="true" :key="sub.path" :title="sub.name">{{ sub.name }}</a-menu-item>
                  </template>
                </a-sub-menu>
              </template>
            </template>
          </a-menu>
        </a-layout-sider>
        <!-- 主体 -->
        <a-layout style="padding: 0 24px 24px">
          <a-tabs
            v-model:activeKey="activeTab"
            type="editable-card"
            hide-add
            @edit="onEditTab"
            @change="onChangeTab"
            >
            <a-tab-pane
              v-for="pane in tabList"
              :key="pane.key"
              :tab="pane.title"
              :closable="pane.closable"
            />
          </a-tabs>
          <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
          >
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useMenu from './hooks/useMenu'

const selectedSystem = ref(['3'])
const collapsed = ref(false)
// 左侧菜单
const { menuList, selectedMenu, openMenu, menuClick, tabList, activeTab, onEditTab, onChangeTab } = useMenu()
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: left;
}
.logo {
  width: 200px;
  height: 40px;
  background-color: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
