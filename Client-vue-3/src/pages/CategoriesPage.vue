<script lang="ts" setup>

import BaseTable from "../components/BaseTable.vue";
import {useCategories} from "../composables/useCategories.ts";
import {computed} from "vue";
import type {Category} from "../types/category.ts";
import {useFilter} from "../composables/useFilter.ts";
import InputFilter from "../components/InputFilter.vue";

const {
  data: categories,
  isSuccess,
  isLoading,
} = useCategories()

const allCategories = computed<Category[]>(() => categories.value || [])

const headers = [
  {key: 'id' as keyof Category, label: 'ID'},
  {key: 'name' as keyof Category, label: 'Название'},
]

const {
  filters,
  hasActiveFilters,
  activeFilters,
  clearFilter,
  resetFilters,
  useFiltered
} = useFilter<Category>()

const filteredCategories = useFiltered(allCategories)

</script>

<template>
  <main>
    <div class="container mx-auto px-4 py-8">
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Загрузка категорий...</p>
      </div>

      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          Категории
        </h1>
      </header>

      <div v-if="hasActiveFilters" class="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
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

      <BaseTable v-if="isSuccess" :headers="headers" :rows="filteredCategories">

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
      </BaseTable>
    </div>

  </main>
</template>
