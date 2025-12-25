<script lang="ts" setup>
import BaseTable from "../components/BaseTable.vue";
import { computed, ref, watch } from "vue";
import { useFilter } from "../composables/useFilter.ts";
import InputFilter from "../components/InputFilter.vue";
import { createToaster } from "@meforma/vue-toaster";
import type { Post } from "../types/posts.ts";
import { useRoute, useRouter } from "vue-router";
import { useDeletePost, usePosts } from "../composables/usePosts.ts";
import { useDebounceFn } from "@vueuse/core";

const route = useRoute();
const router = useRouter();

const searchQuery = ref(route.query.search as string || "");

const debouncedSearch = useDebounceFn((value: string) => {
  router.replace({
    query: {
      ...route.query,
      search: value.trim() || undefined,
    },
  });
}, 300);

watch(
  () => searchQuery.value,
  (newValue) => {
    debouncedSearch(newValue);
  },
);

const { data: posts, isSuccess, isLoading } = usePosts(searchQuery);
const { mutate: deletePost } = useDeletePost();

const allPosts = computed<Post[]>(() => posts.value || []);

const actions = ["remove-button", "edit-button"];

const headers = [
  { key: "id" as keyof Post, label: "ID" },
  { key: "name" as keyof Post, label: "Название" },
  { key: "content" as keyof Post, label: "Контент" },
  { key: "image_url" as keyof Post, label: "Фото" },
  { key: "category_id" as keyof Post, label: "Категория" },
];

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
const handleEdit = (slug: string, name: string) => {
  router.push(`posts/edit/${slug}`);
};

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
        <p>Загрузка постов...</p>
      </div>

      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Посты</h1>

        <div class="relative w-full max-w-md mt-4">
          <div class="relative">
            <input
              v-model="searchQuery"
              class="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Поиск по названию..."
              type="text"
            />
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </div>
            <button
              v-if="searchQuery"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              @click="searchQuery = ''"
            >
              <svg
                class="w-4 h-4 text-gray-400 hover:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </button>
          </div>
        </div>
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
                  crossorigin="anonymous"
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
        <template #edit-button="{ row }">
          <button
            class="inline-flex items-center justify-center px-4 py-2 rounded-full bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-900 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-1 active:bg-red-200"
            @click="handleEdit(row.slug, row.name)"
          >
            Edit
          </button>
        </template>
      </BaseTable>
    </div>
  </main>
</template>
