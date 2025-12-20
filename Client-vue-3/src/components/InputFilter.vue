<script lang="ts" setup>

defineProps<{ placeholder: string, column: string }>()

const model = defineModel<string>()
</script>

<template>
  <div class="w-full">
    <input
        v-model="model"
        :placeholder="placeholder || 'Поиск...'"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        type="text"
    />
  </div>
</template>