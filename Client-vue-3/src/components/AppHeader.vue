<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import CreatePostButton from "./CreatePostButton.vue";
import CreateCategoryButton from "./CreateCategoryButton.vue";

const route = useRoute();
const isMobileMenuOpen = ref(false);

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link
            class="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
            to="/"
          >
            Админ-панель
          </router-link>
        </div>

        <nav class="hidden md:flex space-x-8">
          <router-link
            :class="[
              'px-3 py-2 text-sm font-medium rounded-md transition-colors',
              isActive('/')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
            ]"
            to="/"
          >
            <div class="flex items-center space-x-2">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
              <span>Главная</span>
            </div>
          </router-link>

          <router-link
            :class="[
              'px-3 py-2 text-sm font-medium rounded-md transition-colors',
              isActive('/posts')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
            ]"
            to="/posts"
          >
            <div class="flex items-center space-x-2">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
              <span>Посты</span>
            </div>
          </router-link>

          <router-link
            :class="[
              'px-3 py-2 text-sm font-medium rounded-md transition-colors',
              isActive('/categories')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
            ]"
            to="/categories"
          >
            <div class="flex items-center space-x-2">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
              <span>Категории</span>
            </div>
          </router-link>

          <div class="flex items-center space-x-4">
            <div
              v-if="
                route.path.includes('/posts') && !route.path.includes('/create')
              "
            >
              <CreatePostButton />
            </div>
            <div
              v-if="
                route.path.includes('/categories') && !route.path.includes('/create')
              "
            >
              <CreateCategoryButton />
            </div>
          </div>
        </nav>

        <div class="md:hidden">
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <svg
              :class="{ hidden: isMobileMenuOpen, block: !isMobileMenuOpen }"
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
            <svg
              :class="{ hidden: !isMobileMenuOpen, block: isMobileMenuOpen }"
              class="h-6 w-6"
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

      <div
        v-if="isMobileMenuOpen"
        class="md:hidden border-t border-gray-200 py-4"
      >
        <div class="space-y-2">
          <router-link
            :class="[
              'block px-3 py-2 rounded-md text-base font-medium transition-colors',
              isActive('/')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
            ]"
            to="/"
            @click="isMobileMenuOpen = false"
          >
            <div class="flex items-center space-x-3">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
              <span>Главная</span>
            </div>
          </router-link>

          <router-link
            :class="[
              'block px-3 py-2 rounded-md text-base font-medium transition-colors',
              isActive('/posts')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
            ]"
            to="/posts"
            @click="isMobileMenuOpen = false"
          >
            <div class="flex items-center space-x-3">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
              <span>Посты</span>
            </div>
          </router-link>

          <router-link
            :class="[
              'block px-3 py-2 rounded-md text-base font-medium transition-colors',
              isActive('/categories')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
            ]"
            to="/categories"
            @click="isMobileMenuOpen = false"
          >
            <div class="flex items-center space-x-3">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
              <span>Категории</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>
