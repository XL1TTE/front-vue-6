<script lang="ts" setup>
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <main class="py-8">
      <router-view v-slot="{ Component }">
        <transition mode="out-in" name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>
