<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-linear-to-r from-blue-600 to-indigo-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Панель администратора
          </h1>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            Управляйте контентом, отслеживайте статистику и анализируйте
            активность на вашем сайте
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-10">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Общая статистика</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Всего постов</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  {{ totalPostsCount }}
                </p>
                <div class="mt-3 flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <span class="text-sm text-gray-600">
                    <span v-if="posts!.length > 0">
                      {{ getPostsFromLastWeek().length }} новых за неделю
                    </span>
                    <span v-else>Нет данных</span>
                  </span>
                </div>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg">
                <svg
                  class="w-8 h-8 text-blue-600"
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
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Категории</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  {{ categories!.length }}
                </p>
                <div class="mt-3">
                  <span class="text-sm text-gray-600">
                    Используется в {{ postsWithCategoriesCount }} постах
                  </span>
                </div>
              </div>
              <div class="bg-green-50 p-3 rounded-lg">
                <svg
                  class="w-8 h-8 text-green-600"
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
              </div>
            </div>
          </div>

          <!-- Карточка: Среднее постов на категорию -->
          <div
            class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">
                  Среднее на категорию
                </p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  {{ postsPerCategory.toFixed(1) }}
                </p>
                <div class="mt-3">
                  <span class="text-sm text-gray-600">
                    Постов в среднем на категорию
                  </span>
                </div>
              </div>
              <div class="bg-purple-50 p-3 rounded-lg">
                <svg
                  class="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Карточка: Самая активная категория -->
          <div
            class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Самая активная</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  {{ mostActiveCategory?.count || 0 }}
                </p>
                <div class="mt-3">
                  <span
                    class="text-sm text-gray-600 truncate block max-w-[160px]"
                  >
                    {{ mostActiveCategory?.name || "Нет данных" }}
                  </span>
                </div>
              </div>
              <div class="bg-orange-50 p-3 rounded-lg">
                <svg
                  class="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Детальная статистика по категориям -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Статистика по категориям -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800">
                Статистика по категориям
              </h2>
              <span class="text-sm text-gray-500">
                Всего: {{ categories!.length }} категорий
              </span>
            </div>

            <div class="space-y-4">
              <div
                v-for="category in categoriesWithPostCount"
                :key="category.id"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 rounded-lg bg-linear-to-r from-blue-100 to-blue-200 flex items-center justify-center mr-4"
                  >
                    <span class="font-bold text-blue-700">{{
                      category.count
                    }}</span>
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900">
                      {{ category.name }}
                    </h3>
                    <p class="text-sm text-gray-500">
                      {{ getCategoryPercentage(category.count) }}% от всех
                      постов
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="flex items-center">
                    <div
                      class="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mr-3"
                    >
                      <div
                        :style="{
                          width: getCategoryPercentage(category.count) + '%',
                        }"
                        class="h-full bg-linear-to-r from-blue-500 to-indigo-600 rounded-full"
                      ></div>
                    </div>
                    <span class="text-sm font-medium text-gray-700">
                      {{ category.count }}
                    </span>
                  </div>
                </div>
              </div>

              <div
                v-if="categories!.length === 0"
                class="text-center py-12 text-gray-500"
              >
                <svg
                  class="w-12 h-12 mx-auto text-gray-300 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
                <p>Нет категорий для отображения</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Блок быстрых действий -->
        <div>
          <div
            class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8"
          >
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
              Быстрые действия
            </h2>

            <div class="space-y-4">
              <router-link
                class="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group"
                to="/posts/create"
              >
                <div
                  class="bg-blue-500 p-2 rounded-lg mr-4 group-hover:bg-blue-600 transition-colors"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 4v16m8-8H4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">Создать пост</h3>
                  <p class="text-sm text-gray-600">Добавить новый контент</p>
                </div>
                <svg
                  class="w-5 h-5 text-gray-400 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </router-link>

              <router-link
                class="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-200 group"
                to="/categories/create"
              >
                <div
                  class="bg-green-500 p-2 rounded-lg mr-4 group-hover:bg-green-600 transition-colors"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 4v16m8-8H4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">Создать категорию</h3>
                  <p class="text-sm text-gray-600">Добавить новую категорию</p>
                </div>
                <svg
                  class="w-5 h-5 text-gray-400 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </router-link>

              <router-link
                class="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group"
                to="/posts"
              >
                <div
                  class="bg-purple-500 p-2 rounded-lg mr-4 group-hover:bg-purple-600 transition-colors"
                >
                  <svg
                    class="w-6 h-6 text-white"
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
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">Управление постами</h3>
                  <p class="text-sm text-gray-600">Просмотр всех постов</p>
                </div>
                <svg
                  class="w-5 h-5 text-gray-400 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </router-link>
            </div>
          </div>

          <!-- Информационный блок -->
          <div
            class="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-6"
          >
            <div class="flex items-start">
              <div class="bg-indigo-100 p-2 rounded-lg mr-4">
                <svg
                  class="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-900 mb-2">
                  Статистика в реальном времени
                </h3>
                <p class="text-sm text-gray-600">
                  Все данные обновляются автоматически. Для более детальной
                  статистики перейдите в соответствующие разделы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { usePosts } from "../composables/usePosts.ts";
import { useCategories } from "../composables/useCategories.ts";

const { data: posts } = usePosts();
const { data: categories } = useCategories();

const totalPostsCount = computed(() => posts.value?.length);
const postsWithCategoriesCount = computed(() => {
  return posts.value?.filter((post) => post.category_id).length;
});

const categoriesWithPostCount = computed(() => {
  return categories
    .value!.map((category) => {
      const postCount = posts.value!.filter(
        (post) => post.category_id === category.id,
      ).length;
      return {
        ...category,
        count: postCount,
      };
    })
    .sort((a, b) => b.count - a.count);
});

const mostActiveCategory = computed(() => {
  if (categoriesWithPostCount.value.length === 0) return null;
  return categoriesWithPostCount.value[0];
});

const postsPerCategory = computed(() => {
  if (categories.value!.length === 0) return 0;
  return postsWithCategoriesCount.value! / categories.value!.length;
});

const getCategoryPercentage = (count: number) => {
  if (totalPostsCount.value === 0) return 0;
  return Math.round((count / totalPostsCount.value!) * 100);
};

const getPostsFromLastWeek = () => {
  return posts.value!.slice(0, Math.min(3, posts.value!.length));
};
</script>
