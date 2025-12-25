<script lang="ts" setup>
import { useRouter } from "vue-router";
import { usePost } from "../composables/usePosts.ts";

const props = defineProps<{
  slug: string;
}>();

const router = useRouter();

const { data: post, isLoading, isError, error } = usePost(props.slug);
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Кнопка назад -->
    <button
      class="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
      @click="router.push({ name: 'posts' })"
    >
      ← Назад к списку
    </button>

    <!-- Состояние загрузки -->
    <div v-if="isLoading" class="text-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
      ></div>
      <p class="mt-4 text-gray-500">Загрузка поста...</p>
    </div>

    <!-- Ошибка -->
    <div v-else-if="isError" class="bg-red-50 p-6 rounded-lg text-center">
      <h2 class="text-red-600 font-bold text-xl mb-2">Ошибка загрузки</h2>
      <p class="text-red-500">{{ error?.message || "Пост не найден" }}</p>
      <router-link
        class="mt-4 inline-block text-blue-600 underline"
        to="/posts"
      >
        Вернуться к постам
      </router-link>
    </div>

    <!-- Контент поста -->
    <article
      v-else-if="post"
      class="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <!-- Изображение -->
      <div v-if="post.image_url" class="w-full h-96 overflow-hidden">
        <img
          :alt="post.name"
          :src="post.image_url"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="p-8">
        <!-- Заголовок и метаданные -->
        <header class="mb-8">
          <h1 class="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {{ post.name }}
          </h1>
          <div class="flex items-center text-sm text-gray-500 space-x-4">
            <span
              class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
            >
              ID Категории: {{ post.category_id }}
            </span>
            <span
              >Slug:
              <code class="bg-gray-100 px-1 rounded">{{
                post.slug
              }}</code></span
            >
          </div>
        </header>

        <!-- Текст поста -->
        <div
          class="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line"
        >
          {{ post.content }}
        </div>

        <!-- Кнопки управления -->
        <div class="mt-12 pt-8 border-t flex space-x-4">
          <router-link
            :to="{ name: 'edit-post', params: { slug: post.slug } }"
            class="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            Редактировать
          </router-link>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.whitespace-pre-line {
  white-space: pre-line;
}
</style>
