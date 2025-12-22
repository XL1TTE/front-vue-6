<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useCategory } from "../composables/useCategories.ts";
import CategoryForm from "../components/forms/CategoryForm.vue";
import { useToaster } from "../composables/useToaster.ts";

const route = useRoute();
const router = useRouter();
const id = parseInt(route.params.id as string);

const { data: category, isLoading } = useCategory(id);
const { success: notifySuccess, error: notifyError } = useToaster();

const handleSuccess = () => {
  notifySuccess("Категория успешно обновлена");
  router.push({ name: "categories" });
};

const handleError = (error: any) => {
  notifyError(
    `Ошибка обновления категории: ${error.message || "Неизвестная ошибка"}`,
  );
};

const handleCancel = () => {
  router.push({ name: "categories" });
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Редактировать категорию
        </h1>
        <p class="mt-2 text-gray-600">Внесите изменения в категорию</p>
      </div>

      <div v-if="isLoading" class="text-center py-8">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
        ></div>
      </div>

      <div v-else-if="category" class="bg-white rounded-lg shadow p-6">
        <CategoryForm
          :category="category"
          mode="edit"
          @cancel="handleCancel"
          @error="handleError"
          @success="handleSuccess"
        />
      </div>

      <div v-else class="text-center py-8 text-red-600">
        Категория не найдена
      </div>
    </div>
  </div>
</template>
