<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { SpeedInsights } from '@vercel/speed-insights/vue';
import MainLayout from './layouts/MainLayout.vue';
import AdminLayout from './layouts/AdminLayout.vue';

const route = useRoute();
const layouts = {
  MainLayout,
  AdminLayout
};

const layout = computed(() => {
  return layouts[route.meta.layout] || MainLayout;
});
</script>

<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
    <SpeedInsights />
  </div>
</template>

<style>
/* Global reset or shared styles can go here */
</style>

