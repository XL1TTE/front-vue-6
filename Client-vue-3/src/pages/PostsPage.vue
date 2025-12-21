<script lang="ts" setup>
import BaseTable from "../components/BaseTable.vue";
import { computed } from "vue";
import { useFilter } from "../composables/useFilter.ts";
import InputFilter from "../components/InputFilter.vue";
import { createToaster } from "@meforma/vue-toaster";
import type { Post } from "../types/posts.ts";
import { useDeletePost, usePosts } from "../composables/usePosts.ts";

const { data: posts, isSuccess, isLoading } = usePosts();
const { mutate: deletePost } = useDeletePost();

const toaster = createToaster({
  position: "top-right",
  duration: 3000,
});

const handleDelete = (slug: string, name: string) => {
  deletePost(slug, {
    onError: (error: any) => {
      toaster.error(
        `Failed to delete "${name}": ${error.message || "Unknown error"}`,
      );
    },
    onSuccess: () => {
      toaster.success(`"${name}" deleted successfully`);
    },
  });
};

const allPosts = computed<Post[]>(() => posts.value || []);

const headers = [
  { key: "id" as keyof Post, label: "ID" },
  { key: "name" as keyof Post, label: "Название" },
  { key: "content" as keyof Post, label: "Контент" },
  { key: "image_url" as keyof Post, label: "Фото" },
];

const actions = ["remove-button"];

const {
  filters,
  hasActiveFilters,
  activeFilters,
  clearFilter,
  resetFilters,
  useFiltered,
} = useFilter<{
  id: string;
  name: string;
}>();

const filteredPosts = useFiltered(allPosts);
</script>

<template>
  <main>
    <div class="container mx-auto px-4 py-8">
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Загрузка категорий...</p>
      </div>

      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Категории</h1>
      </header>

      <div
        v-if="hasActiveFilters"
        class="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <span class="text-sm font-medium text-blue-800">
              Активные фильтры:
            </span>
            <div class="ml-3 flex flex-wrap gap-2">
              <span
                v-for="(value, key) in activeFilters"
                :key="key"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ key }}: "{{ value }}"
                <button
                  class="ml-1.5 text-blue-500 hover:text-blue-700 focus:outline-none"
                  @click="clearFilter(key)"
                >
                  ×
                </button>
              </span>
            </div>
          </div>
          <button
            class="px-3 py-1.5 text-sm bg-white border border-blue-300 text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200 font-medium"
            @click="resetFilters"
          >
            Сбросить все
          </button>
        </div>
      </div>

      <BaseTable
        v-if="isSuccess"
        :actions="actions"
        :headers="headers"
        :rows="filteredPosts"
      >
        <template #header-id="{ key }">
          <div class="flex flex-row items-center space-y-1 gap-2">
            <InputFilter
              v-model="filters.id"
              :column="key"
              class="text-sm"
              placeholder="ID..."
            />
          </div>
        </template>

        <template #header-name="{ key }">
          <div class="flex flex-row items-center space-y-1 gap-2">
            <InputFilter
              v-model="filters.name"
              :column="key"
              class="text-sm"
              placeholder="Название..."
            />
          </div>
        </template>

        <template #image_url="{ value, row }">
          <div class="flex items-center">
            <div class="relative">
              <div
                v-if="value"
                class="w-10 h-10 rounded-full border-2 border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center shadow-sm"
              >
                <img
                  :alt="row.name || 'Image'"
                  :src="value as string"
                  class="w-full h-full object-cover"
                />
              </div>

              <div
                v-else
                class="w-10 h-10 rounded-full bg-linear-to-br from-gray-100 to-gray-200 border-2 border-gray-300 border-dashed flex items-center justify-center text-gray-400"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </template>

        <template #remove-button="{ row }">
          <button
            class="inline-flex items-center justify-center px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-900 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-1 active:bg-red-200"
            @click="handleDelete(row.slug, row.name)"
          >
            Remove
          </button>
        </template>
      </BaseTable>
    </div>
  </main>
</template>
